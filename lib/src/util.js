'use strict'

//All the helper methods used in the application
module.exports = {
    isEmpty: function(obj) {
      return (obj === null  || obj === undefined) || (Object.keys(obj).length === 0);
    },
    isPresent: function(obj) {
      return (obj !== null  && obj !== undefined) && (Object.keys(obj).length >= 0);
    },
    withorwithout: function(flag){
      return flag ? "with" : "without"
    },
    doesordoesnot: function(flag){
      return flag ? "does" : "doesn't"
    },
    removeSpaces: function(data){
      return data.toString().replace((/  |\r\n|\n|\r/gm),"");
    }

};
