import fs from 'fs/promises'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import { FS_ERROR } from '../../variables/global.js';

//const freshfile = "fresh.txt";
//const content = "I am fresh and young";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async (filename, content) => {

    const filePath = join(__dirname, filename)

    try {
        await fs.writeFile(filePath, content, {flag: 'wx'});
    } catch (error) {
        throw new Error(FS_ERROR)
    }

};

//await create(freshfile, content);