import fs from 'fs'
import { FS_ERROR } from '../constants/global.js';


export const remove = async (delFilePath) => {
    fs.promises.unlink(delFilePath)
        .then(() => console.log(`File has been removed.`))
        .catch((err) => console.error(FS_ERROR, err))
};


export const removeDir = async (delFilePath) => {
    fs.promises.rmdir(delFilePath)
        .then(() => console.log(`Directory has been removed.`))
        .catch((err) => console.error(FS_ERROR, err))
};
