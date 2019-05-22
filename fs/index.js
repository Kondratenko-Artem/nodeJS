let fs = require('fs');

let filePath = "demo.txt";
let text = "Hello Hello!!!\n";
let formatOption = "utf8";

fs.appendFile(filePath, text, function(error){

    if(error) throw error;

    let data = fs.readFileSync(filePath, formatOption);
    console.log(data);
});
