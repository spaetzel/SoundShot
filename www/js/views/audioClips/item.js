define(['jquery', 'underscore',
'backbone', 'i18n!nls/strings', 'text!templates/audioClips/item.html',
'views/playback/playClip'],
function($, _, Backbone, strings, itemTemplate, playClipView) {

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




      $(this.el).html(
      this.template({
        model: self.model
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