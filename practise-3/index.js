const fs = require('fs');

const file1 = "courseDetails.json";
const file2 = "sampleData.json";

function readFile1(file1){
    var data = fs.readFileSync(file1)
    console.log("\n\nThe data of file 1\n\n" + data);
    console.log("Completed reading file 1");
}

function readFile2(file2){
    var data = fs.readFileSync(file2)
    console.log("\n\nThe data of file 2\n\n" + data);
    console.log("Completed reading file 2");
}

console.log("Start reading file in sync mode");
readFile1(file1);
readFile2(file2);
console.log("End of reading file in sync mode");