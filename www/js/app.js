define([
  'jquery',
  'underscore',
  'backbone',
 // 'cordova',
  'router'
], function($, _, Backbone, Router){
  var initialize = function(){

      this.sdkKey = '1a7be808d667f813ad67f3a399fe5ea22efec3c0';

      _500px.init({
        sdk_key: this.sdkKey
      });

          Router.initialize();
          
          document.addEventListener('deviceready', 
            function(){
               Router.initialize();
            }, false);
  }

  return {
    initialize: initialize
  };
});
