define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var authorizationsCollection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("authorizationStore")

	});

	return authorizationsCollection;
});