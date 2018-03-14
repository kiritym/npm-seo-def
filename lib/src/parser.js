'use strict'

var util = require('./util.js');


module.exports = {
  //Checking of presence of a child tag inside a parent tag
  presenceOfChildTag: function(s, t, c){
    var self = s;
    var tag = t;
    var ch = c;
    var msg = "";
    self.$(tag).children().each(function(i, elem){
      if (self.$(this)[0].tagName === ch.tag){
           msg = "There is a header that does have "+"<"+ch.tag+"> tag\n";
          return;
        }
      })
      return msg;
  },

  //Checking of presence of a child tag with its attributes inside a parent tag
  presenceOfChildTagWithAttr: function(s, t, c){
    var self = s;
    var tag = t;
    var ch = c;
    var msg = "";
    self.$(tag).children().each(function(i, elem){
      if(self.$(this)[0].tagName === ch.tag && self.$(this).attr('name') === ch.name) {
       msg = "There is a header that does have "+"<"+ch.tag+" name=\""+ch.name+"\" .../> tag\n";
       return;
     }
    })
    return msg;
  },

  //Checking of absence of a child tag inside a parent tag
  absenceOfChildTag: function(s, t, c){
    var self = s;
    var tag = t;
    var ch = c;
    var res = false;
    var msg = "";
    if(self.$(tag).children()[0] === undefined){
      msg = "There is a header that doesn't have "+"<"+ch.tag+"> tag\n";
      return msg
    }else{
      self.$(tag).children().each(function(i, elem){
        if (self.$(this)[0].tagName === ch.tag){
          res = true;
        }
      })
      if(!res){
        msg = "There is a header that doesn't have "+"<"+ch.tag+"> tag\n";
      }
    }
    return msg;
  },

  //Checking of absence of a child tag with attributes inside a parent tag
  absenceOfChildTagWithAttr: function(s, t, c){
    var self = s;
    var tag = t;
    var ch = c;
    var res = false;
    var msg = "";
    self.$(tag).children().each(function(i, elem){
      if( (self.$(this)[0].tagName === ch.tag) && (self.$(this)[0].tagName === ch.tag && self.$(this).attr('name') === ch.name)) {
       res = true;
      }

    })
    if(!res){
     res = false;
     msg = "There is a header that doesn't have "+"<"+ch.tag+" name=\""+ch.name+"\" .../> tag\n";
    }
    return msg;
  },

  //check tag and its count
  checkTagWithCount: function(s, t, p){
    var self = s;
    var tag = t;
    var params = p;
    var msg = "";
    var count = 0;
    self.$(tag).each(function(i, elem){
      count++;
    })
    if(count > params.min_count){
      msg = "This HTML have more than "+params.min_count+" <"+tag+"> tag(s)\n";
    }
    return msg;
  },

  //check tag with attributes
  checkTagWithAttributes: function(s, t, p){
    var self = s;
    var tag = t;
    var params = p;
    var msg = "";
    var count = 0;
    self.$(tag).each(function(i, elem) {
       if (params.attribute.present){
         if (self.$(this).attr(params.attribute.name) !== undefined){
           count++;
         }
       }else{
         if (self.$(this).attr(params.attribute.name) === undefined){
           count++;
         }
       }
    });
    msg = "There are "+count+" <"+tag+"> tag(s) "+util.withorwithout(params.attribute.present)+" '"+params.attribute.name+"' attribute\n";
    return msg;
  }


}
