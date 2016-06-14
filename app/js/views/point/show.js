define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/point/show.html',
  'collections/points'
], function($, _, Backbone, pointShowTemplate, PointsCollection){
  var PointShowView = Backbone.View.extend({
    el: $('#points'),
    initialize: function(){
        this.listenTo(Backbone, 'addPoint', this.addPoint);
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var template = _.template(pointShowTemplate);
        var vars = this.model.toJSON();
        var html = template(vars);
        this.$el.html(html);
    },
    addPoint: function(points) {
        this.model.set({
           points: this.model.get('points') + points
        });
    }
  });
    //console.log(JSON.stringify(IconsListView));
  return PointShowView;
});
