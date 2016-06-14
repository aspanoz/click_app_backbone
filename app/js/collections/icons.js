define([
  'underscore',
  'backbone',
  'models/icon'
], function(_, Backbone, IconModel){

    var IconsCollection = Backbone.Collection.extend({
        model: IconModel
    });

  return IconsCollection;
});
