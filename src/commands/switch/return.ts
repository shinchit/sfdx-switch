import * as core from '@salesforce/core'
import {SfdxCommand} from '@salesforce/command'
import {AnyJson} from '@salesforce/ts-types'
/*
import { execSync } from "child_process";
import * as xml2json from "xml2json";
import * as yargs from "yargs";
*/
// import * as jsforce from 'jsforce'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname, '.env')})

core.Messages.importMessagesDirectory(__dirname)
const messages = core.Messages.loadMessages('sfdx-switch', 'return')

export default class Return extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static get usage() {
    return SfdxCommand.usage.replace('<%= command.id %>', 'switch:return')
  }

  public static examples = [
    '$ sfdx switch:return --targetusername username@example.com',
  ]

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // Setup connection
    if (!this.org) {
      throw new Error('No connecting organization found')
    }

    const conn = this.org.getConnection()
    await conn.request('/')
    const {accessToken, instanceUrl} = conn
    const SF_USERNAME = conn.getUsername()
    const defaultNamespace: string | undefined = this.flags.defaultnamespace
    /*
    const conn2 = new jsforce.Connection({
      accessToken,
      instanceUrl,
      version: this.flags.apiversion,
      callOptions: defaultNamespace ? {defaultNamespace} : undefined,
    })
    */

    const DEFINITION_DATA_FILE_PATH = path.join(__dirname, 'data/' + SF_USERNAME + '_define.json')
    // const TRIGGER_DEFINITION_DATA_FILE_PATH = path.join(__dirname, 'data/' + SF_USERNAME + '_trigger_define.json')
    // const METADATA_PACKAGE_DIR = path.join(__dirname, 'data/package/')
    // const METADATA_PACKAGE_TRIGGER_DIR = METADATA_PACKAGE_DIR + 'triggers/'
    // const SANDBOX_FLAG = '--sandbox'

    /* fetch FlowDefinition (Process) using Tooling API */
    let records: any[] = []
    if (fs.existsSync(DEFINITION_DATA_FILE_PATH)) {
      try {
        records = JSON.parse(fs.readFileSync(DEFINITION_DATA_FILE_PATH, 'utf8'))
        fs.unlinkSync(DEFINITION_DATA_FILE_PATH)
      } catch (error) {
        this.ux.log(`The read or unlink process has failed. Please check ${DEFINITION_DATA_FILE_PATH}\n` + error.messages)
      }
    }

    records.forEach(function (flow: any) {
      const activeVersionNumber = flow.ActiveVersion ? flow.ActiveVersion.VersionNumber : null
      conn.tooling.sobject('FlowDefinition').update({
        Id: flow.Id,
        Metadata: {
          activeVersionNumber: activeVersionNumber,
        },
      })
    })

    return {state: 'success'}
  }
}

