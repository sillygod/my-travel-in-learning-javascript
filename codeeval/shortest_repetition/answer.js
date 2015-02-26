// var fs = require('fs');
// fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line){

//     you need to adjsut the code for answering the question of codeeval


// });




function solve(line) {


    function checkIsShortest(ele) {
        if (ele.length !== 0) {
            isShortest = false;
        }
    }

    if (line !== '') {
        //ok do things here,
        for (var i = 0; i < line.length; i++) {

            var isShortest = true;

            substring = line.slice(0, i + 1);
            res = line.split(substring);
            res.forEach(checkIsShortest);

            if (isShortest) {
//                 console.log(substring.length);
                return '' + substring.length;
//                 break;
            }
        }
    }
}
