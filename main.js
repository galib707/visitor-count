const http = require("http");
const fs = require("fs");
let count = 0;

const server = http.createServer((req, res) => {
  let path = "";
  if (req.url === "/style.css") {
    res.setHeader("Content-Type", "text/css");
    fs.readFile("./views/style.css", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log("Error", err.message);
        res.write("Error", err.message);
        res.end();
      }
      res.write(data);
      res.end();
    });
  } else {
    switch (req.url) {
      case "/":
        count++;
        path += "./views/home.html";
        break;

      case "/home":
        count++;
        path += "./views/home.html";
        break;

      case "/contact":
        count++;
        path += "./views/contact.html";
        break;

      case "/product":
        count++;
        path += "./views/product.html";
        break;

      default:
        path += "./views/home.html";
        break;
    }
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log("Error", err.message);
        res.write("Error", err.message);
        res.end();
      }
      res.write(data);
      res.write(`
            <script>
            document.querySelector(".counter").innerHTML = "<h2>${count} times</h2>";
            </script>
            `);
      res.end();
    });
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log("SERVER is running on http://localhost:" + PORT);
});
