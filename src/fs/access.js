import {access, constants } from 'fs/promises';

export const checkAccess = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}