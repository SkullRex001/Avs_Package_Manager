import fs from 'fs-extra';
import path , {dirname} from 'path';
import ora from 'ora';
import chalk from 'chalk';
import npmFetch from 'npm-registry-fetch'
import * as tar from 'tar';
import { fileURLToPath } from 'url';
import semver from 'semver';
import {addToPackageJson} from '../utils/updatePackageJson.js';
import { isCached , extractPackage , cahcePackage } from '../utils/cachePackage.js';


const installPackage = async(packageName)=>{
    const spinner = ora(`Installing ${packageName}`);
    spinner.start();
    try {

        const [name , versionRange ] = packageName.split('@');
        const version = versionRange || 'latest';

        const __filename = fileURLToPath(import.meta.url); 
        const __dirname = dirname(__filename);  
        const metaData = await npmFetch.json(`/${name}`);
        // console.log(metaData);
        let versionToInstall;
        if(version === 'latest'){
          versionToInstall = metaData['dist-tags'].latest;
          // console.log(metaData.versions[versionToInstall]);
        }
        else{
          // console.log(Object.keys(metaData.versions));
          versionToInstall = semver.maxSatisfying(Object.keys(metaData.versions), version);

          if (!versionToInstall) {
            throw new Error(`No version found for ${name}@${version}`);
          }
        }
        // const latestVersion = metaData['dist-tags'].latest;


        const rootDir = path.resolve(__dirname, '../');

        const packageDir = path.resolve(rootDir , 'my-package' , name);

        await fs.ensureDir(packageDir);

        if(isCached(name , versionToInstall)){
          await extractPackage(name , versionToInstall , packageDir)
          
        
        }

        else{
          const tarballUrl = metaData.versions[versionToInstall].dist.tarball;
          const response = await npmFetch(tarballUrl);
          const tarballBuffer = await response.buffer();
          if (tarballBuffer.length === 0) {
            console.log(tarballBuffer)
            throw new Error(`Downloaded tarball is empty`);
          }
  
          // const extractStream = response.body.pipe(
          //     tar.x({ cwd: packageDir, strip: 1 })
          //   );
  
            // await new Promise((resolve, reject) => {
            //   extractStream.on('end', resolve);
            //   extractStream.on('error', reject);
            // });

           await cahcePackage(name , versionToInstall , tarballBuffer);
           await extractPackage(name , versionToInstall , packageDir)


        }

 

          await addToPackageJson(name , versionToInstall);
          spinner.succeed(chalk.green(`${name} v-${versionToInstall} installed successfully!`));
          
      
    } catch (error) {
        spinner.fail(chalk.red(`Failed to install ${packageName}: ${error.message}`));
    }
}


export default installPackage;