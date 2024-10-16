import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';



export const calculateHash = async (currDir, file) => {
    var src = '';
    if (path.isAbsolute(file)) {
        src = path.resolve(file);
      } else {
        src = path.join(currDir, file);
      }


    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(src);

        readStream.on('error', (err) => {
            console.error('Crypto operation failed ', err);
        })

        readStream.on('data', (chunk) => {
            hash.update(chunk);
        })

        readStream.on('end', () => {
            const hashHex = hash.digest('hex');
            console.log(hashHex);
        })
};

