// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','firebase','ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ExampleController", function($scope, $cordovaBarcodeScanner,$firebaseArray,$firebaseObject,$localStorage,$filter,$ionicModal) {


    var connectedRef = new Firebase("https://monitoreo.firebaseio.com/.info/connected");

    connectedRef.on("value", function(snap) {
  
    if (snap.val() === true) {

      var ref = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

      console.log('coneccting.......')

      $localStorage.listas= $firebaseArray(ref);

      $scope.listas = $localStorage.listas

     // $scope.venta = true
  
    } 

    else {
      
       $scope.listas = $localStorage.listas
      
        //$scope.venta = false

          }

    });

    

 $scope.venta = true

      //var ref = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

      /*
      var refmodelo = ref.child('a4');

      refmodelo.set({

          talla:12,
          color:"Negro",
          venta:'No'
       
      })

      */



    //var obj = $firebaseObject(ref);


     // To make the data available in the DOM, assign it to $scope
     //$scope.data = obj;

     // For three-way data bindings, bind it to the scope instead
     //obj.$bindTo($scope, "data");

     /*

      var ref = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

      console.log('coneccting.......')

      $localStorage.listas= $firebaseArray(ref);

      $scope.listas = $localStorage.listas

      */


     $scope.createContact = function(data){

      console.log(data)

      var ref1 = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

      var refmodelo = ref1.child(data.id);

      refmodelo.set({

          id:data.id,
          talla:data.talla,
          color:data.color,
          modelo:data.modelo,
          ubicacion:data.ubicacion
       
      })

     }


 

    $scope.vender = function(sl) {

      var ref = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

      console.log('SIn',sl.$id)


      var refmodelo = ref.child(sl.$id);

      refmodelo.update({
    
          venta:'Vendido'
       
      })


   

    }


 
    $scope.scanBarcode = function() {



      $cordovaBarcodeScanner.scan().then(function(imageData) {

      var ref = new Firebase("https://monitoreo.firebaseio.com/gamarra/codigo");

            
      ref.orderByChild("id").equalTo(imageData.text).on("child_added", function(f) {
      console.log(f.key(),f.val());


      $scope.searchText = f.val().modelo




      });

            



            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };



      $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
 
});



