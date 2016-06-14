define([
  'underscore',
  'backbone'
], function(_, Backbone){

    var PointModel = Backbone.Model.extend({
      defaults: {
        points: 0,
        title: 'Points title'
      },
    });

  return PointModel;
});
