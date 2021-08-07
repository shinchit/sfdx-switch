import * as core from '@salesforce/core'
import {SfdxCommand} from '@salesforce/command'
import {AnyJson} from '@salesforce/ts-types'
import {execSync} from 'child_process'
import * as xml2json from 'xml2json'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as AdmZip from 'adm-zip'

core.Messages.importMessagesDirectory(__dirname)
const messages = core.Messages.loadMessages('sfdx-switch', 'off')

export default class Off extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static get usage() {
    return SfdxCommand.usage.replace('<%= command.id %>', 'switch:off')
  }

  public static examples = [
    '$ sfdx switch:off --targetusername username@example.com',
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
    const SF_USERNAME = conn.getUsername()

    const DATA_DIR = path.resolve(__dirname, '../../../data')
    const DEFINITION_DATA_FILE_PATH = path.resolve(DATA_DIR, SF_USERNAME + '_define.json')
    const TRIGGER_DEFINITION_DATA_FILE_PATH = path.resolve(DATA_DIR, SF_USERNAME + '_trigger_define.json')
    const METADATA_PACKAGE_DIR = path.resolve(DATA_DIR, './package/')
    const METADATA_PACKAGE_USER_DIR = path.resolve(METADATA_PACKAGE_DIR, `./${SF_USERNAME}/`)
    const METADATA_PACKAGE_TRIGGER_DIR = path.resolve(METADATA_PACKAGE_USER_DIR, './triggers/')

    /* fetch FlowDefinition (Process) using Tooling API */
    const flowDefinitions = await conn.tooling.query('SELECT Id, ActiveVersion.VersionNumber, LatestVersion.VersionNumber, DeveloperName FROM FlowDefinition')
    const records: any[] = flowDefinitions.records
    if (!fs.existsSync(DEFINITION_DATA_FILE_PATH)) {
      fs.writeFileSync(DEFINITION_DATA_FILE_PATH, JSON.stringify(flowDefinitions.records, null, 2))
    }

    records.forEach(function (flow: any) {
      const activeVersionNumber = null
      conn.tooling.sobject('FlowDefinition').update({
        Id: flow.Id,
        Metadata: {
          activeVersionNumber: activeVersionNumber,
        },
      })
    })

    /* retrieve triggers metadata */

    // Create User Metadata Directory
    if (!fs.existsSync(METADATA_PACKAGE_USER_DIR)) {
      fs.mkdirSync(METADATA_PACKAGE_USER_DIR)
    }

    try {
      execSync(`sfdx force:mdapi:retrieve -s -r ${METADATA_PACKAGE_USER_DIR} -u ${SF_USERNAME} -k ` + path.resolve(METADATA_PACKAGE_DIR, 'package.xml'))
      const zip = new AdmZip(path.resolve(METADATA_PACKAGE_USER_DIR, 'unpackaged.zip'))
      zip.extractAllTo(METADATA_PACKAGE_USER_DIR, true)
    } catch (error) {
      this.ux.log(error.messages)
    }

    if (!fs.existsSync(METADATA_PACKAGE_TRIGGER_DIR)) {
      try {
        fs.removeSync(METADATA_PACKAGE_USER_DIR)
      } catch (error) {
        this.ux.log(error.messages)
      }
      return {state: 'skip'}
    }

    const dirents = fs.readdirSync(METADATA_PACKAGE_TRIGGER_DIR, {withFileTypes: true})

    const trigger_files = []
    for (const dirent of dirents) {
      if (!dirent.isDirectory()) {
        const trigger_file = path.resolve(METADATA_PACKAGE_TRIGGER_DIR, dirent.name)
        trigger_files.push(trigger_file)
      }
    }
    const xml_files = trigger_files.filter(function (file) {
      return path.extname(file).toLowerCase() === '.xml'
    })

    let jsons = xml_files.map(function (xml_file) {
      const xml = fs.readFileSync(xml_file, 'utf-8')
      return xml2json.toJson(xml, {object: true, reversible: true, arrayNotation: true})
    })

    if (!fs.existsSync(TRIGGER_DEFINITION_DATA_FILE_PATH)) {
      fs.writeFileSync(TRIGGER_DEFINITION_DATA_FILE_PATH, JSON.stringify(jsons, null, 2))
    }

    // change status
    jsons = jsons.map(function (json: any) {
      json.ApexTrigger[0].status[0].$t = 'Inactive'
      return json
    })

    for (let i = 0; i < jsons.length; i++) {
      fs.writeFileSync(xml_files[i], '<?xml version="1.0" encoding="UTF-8"?>\n' + xml2json.toXml(jsons[i]))
    }

    /* deploy triggers metadata */
    try {
      execSync(`sfdx force:mdapi:deploy -d ${METADATA_PACKAGE_USER_DIR} -u ${SF_USERNAME} -w -1`)
      fs.removeSync(METADATA_PACKAGE_USER_DIR)
    } catch (error) {
      this.ux.log(error.messages)
    }

    return {state: 'success'}
  }
}
