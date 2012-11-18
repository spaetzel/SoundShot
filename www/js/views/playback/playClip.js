define(['jquery', 'underscore',

'backbone', 'i18n!nls/strings', 'common', 'text!templates/playback/playClip.html', 'collections/photos', 'views/settings/auth500px', 'collections/authorizations'], function($, _, Backbone, strings, common, playbackTemplate, photosCollection, auth500pxView, authorizationsCollection) {

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(playbackTemplate);

      if(this.options.mediaVar != null) {
        self.mediaVar = this.options.mediaVar;
      }
    },
    events: {
      'click #playAudio': 'startPlayingAudio',
      'click #pause': 'pause',
      'click #stop': 'stop',
      'click #findPhotos': 'findPhotos'
    },

    render: function() {

      var self = this;

      var allPhotos = new photosCollection();
      allPhotos.fetch();

      var matches = _.filter(allPhotos.models, function(curPhoto) {
        return curPhoto.get('audioClip') == self.model.get('id')
      });

      $(this.el).html(
      this.template({
        startTime: self.model.get('startTime'),
        endTime: self.model.get('endTime'),
        photos: matches,
        common: common
      }));


      return this;
    },
    startPlayingAudio: function() {
      var self = this;

      var src = self.model.get('src');

      if(self.mediaVar == null) {
        this.createFile(src, function() {

          self.playAudio();
        });
      } else {
        self.playAudio();
      }
    },
    createFile: function(src, callback) {


      var self = this;

      //first create the file
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getFile(src, {
          create: false,
          exclusive: false
        }, function(fileEntry) {
          console.log("File " + src + " created at " + fileEntry.fullPath);
          self.mediaVar = new Media(fileEntry.fullPath, function() {
            console.log("Media created successfully");
          }, self.onError, null); //of new Media
          callback();
        }, self.onError); //of getFile
      }, self.onError); //of requestFileSystem
    },

    playAudio: function() {

      var self = this;


      // Record audio
      self.mediaVar.play();

      self.mediaStatus = 'playing';

      var recTime = 0;
      var recInterval = setInterval(function() {
        recTime = recTime + 1;
        self.setAudioPosition("play " + recTime + " sec");

        if(recTime >= self.mediaVar.getDuration()) {
          self.setAudioPosition('Done');
          self.mediaStatus = 'stopped';
        }

        if(self.mediaStatus != 'playing') {
          clearInterval(recInterval);

        }
      }, 1000);
    },


    setAudioPosition: function(position) {
      $('#audio_position', this.el).html(position);
    },
    pause: function() {

    },
    stop: function() {

    },
    findPhotos: function() {
      var auth = this.getAuthorization('500px');

      if(auth == null) {
        this.authorize500px();
      } else {
        this.doFindPhotos(auth);
      }

    },
    authorize500px: function() {
      var view = new auth500pxView({
        el: $(this.el)
      });

      view.render();
    },
    doFindPhotos: function(auth) {
      var token = auth.get('token');

      var self= this;


      _500px.setToken(token);


      $('#logged_in').show();

      // Get my user id
      _500px.api('/users', function(response) {
        var me = response.data.user;

        if(me == null) {
          self.authorize500px();

        } else {

          // Get my favorites
          _500px.api('/photos', {
            feature: 'user',
            user_id: me.id
          }, function(response) {
            if(response.data.photos.length == 0) {
              alert('You have no photos.');
            } else {
              $.each(response.data.photos, function() {
                $('#logged_in').append('<img src="' + this.image_url + '" />');
              });
            }
          });
        }
      });

    },
    getAuthorization: function(site) {
      var authorizations = new authorizationsCollection();
      authorizations.fetch();

      var matches = _.filter(authorizations.models, function(curAuth) {
        return curAuth.get('site') == site
      });

      if(matches.length > 0) {
        return matches[0];
      } else {
        return null;
      }

    }



  });

  return recordIndex;
});