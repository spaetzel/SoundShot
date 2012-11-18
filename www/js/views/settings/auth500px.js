define(['jquery', 'underscore', 'backbone', 'i18n!nls/strings', 'common', 'text!templates/settings/auth500px.html', 'collections/authorizations'], function($, _, Backbone, strings, common, authTemplate, authorizationsCollection) {

  var auth500pxView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click #login': 'login'
    },
    initialize: function() {
      this.template = _.template(authTemplate);

    },

    render: function() {

      var self = this;



      $(this.el).html(
      this.template({

      }));

      this.login();


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


        _500px.setToken(this.accessToken);

        // this.loggedIn();
        this.storeToken();

      }
    },
    storeToken: function() {


      var authorizations = new authorizationsCollection();

      var attrs = {
        id: new Date().getTime(),
        site: '500px',
        token: this.accessToken
      };

      try {
        authorizations.create(attrs);
      } catch(ex) {
        alert(ex);
      }

      this.options.parentView.render();
      this.options.parentView.doFindPhotos();

    }
    /*,

    loggedIn: function() {
      $('#not_logged_in').hide();
     
    }*/


  });

  return auth500pxView;
});