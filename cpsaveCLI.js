#!/usr/bin/env node
var fs = require('fs')
var shell = require('shelljs')
var path = require('path')
const chalk = require('chalk');
const figlet = require("figlet");
const clui = require('clui')
const Spinner = clui.Spinner
var countdown = new Spinner('Compiling...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

const args = process.argv.slice(2);


function compile(fl) {
    countdown.message('compiling '+fl+'.cpp..');
    countdown.start()
    shell.exec('g++ -std=c++17 '+fl+'.cpp -Wall',(err)=>{
        if (!err) {
            countdown.stop()
            console.log(chalk.black.bgGrey("Compiled") + chalk.green.bgBlack(":)"));
        }
    });
}


// function createFolder() {
//     const folderName = './test'
//     try {
//         if (!fs.existsSync(folderName)) {
//             fs.mkdirSync(folderName)
//         }
//     } catch (err) {
//         console.error(err)
//     }
// }

const createFolder = new Promise((resolve,reject) => {
    if (!fs.existsSync('./test')) {
        fs.mkdir('./test',(err)=>{
            if (err) {
                console.log('couldnt create test folder')
                reject(err)
            } else {
                resolve("folder created")
            }
        })
    } else {
        resolve('folder already exists')
    }
})


// function createFiles() {
//     n = 5;
//     var content = '';
//     var problems = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
//     const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//     readline.question(`No of problems`, no_of_problems => {
//         // console.log(`Hi ${name}!`)
//         n = no_of_problems;
//         for (var i=0; i < n; i++) {
//             fs.writeFile('./test/'+ problems[i] + '_in', content, err => {
//                 if (err) {console.error(err); return;}})
//             fs.writeFile('./test/'+ problems[i] + '_out', content, err => {
//                 if (err) {console.error(err); return;}})
//         }
//         readline.close()
//     })
// }

// function compl(str) {
//     shell.exec(str)
// }

// function test(fl,i) {
//     var testcase = i.toString();
//     const path   = './test/'+fl+'_out_'+ testcase;
//     const pathin = './test/'+fl+'_in_'+ testcase;
    
    // fs.access(path, fs.F_OK, (err)=> {
    //     if (err) {
    //         // console.log(path + '  Not found'); file not there 
    //     } else {
    //         shell.exec('./a.out < '+ pathin +' > '+'output')
    //         fs.readFile(path,function(err,data) {
    //             var correct = data.toString().split('\n');
    //             // console.log(correct[0]);
    //             fs.readFile('output',function(err,data) {
    //                 var test = data.toString().split('\n');
    //                 var ok = true;
    //                 for (var i=0; i < correct.length; i++) {
    //                     // console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
    //                     if (correct[i] != test[i]) ok = false;
    //                 }
    //                 if (ok == true) console.log("ACCEPTED");
    //                 else {
    //                     for (var i=0; i < correct.length; i++) {
    //                         console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
    //                         if (correct[i] != test[i]) ok = false;
    //                     }
    //                     console.log("WRONG ANSWER");
    //                 }
    //             });
    //         });
    //     }
    // })
//     setTimeout(()=>{ if (i < 10) test(fl,i+1)},0)
// }

async function test(fl,i) {
    var testcase = i.toString();
    const path   = './test/'+fl+'_out_'+ testcase;
    const pathin = './test/'+fl+'_in_'+ testcase;
    countdown.message('Test ' + testcase)
    countdown.start()
    let fileexistPromise = new Promise ((resolve,reject)=>{
        fs.access(path,fs.F_OK,(err)=>{
            if (err) {
                // file not found
                countdown.stop()
            } else {
                resolve('found')
            }
        })
    })
    let result = await fileexistPromise
    // console.log(result)
    
    let executeAout = new Promise ((resolve,reject)=>{ 
        shell.exec('./a.out < '+ pathin +' > '+'output',(err)=>{
            if (err) {
                reject("could not compiled")
            }else {
                resolve("compiled")
            }
        })
    })
    result = await executeAout
    // console.log(result)
    let checkresult = new Promise ((resolve,reject)=>{
        fs.readFile(path,function(err,data) {
            var correct = data.toString().split('\n');
            // console.log(correct[0]);
            fs.readFile('output',function(err,data) {
                var test = data.toString().split('\n');
                var ok = true;
                for (var i=0; i < correct.length; i++) {
                    // console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
                    if (correct[i] != test[i]) ok = false;
                }
                var status = "Pending"
                if (ok == true) {
                    // console.log("ACCEPTED")
                    status = " ACCEPTED "
                }
                else {
                    for (var i=0; i < correct.length; i++) {
                        console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
                        if (correct[i] != test[i]) ok = false;
                    }
                    // console.log("WRONG ANSWER");
                    status = " WRONG ANSWER "
                }
                resolve(status)
            });
        });
    })
    result = await checkresult;
    if (result == " ACCEPTED ") {
        console.log("Test "+testcase + ": " + chalk.bgGreen(result));
    } else {
        console.log("Test "+testcase + ": " + chalk.bgRed(result));
    }
    countdown.stop()
    if (i < 10) test(fl,i+1)
}

function parseContest(link) {
    countdown.start()
    console.log(chalk.cyan.italic('Contest => [' + link.split('/')[4] + ']')) 
    countdown.message('Parsing Contest Please wait...');
    var scrapperpath = path.resolve(__dirname,'scrapper.py ')
    command = 'python ' + scrapperpath + link
    shell.exec(command,(err)=>{
        if (!err) {
            countdown.stop()
            console.log(chalk.black.italic.bgGrey('    All Problems parsed    ')) 
        }
    })
}


function init(link) {
    console.log(chalk.red.bold(figlet.textSync('cpsavecli', {horizontalLayout: 'full',}))) 
    createFolder
    .then(ok=>{
        parseContest(link)
    }).catch(err=>{
        console.log(err)
    })
}

function createCppFile(fname) {
    var content = ''
    fname = fname.toUpperCase()
    if (!fs.existsSync(fname+'.cpp')) {
        fs.writeFile(fname + '.cpp',content,(err) => {
            if (!err) {
                shell.exec('open ' + fname + '.cpp')
            }
        })
    } else {
        shell.exec('open ' + fname + '.cpp')
    }
}

if (args[0] == 'init') {
    init(args[1])
}if (args[0] == 'solve') {
    createCppFile(args[1])
}else if (args[0] == 'c') {
    compile(args[1])
} else if (args[0] == 't'){
    test(args[1],1)
} else {
    compile(args[1])
    test(args[1],1)
}
