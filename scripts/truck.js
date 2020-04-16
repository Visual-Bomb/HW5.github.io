(function (window) {
    'use strict';
    var App = window.App || {};
  
    //The constructor, incoming parameters added as locals
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }
    //Creates instances that are handed off to datastore. Invokes the datastore function.
    //When the object is created, db will have to be the datastore object. Object is a
    //key value combo passed to it.
    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order); //The email becomes the key while the entire order is the value
      };

      //handles, removing an object form the db
      Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
      };


      Truck.prototype.printOrders = function () {
        var customerIdArray = Object.keys(this.db.getAll());
    
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
          console.log(this.db.get(id));
        }.bind(this)); //Bind is necessary to declate this is assigned to truck, not forEach
      };
  
    App.Truck = Truck;
    window.App = App;
  
  })(window);