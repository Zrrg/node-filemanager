# Scoring: File Manager

[Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

Runs with:

`npm run start -- --username=your_username`

Or, if [arguments are not detected](https://github.com/npm/cli/issues/7375), it might work with:

`npm run start -- -- --username=your_username`


## Commands

`ls, list, dir / mkdir / up, back / cd / add, touch, write, w / cat, read / rm , del, remove, delete / rn, rename / cp, copy / mv, move / eol / cpuinfo / home, homedir / userinfo /  help, ? / .exit, exit, quit, q! `

## Note

- Would be cool if your terminal supports utf-8, if no there might be question marks.
- I had to use `currentDirectory();` before each break in switch statement, because if i put it in function after all statments, it shows old folder (async so async). If there are more elegant solution for my case, please let me know.

## Basic Scope
- General
✅     - **+6** Application accepts username and prints proper message
✅   - **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
✅   - **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
✅   - **+10** Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
✅   - **+10** Go upper from current directory
✅  - **+10** Go to dedicated folder from current directory
✅    - **+20** List all files and folders in current directory
- Basic operations with files implemented properly
✅    - **+10** Read file and print it's content in console
✅    - **+10** Create empty file
✅    - **+10** Rename file
✅    - **+10** Copy file
✅    - **+10** Move file
✅    - **+10** Delete file
- Operating system info (prints following information in console) implemented properly
✅    - **+6** Get EOL (default system End-Of-Line)
✅    - **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
✅    - **+6** Get home directory
✅    - **+6** Get current *system user name* (Do not confuse with the username that is set when the application starts)
    - **+6** Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
    - **+20** Calculate hash for file 
- Compress and decompress operations
    - **+20** Compress file (using Brotli algorithm)
    - **+20** Decompress file (using Brotli algorithm)

## Advanced Scope

✅ **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
✅ **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)  
✅ **+20** Codebase is written in ESM modules instead of CommonJS
✅ **+20** Codebase is separated (at least 7 modules)

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only `Readme.md`, `.gitignore`, etc.)
