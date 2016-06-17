define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/countdown/show.html'
], function($, _, Backbone, countdownShowTemplate){
  var CountdownShowView = Backbone.View.extend({
    initialize: function(){
        this.start();
    },
    render: function() {
        var template = _.template(countdownShowTemplate);
        var vars = this.model.update().toJSON();
        var html = template(vars);
        return html;
    },
    start: function() {
        this.interval = setInterval(function() {
            this.$el.html(this.render());
            if (this.model.getTime() == '') this.stop();
        }.bind(this), 1000);
    },
    stop: function() {
        clearInterval(this.interval);
        this.model.clear();
        this.trigger('stopCountdown');
    }
  });
  return CountdownShowView;
});

