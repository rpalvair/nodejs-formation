const fs = require("fs");

fs.readFile("section-modules/test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    fs.writeFile("section-modules/test.txt", "Hello World", "utf-8", (err) => {
      fs.readFile("section-modules/test.txt", "utf-8", (err, data) => {
          console.log(data)
      });
    });
  }
});
