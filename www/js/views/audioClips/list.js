define(['jquery', 'underscore',
'backbone', 'i18n!nls/strings', 'text!templates/audioClips/list.html', 'collections/audioClips',
'views/audioClips/item'],
function($, _, 
  Backbone, strings, recordTemplate,
   audioClipsCollection, clipItemView) {

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(recordTemplate);
    },
    render: function() {
      var self = this;

      var collection = new audioClipsCollection();
      collection.fetch();


      $(this.el).html(
      this.template({
      }));

      _.each(collection.models, function(curModel){
        self.appendItem( curModel );
      });

      return this;
    },
    appendItem: function(item){
      var view = new clipItemView({
        model: item
      });
      $('ul', this.el).append( view.render().el );
    }
    



  });

  return recordIndex;
});