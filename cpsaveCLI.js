#!/usr/bin/env node
var fs = require('fs');
var shell = require('shelljs');

const args = process.argv.slice(2);


function compile(fl) {
    console.log("compiling "+fl+".cpp");
    shell.exec('g++ -std=c++17 '+fl+'.cpp -Wall');
    console.log("compile successfull");
    shell.exec('./a.out < '+'./test/'+fl+'_in > '+'output');
}


function createFolder() {
    const folderName = './test'
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        console.error(err)
    }
}


function createFiles() {
    n = 5;
    var content = '';
    var problems = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    readline.question(`No of problems`, no_of_problems => {
        // console.log(`Hi ${name}!`)
        n = no_of_problems;
        for (var i=0; i < n; i++) {
            fs.writeFile('./test/'+ problems[i] + '_in', content, err => {
                if (err) {console.error(err); return;}})
            fs.writeFile('./test/'+ problems[i] + '_out', content, err => {
                if (err) {console.error(err); return;}})
        }
        readline.close()
    })
}



function test(fl) {
    fs.readFile('./test/'+fl+'_out',function(err,data) {
        var correct = data.toString().split('\n');
        // console.log(correct[0]);
        fs.readFile('output',function(err,data) {
            var test = data.toString().split('\n');
            var ok = true;
            for (var i=0; i < correct.length; i++) {
                // console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
                if (correct[i] != test[i]) ok = false;
            }
            if (ok == true) console.log("ACCEPTED");
            else {
                for (var i=0; i < correct.length; i++) {
                    console.log(correct[i] + "  " + test[i] + (correct[i]!=test[i]?"  <==":"")); 
                    if (correct[i] != test[i]) ok = false;
                }
                console.log("WRONG ANSWER");
            }
        });
    });
}




if (args[0] == 'init') {
    createFolder();
    createFiles();
}else if (args[0] == 'c') {
    compile(args[1]);
} else if (args[0] == 't'){
    test(args[1]);
} else {
    compile(args[1]);
    test(args[1]);
}
