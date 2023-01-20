const fs = require('fs');

const file1 = "courseDetails.json";
const file2 = "sampleData.json";

//Reading the file asynchronously
function readFile1(file1){

    fs.readFile(file1, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("\n\nThe data of file 1\n\n" + data);
            console.log("Completed reading file 1");
        }
    })
}

//Reading the file asynchronously
function readFile2(file2){

    fs.readFile(file2, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("\n\nThe data of file 2\n\n" + data);
            console.log("Completed reading file 2");
        }
    })
}

console.log("Start reading file 1 in sync mode");
readFile1(file1);

console.log("Start reading file 2 in sync mode");
readFile2(file2);

console.log("All done");