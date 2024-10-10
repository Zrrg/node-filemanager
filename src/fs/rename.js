import fs from 'fs'
import { FS_ERROR } from '../variables/global.js';
import { checkAccess } from '../fs/access.js'


export const rename = async (oldFilePath, newFilePath) => {
     const fileExist = await checkAccess(newFilePath);
    
     if (fileExist) {
         throw new Error("File exists");
     }

    try {
        await fs.promises.rename(oldFilePath, newFilePath)
        console.log(`${oldFilePath} has been renamed to ${newFilePath}`);
    } catch (err) {
            console.error(FS_ERROR)
    }
}
        