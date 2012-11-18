define(['jquery', 'underscore', 'backbone', 'i18n!nls/strings', 'common', 'text!templates/settings/auth500px.html'], function($, _, Backbone, strings, common, authTemplate, photosCollection) {

  var auth500pxView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click #login': 'login'
    },
    initialize: function() {
      this.template = _.template(authTemplate);
      this.sdkKey = '1a7be808d667f813ad67f3a399fe5ea22efec3c0';


      _500px.init({
        sdk_key: this.sdkKey
      });

      /*

      // When the user logs in we will pull their favorite photos
      _500px.on('authorization_obtained', function() {
        $('#not_logged_in').hide();
        $('#logged_in').show();

        // Get my user id
        _500px.api('/users', function(response) {
          var me = response.data.user;

          // Get my favorites
          _500px.api('/photos', {
            feature: 'user_favorites',
            user_id: me.id
          }, function(response) {
            if(response.data.photos.length == 0) {
              alert('You have no favorite photos.');
            } else {
              $.each(response.data.photos, function() {
                $('#logged_in').append('<img src="' + this.image_url + '" />');
              });
            }
          });
        });
      });

      _500px.on('logout', function() {
        $('#not_logged_in').show();
        $('#logged_in').hide();
        $('#logged_in').html('');
      });

*/

    },

    render: function() {

      var self = this;



      $(this.el).html(
      this.template({

      }));


      // If the user has already logged in & authorized your application, this will fire an 'authorization_obtained' event
      //  _500px.getAuthorizationStatus();
      return this;
    },
    login: function() {

    var self = this;

      var url = _500px.getAuthorizationUrl('blah');

      console.log('going to ' + url);

      window.plugins.childBrowser.showWebPage(url);


      window.plugins.childBrowser.onLocationChange = function(loc) {

        self.onLocationChange(loc);
      };



    },
    onLocationChange: function(newLoc) {


      if(newLoc.indexOf('token') > 0) {
        var result = unescape(newLoc).split("#")[1];
        result = unescape(result);

        // TODO: Error Check
        this.accessToken = result.split(",")[0].split(":")[1];
        //this.expiresIn = result.split("&")[1].split("=")[1];
        window.plugins.childBrowser.close();
        

        alert(this.accessToken);


      }
    }


  });

  return auth500pxView;
});