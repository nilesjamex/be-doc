const fs = require("fs")

// const text = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(text);

// const editedText = `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", editedText);

// console.log("File has been written");

// non-blocking, asynchronous way this makes sure the code runs in the background and doesn't block the rest of the code from running
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
                console.log("Your file has been written");
            });
        });
        });
    });