define([
  'jquery',
  'underscore',
  'backbone',
  'models/question'
], function($, _, Backbone, questionModel){
  var questionsCollection = Backbone.Collection.extend({
    model: questionModel,
    initialize: function(models, options){  
      if( typeof options != 'undefined') {
        this.groupUid = options.groupUid;
       
      }
    },
    url: function(page, pageSize){


      if(typeof this.groupUid != 'undefined' && this.groupUid ){
        return formatUrl( '/groups/' + this.groupUid + '/questions?' + this.getSourceSort(page, pageSize) );
      }else{
        return formatUrl( '/questions?' + this.getSourceSort(page, pageSize) );
      }
    }
    
});

return questionsCollection;
});