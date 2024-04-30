import join from "lodash/join";

console.log("loading newindex.js");

const element = document.createElement("h1");

element.innerHTML = join(["Welcome to", "New Index Page!"], " ");

document.body.append(element);