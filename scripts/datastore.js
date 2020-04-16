//This is a module, all modules follow a timilar format, note function and window as arguments

(function (window){
    'use strict'

    //This is the IIFE format, all modules will have it. Creates a new object or assigns one if existing
    var App = window.App || {};

    //This is the constructor, denoted by capilization. This will create the instance of the object
    function DataStore() {
      console.log('running the DataStore function');
      this.data = {};
    }

    //Helper functions, adds to the object list in key, value format
    DataStore.prototype.add = function (key, val) {
      this.data[key] = val;
    };

    //Retreives one index based on key
    DataStore.prototype.get = function (key) {
      return this.data[key];
    };
  
    //Retreives all
    DataStore.prototype.getAll = function () {
      return this.data;
    };

    DataStore.prototype.remove = function (key) {
      delete this.data[key];
    };
  
    //After the IIFE is called, this does the assigning.
    App.DataStore = DataStore;
    window.App = App;


}) (window)