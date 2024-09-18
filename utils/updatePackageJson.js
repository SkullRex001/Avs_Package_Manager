import fs from 'fs-extra';
import { resolve } from 'path';

export const addToPackageJson = async(name , version)=>{

    const filePath = resolve(process.cwd() , 'avs-package.json');

    let config;

    if(await fs.pathExists(filePath)){
        config = await fs.readJSON(filePath);
    }
    else{
        config = { dependencies: {} };
    }

    config.dependencies[name] = version;

    await fs.writeJSON(filePath , config ,{ spaces : 2} );

}

export const removeFromPackageJson = async(name)=>{

    const filePath = resolve(process.cwd() , 'avs-package.json');

    let config;

    if(await fs.pathExists(filePath)){
        config = await fs.readJSON(filePath);
    }
    else{
        config = { dependencies: {} };
    }

    delete config.dependencies[name];

    await fs.writeJSON(filePath , config ,{ spaces : 2} );


}

