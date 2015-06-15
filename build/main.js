(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/main.coffee":[function(require,module,exports){
var tata;

tata = require("toto/tata");

console.log("hello world");

console.log(tata());


},{"toto/tata":"/Users/floz/Documents/projects/perso/digital/template/src/scripts/toto/tata.js"}],"/Users/floz/Documents/projects/perso/digital/template/src/scripts/toto/tata.js":[function(require,module,exports){
module.exports = function() {
  return "tata";
}

},{}]},{},["./src/scripts/main.coffee"]);
