const fs = require('fs');
const readline = require('readline'); //the realine module provides an interface for reading data from a readable stram
const os = require('os');
const http = require('http');
const rl = readline.createInterface({ //the interface waits for data to be received on the input stream
    input: process.stdin,
    output: process.stdout
});

console.log("Choose an option: ")
console.log("1. Read package.json ")
console.log("2. Display OS info")
console.log("3. Start HTTP server ")
rl.question('Type a number: ', (answer) => { // this method displays the query by writing it to the output, waits for user input to be provided on input

    if (answer < 1 || answer > 3 ) { //check if input is valid
        console.log("Invalid option")
    } else {
        switch (answer) {
            case "1":
                fs.readFile(__dirname + '/package.json', 'utf-8', (err, data) => {  //log all data in json
                    if (err) throw err;
                    console.log(data)
                })
                break;
            case "2":
                console.log("Getting OS info...")                               // log all OS info
                console.log(`SYSTEM MEMORY: ${(os.totalmem() /1024 / 1024 / 1024).toFixed(2) + "GB" }`);
                console.log(`FREE MEMORY: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2) + "GB" }`);
                console.log(`CPU CORES: ${os.cpus().length}`);
                console.log(`ARCH: ${os.arch()}`);
                console.log(`PLATFORM: ${os.platform()}`);
                console.log(`RELEASE: ${os.release()}`);
                console.log(`USER: ${os.userInfo().username}`);
                break;
            case "3":
                console.log("Starting HTTP server...")                      //starting http server on port 3000
                console.log("listening on port 3000")
                require("http").createServer(function(req, res){
                    res.statusCode = 200;
                    res.setHeader("content-TYPE", "text/plain");
                    res.end("Hello World")
                }).listen(3000);
                break;
        }
    }
    rl.close(); //the readline.Interface instance is complete when we get to this point.
}
)
