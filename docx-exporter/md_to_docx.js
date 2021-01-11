var SimpleMarkdown = require("simple-markdown")
var mdParse = SimpleMarkdown.defaultBlockParse

// mdParse can give us a syntax tree:
var syntaxTree = mdParse("Here is a paragraph and an *em tag*.")
// pretty-print this with 4-space indentation:
console.log(JSON.stringify(syntaxTree, null, 2))


// **Bold**, _Cursive_, Links: [https://bkleinen.github.io](https://bkleinen.github.io), Headings=======, > Quote, * / - Bullets, 1. Numbered List, Indentation (2 Spaces)
