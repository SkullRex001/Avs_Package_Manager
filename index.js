#!/usr/bin/env node

import { Command } from "commander";
import installPackage from './commands/install.js'
import uninstallPackage from "./commands/uninstall.js";
import installDependencies from "./commands/allDepInstall.js";

const program = new Command();

program
  .command('install [package]')
  .description('Install a package')
  .action((packageName) => {
    if(packageName){
      installPackage(packageName);
    }
    else{
      installDependencies();
    }
   
  });


program
  .command('uninstall <package>')
  .description('Install a package')
  .action((packageName) => {
    uninstallPackage(packageName);
  }
  )



program.parse(process.argv);