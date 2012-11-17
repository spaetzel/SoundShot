define([
  'jquery',
  'underscore',
  'backbone',
  'i18n!nls/strings'
], function($, _, Backbone, strings){

  return {
	     formatDateTime: function(rawDate){
	    	 var date = new Date( rawDate );
	    	 
	    	 return date.toDateString() + ' ' + date.toLocaleTimeString();
	    		
	     }
  };
});
