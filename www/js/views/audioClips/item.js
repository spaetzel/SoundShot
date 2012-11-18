define(['jquery', 'underscore',
'backbone', 'i18n!nls/strings', 'common', 'text!templates/audioClips/item.html',
'views/playback/playClip'],
function($, _, Backbone, strings, common, itemTemplate, playClipView) {

  var audioClipItemView = Backbone.View.extend({
    tagName: 'li',  
    events: {
      'click': 'playClip'
    },
    initialize: function() {
      this.template = _.template(itemTemplate);
    },
    render: function() {
      var self = this;

      var matches = _.filter(self.options.allPhotos.models, function(curPhoto) {
        return curPhoto.get('audioClip') == self.model.get('id')
      });



      $(this.el).html(
      this.template({
        model: self.model,
        matches:  matches,
        common: common
      }));

     
      return this;
    },
    playClip: function(){
      var view = new playClipView({
        el: $('#bodyArea'),
        model: this.model
      });

      view.render();

    }


  });

  return audioClipItemView;
});