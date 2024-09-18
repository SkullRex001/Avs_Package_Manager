import fs from 'fs-extra';
import path , {dirname} from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { removeFromPackageJson } from '../utils/updatePackageJson.js';

const uninstallPackage = async(packageName)=>{
    const spinner = ora(`Uninstalling ${packageName}`);
    spinner.start();
    try {
        const __filename = fileURLToPath(import.meta.url); 
        const __dirname = dirname(__filename);
        const rootDir = path.resolve(__dirname, '../');
        const packageDir = path.resolve(rootDir , 'my-package' , packageName);
        //check if package exist or not
        await fs.remove(packageDir);
        removeFromPackageJson(packageName);
        spinner.succeed(chalk.green(`${packageName} uninstalled successfully!`));
        
    } catch (error) {
        spinner.fail(chalk.red(`Failed to uninstall ${packageName}`));
    }

}


export default uninstallPackage;