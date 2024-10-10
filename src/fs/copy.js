import fs from 'fs'
import { FS_ERROR } from '../variables/global.js'
  
// fs.cp(src, dest[, options], callback) = Asynchronously copies the entire directory structure from src to dest, including subdirectories and files.
// throws error if source don't exist by default
// error on exist throws error if destination exists

export const copy = async (src, dest) => {
        fs.promises.cp(src, dest, {force:false, errorOnExist:true, recursive:true })
            .then( () => { console.log("Copied")})
            .catch( (err) => {console.error(FS_ERROR, err)})
        }
            