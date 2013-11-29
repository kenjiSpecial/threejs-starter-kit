define([
    'jquery',
    'underscore',
    'modernizr',
    'helper/constans',
    'helper/events',
    'helper/modernizr'
],function( $, _, Modernizr, Constans, Events ){
    var Mouse = function(){
        _.bindAll(
            this,
            'onMouseMove',
            'onMouseDown',
            'onMouseUp'
        );

        $(window).on('mousemove', this.onMouseMove );
        $(window).on('mousedown', this.onMouseDown );
        $(window).on('mouseup  ', this.onMouseUp   );

    };

    Mouse.prototype = {
        mouseDown: false,
        mouse   : { x: null, y: null },
        onMouseMove: function(event){
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;

            Events.emit(Events.MOUSE_MOVE, { mouse: this.mouse, mouseDown: this.mouseDown});
        },

        onMouseDown: function(event){
            this.mouseDown = true;
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;

            Events.emit(Events.MOUSE_DOWN, { mouse: this.mouse, mouseDown: this.mouseDown});
        },

        onMouseUp: function(event){
            this.mouseDown = false;
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;

            Events.emit(Events.MOUSE_UP, { mouse: this.mouse, mouseDown: this.mouseDown});
        }

    };

    var mouse = new Mouse();

    return mouse;
});