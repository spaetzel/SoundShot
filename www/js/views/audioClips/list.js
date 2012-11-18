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

      _.o


      $(this.el).html(
      this.template({
      }));

      var sorted = _.sortBy(collection.models, function(item){ return item.get('startTime') * -1 ; });

      _.each(sorted, function(curModel){
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