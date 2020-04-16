(function (window) {
    'use strict';
    var App = window.App || {};
    //Like app, jQuery is something that needs to be imported. JQuery makes shit easier
    var $ = window.jQuery;
  

    //Jquery is used to fetch elements from the DOM
    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
          }
          this.$formElement = $(selector); //The $ prefix is not necessary but good practice
          if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
          } //If whatever JQuery got was empty, throw exception
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) { //here we use ON, which is Query for getting the form element
            event.preventDefault(); //Event is the callback function that runs when the form is received

            var data = {}; //method provided by JQuery
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
              });
            console.log(data)
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
      };

      FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
          var emailAddress = event.target.value;
          var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!'
        event.target.setCustomValidity(message);
      }
        });
      };
  
    App.FormHandler = FormHandler;
    window.App = App;
  
  })(window);