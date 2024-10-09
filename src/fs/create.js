import fs from 'fs/promises'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import { FS_ERROR } from '../variables/global.js';

//const freshfile = "fresh.txt";
//const content = "I am fresh and young";
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

export const create = async (filePath, content) => {

    //const filePath = join(__dirname, filename)

    try {
        await fs.writeFile(filePath, content, {flag: 'wx'});
    } catch (error) {
        console.error(FS_ERROR, error)
    }

};

//await create(freshfile, content);