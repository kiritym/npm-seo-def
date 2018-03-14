'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');

describe('Validate presence of strong tag', function() {
  var rule = [{
        "tag":"strong",
        "params":{
          "min_count": 1
         }
      },
      {
          "tag":"strong",
          "params":{
            "min_count": 3
           }
        }
      ]
 var htmlParser = new HtmlParser(rule, "test/test.html");

  it('should have more than 1 <strong> tags', function() {
    htmlParser.parseFileTest("<strong>This is strong tag 1</strong><strong>This is strong tag 2</strong><strong>This is strong tag 3</strong>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("This HTML have more than 1 <strong> tag(s)\n");
  });
  it('should have not more than 1 <strong> tags', function() {
    htmlParser.parseFileTest("<strong>This is strong tag 1</strong>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should have no <strong> tags', function() {
    htmlParser.parseFileTest("");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should have more than 3 <strong> tags', function() {
    htmlParser.parseFileTest("<strong>This is strong tag 1</strong><strong>This is strong tag 2</strong><strong>This is strong tag 3</strong><strong>This is strong tag 4</strong>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("This HTML have more than 3 <strong> tag(s)\n");
  });
  it('should have not more than 3 <strong> tags', function() {
    htmlParser.parseFileTest("<strong>This is strong tag 1</strong><strong>This is strong tag 2</strong>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("");
  });
})
