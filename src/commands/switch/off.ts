import { SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
/*
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as xml2json from "xml2json";
import * as yargs from "yargs";
*/
// import * as jsforce from "jsforce";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

// core.Messages.importMessagesDirectory(__dirname);
// const messages = core.Messages.loadMessages('sfdx-switch', 'off');


export default class Off extends SfdxCommand {
  // public static description = messages.getMessage('commandDescription');

  public static get usage() {
    return SfdxCommand.usage.replace('<%= command.id %>', 'switch:off');
  }

  public static examples = [
    '$ sfdx switch:off --targetusername username@example.com'
  ];

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // Setup connection
    if (!this.org) {
      throw new Error('No connecting organization found');
    }
    this.ux.log('Hello ???  hoge');

    /*
    const conn = this.org.getConnection();
    await conn.request('/');
    const { accessToken, instanceUrl } = conn;
    const defaultNamespace: string | undefined = this.flags.defaultnamespace;
    const conn2 = new jsforce.Connection({
      accessToken,
      instanceUrl,
      version: this.flags.apiversion,
      callOptions: defaultNamespace ? { defaultNamespace } : undefined,
    });

    this.ux.log();
    this.ux.table(results, {
      columns: [
        {
          key: 'filepath',
          label: 'Output File Path',
        },
        {
          key: 'count',
          label: 'Count',
        },
      ],
    });
    */
    return { 'hoge': 'fuga' };
  }
}
