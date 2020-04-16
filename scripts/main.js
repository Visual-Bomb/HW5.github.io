(function (window) {
    'use strict';
    db.collection('orders').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      })
    })



    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App; //Retreives the window objects to use in the function body
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var webshim = window.webshim;
    var myTruck = new Truck('ncc-1701', remoteDS);//Creating an instance
    //But this instance can't be accessed from within main freely, so export it to window where it's global
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
      myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
    console.log(formHandler)

  })(window);