import fs, { ReadStream } from 'fs'
import { STREAM_ERRROR } from '../constants/global.js';

//const file = 'src/streams/files/fileToRead.txt'

export const readByStream = async (file) => {

    const readStream = fs.createReadStream(file);

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\n');
        console.log(`${file} has been read successfully.`)
    })

    readStream.on('error', (err) =>{
        console.error(STREAM_ERRROR, err);
    });

};

//await read(file);