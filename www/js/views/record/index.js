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

      var self = this;


      navigator.camera.getPicture(function(imageURI) {
        self.stopRecordingAudio();

        $('#previewImage img').attr('src', imageURI);

        self.savePhoto(imageURI);

      }

      , this.onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });

    },
    savePhoto: function(imageURI) {
      var self = this;

      // Copy from the temp folder to the documents folder
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

          fileEntry.copyTo(fileSystem.root, new Date().getTime() + '.jpg', function(finalEntry) {


            self.savePhotoModel(finalEntry)
          }, self.onError)
        });


      }, self.onError);
    },
    savePhotoModel: function(fileEntry) {


      var self = this;

      try {
        var photoModel = {
          id: new Date().getTime(),
          audioClip: self.model.get('id'),
          dateTaken: new Date().getTime(),
          localUrl: fileEntry.fullPath
        };
      } catch(ex) {
        alert('model ' + ex);
      }

      try {
        var collection = new photosCollection();

      } catch(ex) {
        alert(ex);
      }

      try {
        collection.create(photoModel);
      } catch(ex) {
        alert('create', ex);
      }
    },
    stopRecordingAudio: function() {
      var self = this;

      self.mediaVar.stopRecord();
      self.mediaStatus = 'stopped';

      $('#stopRecord').hide();
      $('#playAudio').show();

  
        self.model.save({
          endTime: new Date().getTime()
        });
   

    },
    startRecordingAudio: function() {
      $('#startRecord').hide();
      $('#takePhoto').show();

      var id = new Date().getTime();

      var src = id + '.wav';

      var self = this;

      this.setAudioPosition('Recording started');

      // Record some audio
      this.createFile(src, function() {
        self.saveModel(id, src);

        self.recordAudio();
      });
    },
    saveModel: function(id, src) {
      var self = this;

      var attrs = {
        id: id,
        src: src,
        startTime: new Date().getTime(),
        duration: 0
      };

      var collection = new audioClipsCollection();

      self.model = collection.create(attrs);



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