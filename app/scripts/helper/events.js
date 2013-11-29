define([
    'jquery',
    'eddy'
],  function($){
        var Events = {};

        $.extend(Events, {
            TICK                  : "tick",

            MOUSE_DOWN            : 'mousedown',
            MOUSE_UP              : 'mouseup',
            MOUSE_MOVE            : 'mousemove',

            KEY_DOWN              : '.keydown',
            KEY_UP                : '.keyup',
            KEY_PRESS             : '.keypress',

            WINDOW_RESIZE         : 'resize'
        });



        return Events;
    }
);