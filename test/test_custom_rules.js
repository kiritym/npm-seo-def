'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');

describe('Validate custom rules', function() {
  var rule = [{
                "tag":"head",
                "params":{
                  "child":[{
                            "tag":"meta",
                            "present": false,
                            "name": "robots"
                          }]
                   }
               },
               {
                 "tag":"head",
                 "params":{
                   "child":[{
                             "tag":"meta",
                             "present": true,
                             "name": "robots"
                           }]
                    }
                },
               ]

   var htmlParser = new HtmlParser(rule, "test/test.html");
   it('should have no header with <meta name="robots" ...> tag', function() {
     htmlParser.parseFileTest("<head><title>Hello</title><meta name='not-robots' /></head>");
     var res = htmlParser.executeRule(rule[0]);
     expect(res).to.be.equal("There is a header that doesn\'t have <meta name=\"robots\" .../> tag\n");
   });
   it('should have header with <meta name="robots" ...> tag', function() {
     htmlParser.parseFileTest("<head><title>Hello</title><meta name='robots' /></head>");
     var res = htmlParser.executeRule(rule[0]);
     expect(res).to.be.equal("");
   });
   it('should have no header without <meta name="robots" ...> tag', function() {
     htmlParser.parseFileTest("<head><title>Hello</title><meta name='not-robots' /></head>");
     var res = htmlParser.executeRule(rule[1]);
     expect(res).to.be.equal("");
   });
   it('should have header with <meta name="robots" ...> tag', function() {
     htmlParser.parseFileTest("<head><title>Hello</title><meta name='robots' /></head>");
     var res = htmlParser.executeRule(rule[1]);
     expect(res).to.be.equal("There is a header that does have <meta name=\"robots\" .../> tag\n");
   });
 });
