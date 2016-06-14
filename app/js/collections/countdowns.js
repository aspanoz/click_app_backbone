define([
  'underscore',
  'backbone',
  'models/countdown'
], function(_, Backbone, CountdownModel){

    var CountdownsCollection = Backbone.Collection.extend({
        model: CountdownModel
    });

  return CountdownsCollection;
});
