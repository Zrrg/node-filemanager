import fs from 'fs'

export const read = async (source) => {

    const data = await fs.promises.readFile(source, 'utf8') 
        .then((data) => console.log(data))
        .catch((error) => console.error("FS Operation failed", error))

}
