require("babel-register");

(function () {
  console.log("test");
})();

setTimeout(function() {
    console.log('test 2')
}, 1000)