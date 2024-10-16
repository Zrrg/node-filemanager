import { isFile } from "./../fs/isfile.js";

import { remove, removeDir } from "./../fs/delete.js";
import path from 'path'

export const filemanagerRm = async (dir, arg) => {
try {
    const remPath = path.join(dir, arg);
    if (await isFile(remPath)) {
      await remove(remPath);
    } else await removeDir(remPath);
  } catch (err) {
    console.error(err);
  }
}