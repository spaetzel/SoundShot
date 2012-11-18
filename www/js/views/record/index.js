define(['jquery', 'underscore',

'backbone', 'i18n!nls/strings', 'text!templates/record/index.html', 'collections/audioClips', 'collections/photos'], function($, _, Backbone, strings, playbackTemplate, audioClipsCollection, photosCollection) {

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(playbackTemplate);
    },
    events: {
      'click #startRecord': 'startRecordingAudio',
      'click #stopRecord': 'stopRecordingAudio',
      'click #takePhoto': 'takePhoto',
      'click #playAudio': 'playAudio'
    },

    render: function() {
      $(this.el).html(
      this.template({

      }));


      return this;
    },
    takePhoto: function() {
      navigator.camera.getPicture(function(imageURI) {
        $('#previewImage').attr('src', imageURI);
        // Resume the recording
        //        self.recordAudio();
        var photoModel = {
          id: new Date().getTime(),
          audioClip: self.model.get('id'),
          dateTaken: new Date().getTime(),
          localUrl: imageURI
        };

        var collection = new photosCollection();

        collection.create(photoModel);

      }

      , this.onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });

    },
    stopRecordingAudio: function() {
      var self = this;

      self.mediaVar.stopRecord();
      self.mediaStatus = 'stopped';

      $('#stopRecord').hide();
      $('#playAudio').show();

      self.model.save({
        duration: self.mediaVar.getDuration()
      });
    },
    startRecordingAudio: function() {
      $('#startRecord').hide();
      $('#takePhoto').show();

      var id = new Date().getTime();

      var src = id + '.wav';

      var self = this;

      this.setAudioPosition('Recording started');

      self.model = self.saveModel(id, src);


      // Record some audio
      this.createFile(src, function() {
        self.model = self.saveModel(id, src);

        self.recordAudio();
      });
    },
    saveModel: function(id, src) {
      self.model = {
        id: id,
        src: src,
        startTime: new Date().getTime(),
        duration: 0
      };

      var collection = new audioClipsCollection();

      collection.create(self.model);


    },
    createFile: function(src, callback) {


      var self = this;

      //first create the file
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getFile(src, {
          create: true,
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
    onError: function(error) {
      alert(JSON.stringify(error));
    },
    recordAudio: function() {
      $('#stopRecord').show();

      var self = this;

      // Record audio
      self.mediaVar.startRecord();

      self.mediaStatus = 'recording';

      // Stop recording after 10 sec
      var recTime = 0;
      var recInterval = setInterval(function() {
        recTime = recTime + 1;
        self.setAudioPosition('Recorded ' + recTime + " seconds");
        if(self.mediaStatus != 'recording') {

          clearInterval(recInterval);

        }
      }, 1000);
    },


    playAudio: function() {


    },


    setAudioPosition: function(position) {
      $('#audio_position', this.el).html(position);
    }



  });

  return recordIndex;
});