import fs from 'fs'
const path = './src/fs/files/'
//const file = 'fileToRead.txt'

export const read = async (source) => {

    const data = await fs.promises.readFile(source, 'utf8') 
        .then((data) => console.log(data))
        .catch((error) => console.error("FS Operation failed", error))

}


//await read(path + file);