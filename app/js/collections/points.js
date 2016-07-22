define([
  'underscore',
  'backbone',
  'models/point'
], function(_, Backbone, PointModel){

    var PointsCollection = Backbone.Collection.extend({
        model: PointModel
    });

  return PointsCollection;
});
