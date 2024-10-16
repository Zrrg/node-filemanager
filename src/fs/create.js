import fs from 'fs'
import { FS_ERROR } from '../constants/global.js';


export const create = async (filePath, content) => {
 
    fs.promises.writeFile(filePath, content, {flag: 'wx'})
        .then( () => console.log('File has been created.'))
        .catch( (error) => console.error(FS_ERROR, error))

    
};