define([
  'jquery',
  'underscore',
  'backbone','i18n!nls/strings',
  'text!templates/questions/item.html',
  'views/questions/preview',
  'views/questions/rename',
  'views/questions/delete',
  'views/questions/view',
  'models/question'
], function($, _, Backbone, strings, questionTemplate, questionPreviewView, renameView, deleteView, questionViewView,
  questionModel){

  var questionView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( questionTemplate );
    },

    events: {
      'click span.name': 'view'
    },
   
    render: function(){
      $(this.el).html( 
        this.template( 
          {
        	  model: this.model,
        	  showEditControls: this.model.get('classId') == currentClassId,
        	  strings: strings.questions.item
        	}
        ));

      return this;
    },

  
    view: function(){
    	if( assignmentId == null ){
    		this.viewQuestion(this.model);
    	}else{
    		this.preview();
    	}

      return false;
    }
  });

  return questionView;
});