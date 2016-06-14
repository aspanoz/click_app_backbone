define([
  'underscore',
  'backbone',
  'models/point'
], function(_, Backbone, PointModel){

    var PointCollection = Backbone.Collection.extend({
        model: PointModel 
    });

  return PointCollection;
});
