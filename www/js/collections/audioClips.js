define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, questionModel){
  var audioClipsCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("audioClipsStore")
    
});

return audioClipsCollection;
});