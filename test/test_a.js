'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');


//<a /> tag with and without 'rel' attribute
describe('Validate presence/absence of <a> tag with \'rel\' attribute rules', function() {
  var rule = [{
                "tag":"a",
                "params":{
                    "attribute":{
                      "name": "rel",
                      "present": true
                    }
                }
              },
              {
                  "tag":"a",
                  "params":{
                      "attribute":{
                        "name": "rel",
                        "present": false
                      }
                  }
             }
           ]

 var htmlParser = new HtmlParser(rule, "test/test.html");

  it('should have 1 <a> tag with rel attribute', function() {
    htmlParser.parseFileTest("<a rel='hello'></a>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 1 <a> tag(s) with 'rel' attribute\n");
  });
  it('should have 2 <a> tags with rel attribute', function() {
    htmlParser.parseFileTest("<a rel='hello'></a><a rel='hello'></a><a></a>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 2 <a> tag(s) with 'rel' attribute\n");
  });
  it('should have no <a> tag with rel attribute', function() {
    htmlParser.parseFileTest("<a></a>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 0 <a> tag(s) with 'rel' attribute\n");
  });
  it('should have no <a> tag with rel attribute', function() {
    htmlParser.parseFileTest("");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("There are 0 <a> tag(s) with 'rel' attribute\n");
  });
  it('should have 1 <a> tag without rel attribute', function() {
    htmlParser.parseFileTest("<a></a>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("There are 1 <a> tag(s) without 'rel' attribute\n");
  });
  it('should have no <a> tag without rel attribute', function() {
    htmlParser.parseFileTest("<a rel='hello'></a>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("There are 0 <a> tag(s) without 'rel' attribute\n");
  });
});
