define(['jquery', 'underscore', 'backbone', 'localStorage', 'i18n!nls/strings', 'text!templates/home/index.html', 'views/record/index', 'views/playback/index'], function($, _, Backbone, LocalStorage, strings, homeTemplate, startRecordingView, playbackIndexView) {

  var indexView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(homeTemplate);
      if(window.plugins.childBrowser == null) {
        ChildBrowser.install();
      }
    },

    events: {
      'click #startRecording': 'startRecording',
      'click #viewRecordings': 'viewRecordings'
    },
    render: function() {

      $(this.el).html(
      this.template({

      }));

  window.plugins.childBrowser.showWebPage('http://500px.com');

      return this;
    },
    startRecording: function() {
      console.log('start');

      var view = new startRecordingView({
        el: this.el
      });
      view.render();

    },
    viewRecordings: function() {
      var view = new playbackIndexView({
        el: this.el
      });
      view.render();
    }
  });

  return indexView;
});