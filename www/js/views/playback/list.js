define(['jquery', 'underscore',

'backbone', 'i18n!nls/strings', 'text!templates/playback/list.html', 'collections/audioClips'], 
function($, _, Backbone, strings, recordTemplate, audioClipsCollection) {

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(recordTemplate);
    },

    events: {
      'click #items li', 'playClip'
    },

    render: function() {
      var collection = new audioClipsCollection();
      collection.fetch();


      $(this.el).html(
      this.template({
        models: collection.models
      }));

      return this;
    }
    



  });

  return recordIndex;
});