sfdx-switch
===========

SFDX plugin to disable the Salesforce process, ApexTrigger in bulk, and restore the state before invalidation.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sfdx-switch.svg)](https://npmjs.org/package/sfdx-switch)
[![CircleCI](https://circleci.com/gh/[object Object]/tree/master.svg?style=shield)](https://circleci.com/gh/[object Object]/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-switch.svg)](https://npmjs.org/package/sfdx-switch)
[![License](https://img.shields.io/npm/l/sfdx-switch.svg)](https://github.com/[object Object]/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ sfdx plugins:install sfdx-switch
USAGE
  $ sfdx switch:COMMAND --targetusername=targetusername
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sfdx switch:off [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-switch-switchoff---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx switch:return [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-switch-switchreturn---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx switch:off [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Disable the state of Salesforce processes and Apex triggers at once.

```
USAGE
  $ sfdx switch:off [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx switch:off --targetusername username@example.com
```

_See code: [src/commands/switch/off.ts](https://github.com/shinchit/sfdx-switch/blob/v0.1.0/src/commands/switch/off.ts)_

## `sfdx switch:return [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Restores the state of Salesforce processes and Apex triggers at once.

```
USAGE
  $ sfdx switch:return [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx switch:return --targetusername username@example.com
```

_See code: [src/commands/switch/return.ts](https://github.com/shinchit/sfdx-switch/blob/v0.1.0/src/commands/switch/return.ts)_
<!-- commandsstop -->
