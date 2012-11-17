define([
  'jquery',
  'underscore',
  'backbone',
 // 'cordova',
  'router'
], function($, _, Backbone, Router){
  var initialize = function(){

          document.addEventListener('deviceready', 
            function(){
               Router.initialize();
            }, false);
  }

  return {
    initialize: initialize
  };
});
