import {mkdir} from 'fs/promises'
import {join} from 'path'
import {FS_ERROR} from '../constants/global.js'

export const makeDirectory = async(newDir) => {
    mkdir(newDir)
        .then(() => console.log(`Folder created sucessfully`))
        .catch((err) => console.error(FS_ERROR, err))
}