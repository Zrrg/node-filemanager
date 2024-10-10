import {
  PROMPT_MESSAGE,
  EXIT_MESSAGE1,
  EXIT_MESSAGE2,
  INVALID_INPUT,
  GENERIC_ERROR,
  FS_ERROR,
} from "../variables/global.js";
import { create } from "./../fs/create.js";
import { list } from "./../fs/list.js";
import { isFile } from "./../fs/isfile.js";

import { logOutput } from "./logOutput.js";
import { homedir } from "os";
import path from "path";
import { access, mkdir } from "fs";
import { readByStream } from "./../streams/read.js";
import { remove, removeDir } from "./../fs/delete.js";
import { rename } from "./../fs/rename.js";
import { makeDirectory } from "./../fs/mkdir.js";

const { stdin, stdout } = process;

var __currentdir = homedir();

const getUsername = async () => {
  for (const i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    const keyValue = arg.split("=");
    const key = keyValue[0];
    const value = keyValue[1];
    if (key === "--username") {
      return value;
    } else return "user";
  }
};

const getQuotedValue = async (input) => {
  const qr = /"(.*?)"/g;
  const matches = Array.from(input.matchAll(qr));

  if (matches.length > 0) {
    return matches.map((match) => match[1]); // extract values from obj to arr
  } else return [];
};

const prompt = async (input) => {
  const commandArgs = input.trim().split(" ");
  const command = commandArgs[0];
  const quotedValues = await getQuotedValue(input);
  //console.log(`quotedValues  : ${quotedValues}`);

  if (quotedValues.length > 0) {
    commandArgs[1] = quotedValues[0];
    if (quotedValues.length > 1) commandArgs[2] = quotedValues[1];
  }
  switch (command) {
    case "ls":
    case "list":
    case "dir":
      await list(__currentdir);
      currentDirectory();
      break;

    case "mkdir":
      var newDir = " ";
      if (path.isAbsolute(commandArgs[1])) {
        newDir = path.resolve(commandArgs[1]);
      } else {
       newDir = path.join(__currentdir, commandArgs[1]);
      }
      await makeDirectory(newDir);
      currentDirectory();
      break;

    case "up":
    case "back":
      __currentdir = path.join(__currentdir, "..");
      currentDirectory();

      break;

    case "cd":
      try {
        var cd = "";

        if (path.isAbsolute(commandArgs[1])) {
          cd = path.resolve(commandArgs[1]);
        } else
          cd = path.join(__currentdir, commandArgs[1]);
        

        access(cd, (err) => {
          if (err) {
            console.log(`${commandArgs[1]} is non-existant`);
          } else __currentdir = cd;
          currentDirectory();
        });
      } catch (err) {
        console.error(FS_ERROR, err);
      }
      break;

    case "add":
    case "touch":
    case "write":
    case "w":
      try {
        const addPath = path.join(__currentdir, commandArgs[1]);
        var content = "";
        if (commandArgs.length > 2) content = commandArgs[2];

        await create(addPath, content);
      } catch (err) {
        console.error(err);
      }
      currentDirectory();
      break;

    case "cat":
    case "read":
      const catPath = path.join(__currentdir, commandArgs[1]);
      stdout.write("\n");
      await readByStream(catPath);
      currentDirectory();
      break;

    case "remove":
    case "delete":
    case "del":
    case "rm":
      try {
        const remPath = path.join(__currentdir, commandArgs[1]);
        if (await isFile(remPath)) {
        await remove(remPath);
        }
        else 
        await removeDir(remPath);
      } catch (err) {
        console.error(err);
      }
      currentDirectory();
      break;


    case "rmdir":
      try {
        const remPath = path.join(__currentdir, commandArgs[1]);
        await removeDir(remPath);
      } catch (err) {
        console.error(err);
      }
      currentDirectory();
      break;

    case "rename":
    case "rn":
      try {
        const oldPath = path.join(__currentdir, commandArgs[1]);
        const newPath = path.join(__currentdir, commandArgs[2]);
        await rename(oldPath, newPath);
      } catch (err) {
        console.error(err);
      }
      currentDirectory();
      break;

    default:
      logOutput(INVALID_INPUT, command);
      break;

    case ".exit":
    case ".exit":
    case "quit":
    case "q!":
      detect_exit();
  }
  await stdout.write("(づ ᴗ _ᴗ)づ>>> ");
};

const currentDirectory = async () => {
  console.log("You are currently in", __currentdir);
};

const waitForInput = async () => {
  stdin.on("data", (data) => {
    prompt(data.toString());
  });
  process.on("SIGINT", () => {
    detect_exit();
  });
};

const detect_exit = async () => {
  console.log(EXIT_MESSAGE1 + username + EXIT_MESSAGE2);
  process.exit(0);
};

const username = await getUsername();
console.log(PROMPT_MESSAGE, username + "!");
currentDirectory();

stdout.write("ヾ(・ω・*)>>> ");
waitForInput();
