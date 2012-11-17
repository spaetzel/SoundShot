define([
  'jquery',
  'underscore',

  'backbone', 
  'i18n!nls/strings',
  'text!templates/record/index.html',
], function($, _, Backbone, strings, recordTemplate){

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( recordTemplate );
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

  return recordIndex;
});