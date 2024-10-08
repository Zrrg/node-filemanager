
import {readdir, constants} from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FILES_FOLDER, FS_ERROR } from '../../variables/global.js';


const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const dir = join(__dirname, FILES_FOLDER);


const list = async (dir) => {
    try {        
        const files = await readdir(dir);
        console.log(files)
    } catch (error) {
        throw new Error(FS_ERROR);
    }
};



await list(dir);