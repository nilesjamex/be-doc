const fs = require("fs");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("i could not do it");
      resolve(data);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log("error encountered");
        console.log("dog saved");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log("error encountered");
//         console.log("dog saved");
//       });
//     }).catch (err => {
//         console.log(err.message);
//     })
// });
