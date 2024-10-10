import fs from 'fs'
import { FS_ERROR } from '../variables/global.js';
const path = './src/fs/files/'
const file = 'fileToRemove.txt'


export const remove = async (delFilePath) => {
    fs.promises.unlink(delFilePath)
        .then(() => console.log(`Removed.`))
        .catch((err) => console.error(FS_ERROR, err))
};


export const removeDir = async (delFilePath) => {
    fs.promises.rmdir(delFilePath)
        .then(() => console.log(`Folder removed.`))
        .catch((err) => console.error(FS_ERROR, err))
};


// export const remove = async (delFilePath) => {
//     fs.unlink(delFilePath, (err) => {
//         if (err) {
//             console.error(FS_ERROR, err)
//         } else
//             console.log(`${delFilePath} has been removed.`)
//     })
// };

//await remove();