define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, questionModel){
  var shootsCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("shootsStore")
    
});

return shootsCollection;
});