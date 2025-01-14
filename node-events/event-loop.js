const fs = require("fs");
const crypto = require("crypto");
const start = date.now();
setTimeout(() => console.log("timer1 has finished"), 0);
setImmediate(() => console.log("immediate 1 finished"));

fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log("password encrypted");
  });
});

console.log("hello top level");
