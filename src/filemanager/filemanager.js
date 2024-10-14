import {
  INIT_MESSAGE,
  PROMPT_MESSAGE,
  EXIT_MESSAGE1,
  EXIT_MESSAGE2,
  INVALID_INPUT,
  GENERIC_ERROR,
  FS_ERROR,
} from "../constants/global.js";

import os from "node:os";
import { access } from "fs";
import path from "path";

import { create } from "./../fs/create.js";
import { list } from "./../fs/list.js";
import { rename } from "./../fs/rename.js";
import { makeDirectory } from "./../fs/mkdir.js";



import { logOutput } from "./logOutput.js";
import { filemanagerCp } from "./cp.js";
import { filemanagerRm } from "./rm.js";
import { filemanagerMv } from "./mv.js";

import { readByStream } from "./../streams/read.js";
import { calculateHash } from "./../hash/calcHash.js"

const { stdin, stdout } = process;

const cpus = os.cpus();

const cpuinfo = () => {
  cpus.forEach((cpu) => {
    console.log(
      `Model: ${cpu.model} speed: ${(cpu.speed / 1000).toFixed(2)} GHz`
    );
  });
};

const homedir = os.homedir();
var __currentdir = homedir;

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

  if (quotedValues.length > 0) {
    if (commandArgs[1].includes('"')) commandArgs[1] = quotedValues[0];
    else if (commandArgs[2].includes('"')) commandArgs[2] = quotedValues[0];
  }
  if (quotedValues.length > 1 && commandArgs[2].includes('"')) {
    commandArgs[2] = quotedValues[1];
  }

  switch (command) {
    case "ls":
    case "list":
    case "dir":
      stdout.write("\n");
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
        } else cd = path.join(__currentdir, commandArgs[1]);

        access(cd, (err) => {
          if (err) {
            console.log(`${commandArgs[1]} is non-existent`);
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
      await filemanagerRm(__currentdir, commandArgs[1]);
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

    case "cp":
    case "copy":
      await filemanagerCp(__currentdir, commandArgs[1], commandArgs[2]);
      currentDirectory();
      break;

    case "mv":
    case "move":
      await filemanagerMv(__currentdir, commandArgs[1], commandArgs[2]);
      currentDirectory();
      break;

    case "eol":
      console.log(`Default system EOL is ${JSON.stringify(os.EOL)}`);
      currentDirectory();
      break;

    case "cpuinfo":
      console.log(`CPU Info: `);
      cpuinfo();
      currentDirectory();
      break;

    case "homedir":
    case "home":
      console.log(`User home directory: ${homedir}`);
      currentDirectory();
      break;

    case "userinfo":
      const userinfo = os.userInfo();
      console.log(`System user name: ${userinfo.username}`);
      currentDirectory();
      break;

    case "arch":
    case "architecture":
      console.log(`OS Architecture: ${os.arch}`);
      currentDirectory();
      break;


    case "hash":
       calculateHash(__currentdir, commandArgs[1]);
       currentDirectory();
      break;


    case "help":
    case "?":
      {
        console.log(
          "Commands: ls, list, dir / mkdir / up, back / cd / add, touch, write, w / cat, read / rm , del, remove, delete / rn, rename / cp, copy / mv, move / eol / cpuinfo / home, homedir / userinfo /  help, ? / .exit, exit, quit, q! "
        );
      }
      currentDirectory();

      break;

    default:
      logOutput(INVALID_INPUT, command);
      break;

    case ".exit":
    case "exit":
    case "quit":
    case "q!":
      detect_exit();
      break;
  }
};

const currentDirectory = async () => {
  console.log("You are currently in", __currentdir);
  stdout.write(">>> ");
};

const waitForInput = async () => {
  stdin.on("data", (data) => {
    stdout.write("(づ ᴗ _ᴗ)づ>>> ");
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

stdout.write(INIT_MESSAGE);
waitForInput();
