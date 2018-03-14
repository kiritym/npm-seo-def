'use strict'

var fs = require('fs');
var htmlparser = require('htmlparser2');
var stream = require('stream');
var cheerio = require('cheerio');

var defaultRules = require('../config/default_rules.json');
var util = require('./util.js');
var parser = require('./parser.js');

//Initialize the HtmlParser object
function HtmlParser(rulelist, infile, outfile) {
    this.infile = infile;
    this.outfile = outfile;
    this.rules = util.isEmpty(rulelist) ? defaultRules : rulelist
 }

//Parse the HTML file and execute the SEO rules
HtmlParser.prototype.parseFile = function() {
  var self = this;
  fs.readFile(self.infile, 'utf8', function read(err, data) {
      if (err) {
          console.log("The input file path is wrong. Please provide a correct one.");
          return;
      }
      self.htmldata = util.removeSpaces(data);
      self.$ = cheerio.load(self.htmldata);
      if (self.outfile !== undefined){
        self.wstream = fs.createWriteStream(self.outfile);
      }

      self.rules.forEach(key => {
          self.executeRule(key);
      });
  });
}

//Parse the readable stream and execute the SEO rules
HtmlParser.prototype.parseStream = function(stream) {
  var self = this;
  var rules;
  stream.on('data', function (buf) {
      self.htmldata = util.removeSpaces(buf);
      self.$ = cheerio.load(self.htmldata);
      if (self.outfile !== undefined){
        self.wstream = fs.createWriteStream(self.outfile);
      }
  });

  stream.on('end', function () {
    self.rules.forEach(key => {
        self.executeRule(key)
  });
});
}

//This is for testing the unit tests
HtmlParser.prototype.parseFileTest = function(html) {
  var htmldata = html;
  this.$ = cheerio.load(htmldata);
}

//Execute the rules
HtmlParser.prototype.executeRule = function(r) {
  var self = this;
  var tag = r.tag;
  var params = r.params;
  var msg = "";
  if(util.isPresent(params.child)){// check on tag and its child tags
    params.child.forEach(function(ch, index, array) {
      if(ch.name === undefined){//name attribute is not available
        if(ch.present){//present is true
          msg += parser.presenceOfChildTag(self, tag, ch)
        }else{//present is false
          msg += parser.absenceOfChildTag(self, tag, ch);
        }
      }else{//name attribute is present
        if(ch.present){
          msg += parser.presenceOfChildTagWithAttr(self, tag, ch);
        }else{
          msg += parser.absenceOfChildTagWithAttr(self, tag, ch);
        }
      }
    })
  }else if (util.isEmpty(params.attribute)){//if params does not have attribute, check on tag and it's count only
    msg += parser.checkTagWithCount(self, tag, params);
  }else{// check on tag and its attributes
    msg += parser.checkTagWithAttributes(self, tag, params);
  }
  self.writeResult(msg);
  return msg;
}



//Write the final outputs on console or write stream
HtmlParser.prototype.writeResult = function(msg){
  if (this.wstream === undefined){//if output file is not passed, write the results on console
    process.stdout.write(msg);
    return;
  }
  this.wstream.write(msg, () => {
    this.wstream.end();
  });

}




module.exports = HtmlParser;
