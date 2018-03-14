'use strict';

var fs = require('fs');
var expect = require('chai').expect;

var HtmlParser = require('../lib/src/index');

describe('Validate presence of h1 tag', function() {
  var rule = [{
        "tag":"h1",
        "params":{
          "min_count": 1
         }
      },
      {
          "tag":"h1",
          "params":{
            "min_count": 3
           }
        }
      ]
 var htmlParser = new HtmlParser(rule, "test/test.html");

  it('should have more than 1 <h1> tag', function() {
    htmlParser.parseFileTest("<h1>This is heading 1</h1><h1>This is heading 2</h1><h1>This is heading 3</h1>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("This HTML have more than 1 <h1> tag(s)\n");
  });
  it('should not have more than 1 <h1> tag', function() {
    htmlParser.parseFileTest("<h1>This is heading 1</h1>");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should not have <h1> tag', function() {
    htmlParser.parseFileTest("");
    var res = htmlParser.executeRule(rule[0]);
    expect(res).to.be.equal("");
  });
  it('should have more than 3 <h1> tags', function() {
    htmlParser.parseFileTest("<h1>This is heading 1</h1><h1>This is heading 2</h1><h1>This is heading 3</h1><h1>This is heading 4</h1>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("This HTML have more than 3 <h1> tag(s)\n");
  });
  it('should not have more than 3 <h1> tags', function() {
    htmlParser.parseFileTest("<h1>This is heading 1</h1><h1>This is heading 2</h1>");
    var res = htmlParser.executeRule(rule[1]);
    expect(res).to.be.equal("");
  });
})
