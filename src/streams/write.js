import fs from 'fs'
import {GENERIC_ERROR, STREAM_ERRROR} from './../variables/global.js'

export const writeBySteam = async (destination, args) => {

    const writableStream = fs.createWriteStream(destination, args);
    let data = '';

    process.stdin.on('data', (chunk) => {
        writableStream.write(chunk);
    });

    process.stdin.on('end',  () => {
        writableStream.end();
    });

    process.stdin.on('error',  () => {
        throw new Error(GENERIC_ERROR)
    });

    writableStream.on('error', (err) => {
        throw new Error(STREAM_ERRROR);
    } )


};
