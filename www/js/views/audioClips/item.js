define(['jquery', 'underscore',
'backbone', 'i18n!nls/strings', 'text!templates/audioClips/item.html'],
function($, _, Backbone, strings, itemTemplate) {

  var audioClipItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(itemTemplate);
    },
    render: function() {
      var self = this;




      $(this.el).html(
      this.template({
        model: self.model
      }));

     
      return this;
    }


  });

  return audioClipItemView;
});