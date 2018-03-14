'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');

//<img /> tag with and without 'alt' attribute
describe('Validate presence/absence of image tag with alt attribute rules', function() {
  var rule = [{
                  "tag":"img",
                  "params":{
                      "attribute":{
                        "name": "alt",
                        "present": true
                      }
                  }
             },
             {
                 "tag":"img",
                 "params":{
                     "attribute":{
                       "name": "alt",
                       "present": false
                     }
                 }
            }
           ]
 var htmlParser = new HtmlParser(rule, "test/test.html");

  it('should have 1 <img> tag with \'alt\' attribute', function() {
    htmlParser.parseFileTest("<img alt='hello'></img>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 1 <img> tag(s) with 'alt' attribute\n");
  });
  it('should have 2 <img> tags with \'alt\' attribute', function() {
    htmlParser.parseFileTest("<img alt='hello1'></img><img alt='hello2'></img><img></img>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 2 <img> tag(s) with 'alt' attribute\n");
  });
  it('should have no <img> tag with \'alt\' attribute', function() {
    htmlParser.parseFileTest("<img></img>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 0 <img> tag(s) with 'alt' attribute\n");
  });
  it('should have no <img> tag with \'alt\' attribute', function() {
    htmlParser.parseFileTest("");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 0 <img> tag(s) with 'alt' attribute\n");
  });
  it('should have 1 <img> tag without \'alt\' attribute', function() {
    htmlParser.parseFileTest("<img></img>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("There are 1 <img> tag(s) without 'alt' attribute\n");
  });
  it('should have no <img> tag without \'alt\' attribute', function() {
    htmlParser.parseFileTest("<img alt='hello'></img>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("There are 0 <img> tag(s) without 'alt' attribute\n");
  });
});
