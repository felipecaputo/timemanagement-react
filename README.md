# TimeManagement App 
[![Build Status](https://travis-ci.org/felipecaputo/timemanagement-react.svg?branch=master)](https://travis-ci.org/felipecaputo/timemanagement-react)
[![Code Climate](https://codeclimate.com/github/felipecaputo/timemanagement-react/badges/gpa.svg)](https://codeclimate.com/github/felipecaputo/timemanagement-react)
[![Issue Count](https://codeclimate.com/github/felipecaputo/timemanagement-react/badges/issue_count.svg)](https://codeclimate.com/github/felipecaputo/timemanagement-react)
[![Test Coverage](https://codeclimate.com/github/felipecaputo/timemanagement-react/badges/coverage.svg)](https://codeclimate.com/github/felipecaputo/timemanagement-react/coverage) 

This is a simple app to track your time between various tasks
and projects.

## Main features

## How to build

```bash
#first you need to clone the repo locally
git clone https://github.com/felipecaputo/timemanagement-react.git
cd timemanagement-react

#Install global dependencies (preceed with sudo for linux)
npm i electron-prebuilt babel gulp -g

#After that you just need to
npm i && gulp build && npm start
```
    
Have fun!!

## Developing

  The `gulp` default task has a watch behavior that builds automatically after 
  each change, so you just need to run it once and in electron **Ctrl + R**
  refresh then App after the change. 
   
  **Happy Coding!**
  
## Tests

  Saddly still a work in progress, but I pretend to use Jest and Zombie+Cucumber
  for unit and functional tests 

## ToDo

  - Reports by period, project, category
  - Improve UI and UX
  - Offline first and back end sync
  - login / logout
  - Shared groups

## Contribute

  Feel free contribute forking the repo or 
  [opening issues](https://github.com/felipecaputo/timemanagement-react/issues)