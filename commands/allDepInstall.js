import fs from 'fs-extra';
import {resolve} from 'path';
import installPackage from './install.js';
const installDependencies = async ()=>{

    const filePath = resolve(process.cwd() , 'avs-package.json');

    if(await fs.pathExists(filePath)){
        const config = await fs.readJSON(filePath);
        for (const [name, versionRange] of Object.entries(config.dependencies)) {
            await installPackage(`${name}@${versionRange}`);
          }
    }
    else{
        throw Error('avs-package.json is mission');
    }
}

export default installDependencies;