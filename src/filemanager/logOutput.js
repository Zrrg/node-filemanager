import { writeBySteam } from "./../streams/write.js";
import { LOG_PATH } from "../constants/global.js";
const { stdin, stdout } = process;

export const logOutput = async (message) => {
  stdout.write(message + "\n"); // вывод в консоль
  writeBySteam(LOG_PATH, { flags: "a" }); // логгирование
};
