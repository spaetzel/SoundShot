var router;

//Filename: router.js
define(['jquery', 'underscore', 'backbone', 'views/home/index', 'models/question', 'views/questions/view'], function($, _, Backbone, mainHomeView, questionModel, questionViewView, subjectsView) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			':source/:level/types/True/false': 'showTrueFalse',
			':source/:level/types/:type': 'showTypes',
			':source/:level/notingroups': 'showNotInGroups',
			':source/:level/deleted': 'showDeleted',
			
			':source/:level/groups/:uid': 'showGroup',
			':source/:level/subjects/:uid': 'showSubject',
			':source/:level/authors/:uid': 'showAuthor',
			':source/:level/schools/:uid': 'showSchool',
			':source/:level/search/:term': 'doSearch',
			':source/:level/questions/:uid': 'showQuestion',
			':source/:level/assignments/:id': 'showAssignment',
			
			':source/:level/infofields/:field/:value': 'showInfoFieldValue',
			':source/:level/infofields/:field': 'showInfoField',
			':source/:level/': 'showSource',
			// Default
			'*actions': 'defaultAction'
		},
		setSource: function(source,level){
			var match =  sources.getSource(source, level );

			setCurrentSource(match);
		},
		defaultAction: function(actions) {

			// We have no matching route, lets display the home page
			var homeView = new mainHomeView({
				el: $('#bodyArea')
			});
			homeView.render();

		},
		showSource: function(source, level) {

			this.setSource(source,level);
			this.defaultAction();

		}
	});

	var initialize = function() {
		router = new AppRouter;
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};

});
