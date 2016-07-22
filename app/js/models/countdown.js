define([
  'underscore',
  'backbone'
], function(_, Backbone){

    var CountdownModel = Backbone.Model.extend({

        defaults: {
            recovery_time: 0,
            time: 0
            },
        update: function() {
            this.set({
               time: this.getTime()
            });
            return this;
        },
        getTime: function() {
            var time = (this.get('recovery_time') - Date.parse(new Date())) / 1000 | 0;
            var countdowText = '';
            var days = Math.floor(time / (60 * 60 * 24));
            var hours = Math.floor((time / (60 * 60)) % 24);
            var minutes = Math.floor((time / 60) % 60);
            var seconds = Math.floor(time % 60);
            if ( days > 0 ) {
                countdowText = days + ':';
            }
            if ( (hours > 0) || countdowText !=='') {
                countdowText = countdowText + ('0' + hours).slice(-2) + ':';
            }
            if ( (minutes > 0) || countdowText !=='') {
                countdowText = countdowText + ('0' + minutes).slice(-2) + ':';
            }
            if ( (seconds > 0) || countdowText !=='') {
                countdowText = (countdowText !== '' ? countdowText : '00:') + ('0' + seconds).slice(-2);
            }
            return countdowText;
        }

    });

    return CountdownModel;
});

