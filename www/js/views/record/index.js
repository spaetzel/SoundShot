define(['jquery', 'underscore',

'backbone', 'i18n!nls/strings', 'text!templates/record/index.html', ], function($, _, Backbone, strings, recordTemplate) {

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.template = _.template(recordTemplate);
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
        // Resuem the recording
        self.recordAudio();

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
    },
    startRecordingAudio: function() {
      $('#startRecord').hide();
      $('#takePhoto').show();

      var src = 'test.wav';


      var self = this;

      this.setAudioPosition('Recording started');

      // Record some audio
      this.createFile(src, function() {

        self.recordAudio();
      });
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
        if( self.mediaStatus != 'recording' ) {

          clearInterval(recInterval);
   //       self.mediaVar.stopRecord();

          //           self.playAudio(mediaRec);
        }
      }, 1000);
    },


    playAudio: function() {

      var self = this;


      // Record audio
      self.mediaVar.play();

      self.mediaStatus = 'playing';

      // Stop recording after 10 sec
      var recTime = 0;
      var recInterval = setInterval(function() {
        recTime = recTime + 1;
        self.setAudioPosition("play " + recTime + " sec");

        if( recTime >= self.mediaVar.getDuration() ){
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
    }



  });

  return recordIndex;
});