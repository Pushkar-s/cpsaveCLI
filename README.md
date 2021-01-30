# CPSAVECLI

  

## Highlights

**cpsavecli** A simple command line Tool for

- parsing contests

- Testing Solutions with correct solutions along with compilation

  

## Install
Install the package globally 
```console
$ npm install chalk -g
```
## Usage
Initialize the current directory with test files inside **Test** folder
[contest link] - link of the contest to be parsed
```console
$ cpsavecli init [contest_link]
```
![](https://github.com/Pushkar-s/cpsaveCLI/blob/master/readmeMedia/initCommand.gif)
Create Cpp files to write solutions
``` console
$ cpsavecli solve [name]
```
![](https://github.com/Pushkar-s/cpsaveCLI/blob/master/readmeMedia/solveCommand.gif)
Compile Solutions to check for Errors
- **'c'** -Tells CLI to compile file with name as **[name]**
``` console
$ cpsavecli c [name]
```
Test solutions with Correct Results
- 't' - Tells CLI to test [name] file
``` console
$ cpsavecli t [name]
```
![](https://github.com/Pushkar-s/cpsaveCLI/blob/master/readmeMedia/ctCommand.gif)
Compile and Test solutions with one command
``` console
$ cpsavecli ct [name]
```
 Finally look at the **WRONG ANSWER** result. **Yeah That's Perfect!** cuz **Its the law**

![](https://github.com/Pushkar-s/cpsaveCLI/blob/master/readmeMedia/IMG_20210130_182650.jpg)