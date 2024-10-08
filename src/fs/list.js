
import {readdir, constants} from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FILES_FOLDER } from '../../variables/global.js';


const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);


const list = async () => {
    const folderPath = join(__dirname, FILES_FOLDER);
    await access(folderPath, constants.F_OK);

        if (!access) {
            console.error('FS operation failed', err)
        } else {
            const files = await readdir(folderPath);
            console.log(files)
         }
     }


await list();