import fs from 'fs'
import path from 'path'
import util from 'util'




export const isFile = async (itemPath) => {
    try {        
        // reading and deciding if directory
            const statPr = util.promisify(fs.stat);
            try{
                const stats = await statPr(itemPath);  
                if (stats.isFile())           
                    return true ;
                else 
                    return false;
            } catch (err) {
                if (err.code === 'EBUSY') 
                    console.log('File is currently locked, skipping...');
            }
        }
        catch (err) {
            console.error(err);
        }
    };