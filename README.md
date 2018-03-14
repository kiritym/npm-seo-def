# npm-seo-def

> A Node.js package to let a user use this package to scan a HTML file and show all of the SEO defects

## Installation

Install the package globally using npm:

```bash
$ npm install -g npm-seo-def

```

Install the package locally using npm:

```bash
$ npm install npm-seo-def

```


## Usage
```js
var HtmlParser = require('npm-seo-def');

//1. read from input file and outputs on console with default rules
var htmlParser = new HtmlParser({}, "inputfile.html");
htmlParser.parseFile()

//2. read from input file and outputs on console with custom rules
var rules = [{
               "tag":"img",
               "params":{
                   "attribute":{
                     "name": "height",
                     "present": false
                   }
                }
              },
              {
                 "tag":"a",
                 "params":{
                     "attribute":{
                       "name": "rel",
                       "present": true
                     }
                 }
               }];
var htmlParser1 = new HtmlParser(rules, "inputfile.html");
htmlParser1.parseFile()

//3. read from input file and outputs in an output file
var htmlParser2 = new HtmlParser({}, "inputfile.html", 'out.txt');
htmlParser2.parseFile()

//4. read from readable stream and outputs in an output file
var fs = require('fs');
var s = fs.createReadStream("inputfile.html");
var htmlParser3 = new HtmlParser({}, s, 'out1.txt');
htmlParser3.parseStream(s);

```

## How to write custom rules

 - Detect the number of `<img />` tags `without` `alt` attribute
```js
{
    "tag":"img",
    "params":{
        "attribute":{
          "name": "alt",
          "present": false
        },
    }
}
```

- Detect the number of `<img />` tags `with` `alt` attribute
```js
{
   "tag":"img",
   "params":{
       "attribute":{
         "name": "alt",
         "present": true
       },
   }
}
```

- Detect if there are more than <b>5</b> `<strong>` tag in HTML
```js
{
  "tag":"strong",
  "params":{
    "min_count": 5
  }
}
```

- Detect if there is any header that doesn’t have `<title>` tag
```js
{
  "tag":"head",
  "params":{
    "child":[{
              "tag":"title",
              "present": false
            }]
     }
 }
```

- Detect if there is any header that does have `<title>` tag
```js
{
  "tag":"head",
  "params":{
    "child":[{
              "tag":"title",
              "present": true
            }]
     }
 }
```

- Detect if there is any header that doesn’t have `<meta name=“descriptions” ... />` tag
```js
{
  "tag":"head",
  "params":{
    "child":[
              {
                "tag":"meta",
                "present": false,
                "name": "descriptions"
              }
            ]
     }
 }
```




## Development & Testing

Clone the repository and install it:

```bash
$ git clone https://github.com/kiritym/npm-seo-def.git
$ cd npm-seo-def
$ npm install
```

Run the test cases:

```bash
$ npm test
```
