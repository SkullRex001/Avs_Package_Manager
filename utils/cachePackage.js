import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import * as tar from 'tar';

const cacheDir = path.join(os.homedir() , '.avs-package-manager-cahce');

fs.ensureDirSync(cacheDir);

export const isCached = (packageName , version)=>{
    const packagePath = path.join(cacheDir , packageName , version);
    //what if i install multiple package at once?
    //I should make it run parallel
 
    return fs.existsSync(packagePath);
}

export const cahcePackage = async (packageName , version , packageData) =>{

    const packagePath = path.join(cacheDir , packageName , version);

    await fs.ensureDir(packagePath);

    await fs.writeFile(path.join(packagePath, `${packageName}-${version}.tgz`), packageData);

}

export const extractPackage = async (packageName , version , destDir)=>{
    const packagePath = path.join(cacheDir , packageName , version ,`${packageName}-${version}.tgz` );

     await tar.x({
        file : packagePath,
        cwd : destDir,
        strip: 1 
    })
}

