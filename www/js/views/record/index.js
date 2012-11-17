define([
  'jquery',
  'underscore',

  'backbone', 
  'i18n!nls/strings',
  'text!templates/record/index.html',
], function($, _, Backbone, strings, recordTemplate){

  var recordIndex = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.template = _.template( recordTemplate );
    },

    events: {
      
    },
   
    render: function(){
      $(this.el).html( 
        this.template( 
          {
        	 
        	}
        ));

     
     var src= 'test.wav';


    var self = this;

    try{

      this.createFile(src, function(fullSrc){
        alert(fullSrc + ' '  + src);
        self.recordAudio(fullSrc)
      });
    }catch(ex)
{
  alert('create error ' + ex);
}


      return this;
    

         

    },
    createFile: function(src, callback){
       /*
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(src,
                { create: true, exclusive: false }, //create if it does not exist
                function success(entry) {
                    var src = entry.toURI();
                    console.log(src); //logs blank.wav's path starting with file://
                    callback(src);
                },
                function fail() {}
            );
        }, function fail(){});

*/

console.log("creating file");
var self = this;

             //first create the file
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                    fileSystem.root.getFile(src, {
                        create: true,
                        exclusive: false
                    }, function(fileEntry){
                        console.log("File " + src + " created at " + fileEntry.fullPath);
                        mediaVar = new Media(fileEntry.fullPath, function(){
                            console.log("Media created successfully");
                        }, self.onError, null); //of new Media
                        callback(mediaVar);
                    }, self.onError); //of getFile
                }, self.onError); //of requestFileSystem
      

    },
    onError: function(error){
      alert(JSON.stringify(error));
    },
    recordAudio: function(mediaRec) {
    
 
        // Record audio
        mediaRec.startRecord();

var self = this;

        // Stop recording after 10 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            self.setAudioPosition(recTime + " sec");
            if (recTime >= 10) {
                clearInterval(recInterval);
                mediaRec.stopRecord();
            }
        }, 1000);
    },

   setAudioPosition: function(position) {
        $('#audio_position', this.el).html(position);
    }




  });

  return recordIndex;
});