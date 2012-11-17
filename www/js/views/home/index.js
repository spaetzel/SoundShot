define([
  'jquery',
  'underscore',
  'backbone','i18n!nls/strings',
  'text!templates/home/index.html',
  'views/record/index'
], function($, _, Backbone, strings, homeTemplate, startRecordingView){

  var indexView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( homeTemplate );
    },

    events: {
      'click #startRecording': 'startRecording',
      'click #viewRecordings': 'viewRecordings'
    },   
    render: function(){
      $(this.el).html( 
        this.template( 
          {
        	  
        	}
        ));

      alert(navigator);
        alert(navigator.compass);
        try{
            navigator.compass.getCurrentHeading(function(heading){
            alert('Heading: ' + heading.magneticHeading);
          }, 
          function( compassError){
             alert('Compass Error: ' + compassError.code);
           }
           );
        }catch(ex){
            alert(ex);

        }
        

      return this;
    },
    startRecording: function(){
      console.log('start');

      var view = new startRecordingView({
        el: this.el
      });
      view.render();
      
    },
    viewRecordings: function(){

    }
  });

  return indexView;
});