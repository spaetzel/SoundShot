define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var questionsModel = Backbone.Model.extend({
  	url: function(){
  		return formatUrl(  '/questions/' + this.get('uid') );
  	}
  });
  return questionsModel;

});
