define([
  'jquery',
  'underscore',
  'backbone','localStorage', 'i18n!nls/strings',
  'text!templates/home/index.html',
  'views/record/index'
], function($, _, Backbone, LocalStorage, strings, homeTemplate, startRecordingView){

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

       var Library = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("libraryStore")
        
        // is the problem with my library that is has no model reference?
    });

console.log(Backbone.LocalStorage);

    var attrs = {
        id: new Date().getTime(),
        title  : 'The Tempest',
        author : 'Bill Shakespeare',
        length : 123
    };
    
    var library = null;

         //   window.localStorage.clear();
            library = new Library();
    

        console.log(library.length, 0, 'empty initially');
        library.fetch();
        console.log(library.length, 0, 'empty read');
    

    library.create(attrs);

    console.log(library.length, 0, 'empty read');


alert(library.length);



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