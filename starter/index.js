const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");


////////////////////////////////////////
// FILES
// const text = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(text);

// const editedText = `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", editedText);

// console.log("File has been written");

// non-blocking, asynchronous way this makes sure the code runs in the background and doesn't block the rest of the code from running

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//                 console.log("Your file has been written");
//             });
//         });
//         });
//     });

////////////////////////////////////////
// SERVER


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")
 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
    const dataObj =  JSON.parse(data);
const server = http.createServer((req, res) => {
    console.log(req.url)
    const { query, pathname } = url.parse(req.url, true);

    // const pathname = req.url;

    // OVERVIEW PAGE
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "content-type": "text/html"
        })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");

        const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);

        res.end(output);
        // PRODUCT  PAGE
    } else if (pathname === "/product") {
        res.writeHead(200, {
            "content-type": "text/html"
        })
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
        // API
    } else if (pathname === "/api") {
           res.writeHead(200, {
            "content-type": "application/json"
           })
           res.end(data)
        // res.end("API")
    }
     else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });
        res.end("page not found");
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
})
