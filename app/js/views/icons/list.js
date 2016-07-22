define([
  'jquery',
  'underscore',
  'backbone',
  'collections/icons',
  'views/icon/show',
  'collections/points',
  'views/point/show',
  'models/countdown'
], function($, _, Backbone, IconsCollection, IconShowView, PointsCollection, PointShowView, PointModel) {
  var IconsListView = Backbone.View.extend({

    el: $('#container'),

    initialize: function() {
      this.collection = new IconsCollection();
      this.collection.add({
        id: 145,
        rest_time: 0,
        recovery_time: 35,
        points: 15,
        title: 'Middle time'
      });
      this.collection.add({
        id: 146,
        rest_time: 0,
        recovery_time: 428,
        points: 30,
        title: 'Long time'
      });
      this.collection.add({
        id: 147,
        rest_time: 0,
        recovery_time: 8,
        points: 10,
        title: 'Little time'
      });
    },

    render: function() {
        this.$el.html('');
        this.collection.each(function(iconModel) {
            var iconShowView = new IconShowView({
                model: iconModel
            });
            this.$el.append(iconShowView.render().el);
        }.bind(this));
        var pointShowView = new PointShowView({
            model: new PointModel({
                points: 139,
                title: 'Points'
            })
        });
        this.$el.append(pointShowView.render());
        return this;
    },

  });

    // console.log(JSON.stringify(IconsListView));
  return IconsListView;
});

