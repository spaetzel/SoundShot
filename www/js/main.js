require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    jqueryUi: 'libs/jquery/jquery-ui.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    cordova: 'libs/cordova/cordova-2.2.0'
    text: 'libs/require/text',
    i18n: 'libs/require/i18n',
    templates: '../templates',
    bootstrap: 'libs/bootstrap/bootstrap.min'
  }
  ,urlArgs: "bust=" +  (new Date()).getTime() // bust cache for development
});




require([

  // Load our app module and pass it to our definition function
  'app'
  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
], function(App, $){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();


});
