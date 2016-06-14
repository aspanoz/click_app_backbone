define([
  'underscore',
  'backbone'
], function(_, Backbone){

    var IconModel = Backbone.Model.extend({
      
      defaults: {
        id: 0,
        rest_time: 0,
        recovery_time: 5,
        points: 0,
        title: ''
      },
     

    });

  return IconModel;
});
