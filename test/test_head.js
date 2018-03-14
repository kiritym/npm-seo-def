'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');

describe('Validate rules for head tag', function() {
  var rule = [{//0
                "tag":"head",
                "params":{
                  "child":[{
                            "tag":"title",
                            "present": true
                          }]
                   }
               },
               {//1
                 "tag":"head",
                 "params":{
                   "child":[{
                             "tag":"title",
                             "present": false
                           }]
                    }
                },
               {//2
                 "tag":"head",
                 "params":{
                   "child":[{
                             "tag":"meta",
                             "present": false,
                             "name": "descriptions"
                           }]
                    }
                },
                {//3
                  "tag":"head",
                  "params":{
                    "child":[{
                              "tag":"meta",
                              "present": false,
                              "name": "keywords"
                            }]
                     }
                 },
                 {//4
                   "tag":"head",
                   "params":{
                     "child":[{
                               "tag":"meta",
                               "present": true,
                               "name": "keywords"
                             }]
                      }
                  },
              ]
 var htmlParser = new HtmlParser(rule, "test/test.html");

  it('should have 1 header with <title> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title></head>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There is a header that does have <title> tag\n");
  });
  it('should have 1 header with <title> tag', function() {
    htmlParser.parseFileTest("<head><meta name='hello'><title>Test</title></head>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There is a header that does have <title> tag\n");
  });
  it('should have no header with <title> tag', function() {
    htmlParser.parseFileTest("<head></head>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should have no header with <title> tag', function() {
    htmlParser.parseFileTest("<a><title></title></a>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should have 1 header without <title> tag', function() {
    htmlParser.parseFileTest("<head></head>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("There is a header that doesn't have <title> tag\n");
  });
  it('should have no header with <title> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title></head>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("");
  });

  it('should have no header with <meta name="descriptions" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='not-descriptions' /></head>");
    var res = htmlParser.executeRule(rule[2]);
    expect(res).to.be.equal("There is a header that doesn\'t have <meta name=\"descriptions\" .../> tag\n");
  });
  it('should have header with <meta name="descriptions" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='descriptions' /></head>");
    var res = htmlParser.executeRule(rule[2]);
    expect(res).to.be.equal("");
  });
  it('should have no header with <meta name="keywords" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='not-keywords' /></head>");
    var res = htmlParser.executeRule(rule[3]);
    expect(res).to.be.equal("There is a header that doesn\'t have <meta name=\"keywords\" .../> tag\n");
  });
  it('should have header with <meta name="keywords" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='keywords' /></head>");
    var res = htmlParser.executeRule(rule[3]);
    expect(res).to.be.equal("");
  });
  it('should have no header without <meta name="keywords" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='not-keywords' /></head>");
    var res = htmlParser.executeRule(rule[4]);
    expect(res).to.be.equal("");
  });
  it('should have header with <meta name="keywords" ...> tag', function() {
    htmlParser.parseFileTest("<head><title>Hello</title><meta name='keywords' /></head>");
    var res = htmlParser.executeRule(rule[4]);
    expect(res).to.be.equal("There is a header that does have <meta name=\"keywords\" .../> tag\n");
  });

});
