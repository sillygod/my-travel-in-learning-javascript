// var fs = require('fs');
// fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line){

//     you need to adjsut the code for answering the question of codeeval


// });




function solve(line) {
    var numCounter = {};
    var digitTimes = {};
    
    for(var i in line){
        if(numCounter[line[i].toString()] !== undefined){
            numCounter[line[i].toString()]++;
        } else {
            numCounter[line[i].toString()] = 1;
        }
        digitTimes[i] = line[i];
    }
    
    // check data
    for(var i in line){
        if(line[i] != 0 && numCounter[i] != line[i]){
            return 0;
        }
    }
    
    return 1;
}