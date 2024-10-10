import path from 'path'
import { copy } from "../fs/copy.js";


export const filemanagerCp = async (currDir, arg1, arg2) => {
try {
    var src, dest = ''

    if (path.isAbsolute(arg1)) {
        src = path.resolve(arg1);
      } else {
        src = path.join(currDir, arg1);
      }

    if (path.isAbsolute(arg2)) {
        dest = path.resolve(arg2);
      } else {
        dest = path.join(currDir, arg2);
      }

    await copy(src, dest)
  } catch (err) {console.error(err);}
}