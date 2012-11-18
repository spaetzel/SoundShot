define(['jquery', 'underscore', 'backbone'], function($, _, Backbone, questionModel) {
	var photosCollection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("photosStore")

	});

	return photosCollection;
});