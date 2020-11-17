require("babel-register");

(() => {
  console.log("test");
})();

setTimeout(() => {
  console.log("test 2");
}, 1000);
