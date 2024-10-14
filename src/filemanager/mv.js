import { join } from 'node:path';
import fs from 'node:fs/promises';

import { FS_ERROR } from '../constants/global.js'

export const filemanagerMv =  async (currentDir, src, dest) => {
  try {
    const srcPath = join(currentDir, src);
    const destPath = join(currentDir, dest);

    // Move the file or directory
    await fs.rename(srcPath, destPath);

    console.log(`Moved "${src}" to "${dest}"`);
  } catch (error) {
    console.error(FS_ERROR, error);
  }
}

 
 