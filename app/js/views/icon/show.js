define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/icon/show.html',
  'collections/countdowns',
  'views/countdown/show'
], function($, _, Backbone, iconShowTemplate, CountdownCollection, CountdownShowView){
  var IconShowView = Backbone.View.extend({
    tagName: 'div',
    events: {
        'click .clicker': 'startCountdown'
    },
    initialize: function(){
        var template = _.template(iconShowTemplate);
        var vars = {icon: this.model.attributes};
        var html = template(vars);
        this.$el.append(html);
    },
    startCountdown: function(e) {
        var countdownShowView = {};
        var countdownModel = new CountdownCollection();
        countdownModel.add({ recovery_time: this.model.get('recovery_time')*1000 + Date.parse(new Date()) });
        countdownShowView = new CountdownShowView({
            model: countdownModel.last(),
            el: $('#' + this.model.get('id'))
        });
        this.$('#' + this.model.get('id')).html(countdownShowView.render());
        $('#' + this.model.get('id') + '-button').removeClass('clicker');
        this.listenTo(countdownShowView, 'stopCountdown', this.stopCountdown);
        Backbone.trigger('addPoint', this.model.get('points'));
    },
    stopCountdown: function(e) {
        $('#' + this.model.get('id')).html('');
        $('#' + this.model.get('id') + '-button').addClass('clicker');
    }
  });
    //console.log(JSON.stringify(IconsListView));
  return IconShowView;
});
