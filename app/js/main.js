require.config({
  paths: {
    text: 'libs/requirejs-text/text',
    jquery: 'libs/jquery-dist/dist/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
  },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
  'app',
], function(App){
  App.initialize();
});
