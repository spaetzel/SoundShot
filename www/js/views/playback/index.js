define(['jquery', 'underscore',

'backbone', 'i18n!nls/strings', 'text!templates/playback/index.html', 'views/audioClips/list'], 
function($, _, Backbone, strings, playbackTemplate, audioClipsList) {

  var playbackIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(playbackTemplate);
    },

    render: function() {
      $(this.el).html(
      this.template({

      }));

      var list = new audioClipsList({
        el: $('#list', this.el)
      });
      list.render();

      return this;
    }



  });

  return playbackIndex;
});