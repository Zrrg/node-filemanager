import fs from 'node:fs/promises';
import { brotliCompress as _bC, brotliDecompress as _bDC } from "node:zlib";
import path from 'node:path';
import { promisify } from 'node:util';
import { COMPRESS_ERROR } from '../constants/global.js';

const brotliCompress = promisify(_bC);
const brotliDecompress = promisify(_bDC);


 


export const compressBrotli = async (currentDir, fileName) => {
    try {
        const filePath = path.join(currentDir, fileName);
        const fileContents = await fs.readFile(filePath);
        const compressedData = await brotliCompress(fileContents);
        const compressedFilePath = `${filePath}.br`;
        await fs.writeFile(compressedFilePath, compressedData);
        console.log(`${fileName} has been compressed.`);

    } catch (error) {
        console.error(COMPRESS_ERROR, error);
    }
}

export const decompressBrotli = async (currentDir, fileName) => {
    try {
        const compressedFilePath = path.join(currentDir, fileName);
        const compressedData  = await fs.readFile(compressedFilePath); 


        const decompressedData = await brotliDecompress(compressedData);
        const filePath = compressedFilePath.slice(0,-3); // remove '.br'
        await fs.writeFile(filePath, decompressedData);
        console.log(`${fileName} has been decompressed.`);

    } catch (error) {
        console.error(COMPRESS_ERROR, error);
    }
}





// someday this will be done too
const compress = async () => {
    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(destination);
    const gzip = zlib.createGzip();

    readableStream
        .pipe(gzip)                                //compress data
        .pipe(writableStream)
        .on('finish', () => {
        console.log('File has been compressed');
    });

    readableStream.on('error', (err) => {
        console.error('Zip error', err);
    });
};


const decompress = async () => {
    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(destination);
    const gunzip = zlib.createGunzip();

    readableStream
        .pipe(gunzip)                           // decompress data
        .pipe(writableStream)
        .on('finish', () => {
        console.log('File has been decompressed');
    });

    readableStream.on('error', (err) => {
        console.error('Zip error', err);
    });
};


