define([
  'jquery',
  'underscore',
  'backbone','i18n!nls/strings',
  'text!templates/home/index.html'',
  'models/question'
], function($, _, Backbone, strings, homeTemplate){

  var view = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( homeView );
    },

    events: {
      'click span.name': 'view'
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

  return view;
});