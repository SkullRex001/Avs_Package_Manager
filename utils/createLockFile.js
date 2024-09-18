import fs from 'fs-extra';
import { resolve } from 'path';

export const updateLockFile = async ()=>{

    const filePath = resolve(process.cwd() , 'avs-package-lock.json');
    let lockFileData = {};

    if(await fs.pathExists(filePath)){
        config = await fs.readJSON(filePath);
    }

      // Initialize the lock file structure if empty
    lockFileData.name = lockFileData.name || 'avs-package-manager';
    lockFileData.version = lockFileData.version || '1.0.0';
    lockFileData.dependencies = lockFileData.dependencies || {};

}


export const getNestedDependencies = async (packageName , version , metaData)=>{

    console.log(metaData.versions[version]);
    const packageInfo = metaData.versions[version];
    const nestedDependencies = {};

    if(packageInfo.dependencies){

        for(const [depName, depVersionRange] of Object.entries(packageInfo.dependencies)){
            
        }

    }


}