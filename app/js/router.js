define([
  'jquery',
  'underscore',
  'backbone',
  'views/icons/list'
], function($, _, Backbone, IconsListView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'showIcons'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;

    Backbone.application = {};
    if (Backbone.application.router == undefined) {
        Backbone.application.router = app_router;
    }

    app_router.on('route:showIcons', function(actions) {
      var iconsListView = new IconsListView();
      iconsListView.render();
    });

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
