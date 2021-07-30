sfdx-switch
===========

SFDX plugin to disable the Salesforce process, ApexTrigger in bulk, and restore the state before invalidation.

[![Version](https://img.shields.io/npm/v/sfdx-switch.svg)](https://npmjs.org/package/sfdx-switch)
[![CircleCI](https://circleci.com/gh/shinchit/sfdx-switch/tree/main.svg?style=shield)](https://circleci.com/gh/shinchit/sfdx-switch/tree/main)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/shinchit/sfdx-switch?branch=main&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-switch/branch/main)
[![Codecov](https://codecov.io/gh/shinchit/sfdx-switch/branch/main/graph/badge.svg)](https://codecov.io/gh/shinchit/sfdx-switch)
[![Greenkeeper](https://badges.greenkeeper.io/shinchit/sfdx-switch.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/shinchit/sfdx-switch/badge.svg)](https://snyk.io/test/github/shinchit/sfdx-switch)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-switch.svg)](https://npmjs.org/package/sfdx-switch)
[![License](https://img.shields.io/npm/l/sfdx-switch.svg)](https://github.com/shinchit/sfdx-switch/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Install
<!-- usage -->
```sh-session
$ sfdx plugins:install sfdx-switch
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sfdx switch:off [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-switchoff---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx switch:return [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-switchreturn---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

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
