
import {readdir, constants} from 'fs/promises'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FILES_FOLDER, FS_ERROR } from '../variables/global.js';
import { logOutput } from '../filemanager/logOutput.js';
import fs from 'fs';
import util from 'util';
import {checkAccess} from './access.js'


const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

//const dir = join(__dirname, FILES_FOLDER);


export const list = async (dir) => {
    try {        
        // reading and deciding if directory
        const items = await readdir(dir);
        const itemsWithStats = await Promise.all(items.map(async (item) => {
            const itemPath = join(dir, item);
            const statPr = util.promisify(fs.stat);
            try{
                const stats = await statPr(itemPath);              
                return {
                    name: item,
                    type: stats.isDirectory() ? 'directory' : 'file'
                }
            } catch (err) {
                if (err.code === 'EBUSY') 
                    console.log('File is currently locked, skipping...');
            }
        }));

 
    itemsWithStats.sort((a, b) => {
        if (a.type === 'directory' && b.type === 'directory') {
          return a.name.localeCompare(b.name);
        } else if (a.type === 'directory') {
          return -1;
        } else if (b.type === 'directory') {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });


      
        const display = () => { 
            console.table(itemsWithStats)
        }
            display();
       } catch (error) {
            console.error(FS_ERROR, error);
    }
};



//await list(dir);