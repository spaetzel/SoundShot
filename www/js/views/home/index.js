define([
  'jquery',
  'underscore',
  'backbone','i18n!nls/strings',
  'text!templates/home/index.html',
  'models/question'
], function($, _, Backbone, strings, homeTemplate){

  var indexView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( homeTemplate );
    },

    events: {
   
    },
   
    render: function(){
      $(this.el).html( 
        this.template( 
          {
        	  
        	}
        ));

      return this;
    }
  });

  return indexView;
});