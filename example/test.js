var HtmlParser = require('npm-seo-def');
var inputfilepath = "./test.html";
var rules = [
              {
                  "tag":"img",
                  "params":{
                      "attribute":{
                        "name": "alt",
                        "present": false
                      },
                  }
             },
             {
                "tag":"a",
                "params":{
                    "attribute":{
                      "name": "rel",
                      "present": false
                    },
                }
              },
              {
                "tag":"h1",
                "params":{
                  "min_count": 1
                }
              },
              {
                "tag":"strong",
                "params":{
                  "min_count": 3
                }
              },
              {
                "tag":"head",
                "params":{
                  "child":[{
                            "tag":"title",
                            "present": true
                          },
                          {
                            "tag":"meta",
                            "present": true,
                            "name": "descriptions"
                          },
                          {
                            "tag":"meta",
                            "present": true,
                            "name": "keywords"
                          }
                        ]
                   }
               }
             ]

//1. read from input file and outputs on console with default rules
// var htmlParser = new HtmlParser({}, inputfilepath);
// htmlParser.parseFile()

// //2. read from input file and outputs on console with custom rules
var htmlParser1 = new HtmlParser(rules, inputfilepath);
htmlParser1.parseFile()
//
//
//3. read from input file and outputs in an output file
var htmlParser2 = new HtmlParser(rules, inputfilepath, 'out.txt');
htmlParser2.parseFile()
// //
// // //4. read from readable stream and outputs in an output file
var fs = require('fs');
var s = fs.createReadStream(inputfilepath);
var htmlParser3 = new HtmlParser(rules, s, 'out1.txt');
htmlParser3.parseStream(s);
