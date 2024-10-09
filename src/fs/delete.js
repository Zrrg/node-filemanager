import fs from 'fs'
import { FS_ERROR } from '../variables/global.js';
const path = './src/fs/files/'
const file = 'fileToRemove.txt'




export const remove = async (delFilePath) => {
    fs.unlink(delFilePath, (err) => {
        if (err) {
            console.error(FS_ERROR)
        } else
            console.log(`${delFilePath} has been removed.`)
    })
};

//await remove();