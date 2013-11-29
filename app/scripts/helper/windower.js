define([
    'jquery',
    'underscore',
    'modernizr',
    'helper/constans',
    'helper/events',
    'helper/modernizr'
],function( $, _, Modernizr, Constans, Events ){

    var Windower = function(){
        _.bindAll(
            this,
            'onResizeWindow'
        );

        this.initialize();
    }

    Windower.prototype = {
        width      : null,
        halfWidth  : null,
        height     : null,
        halfHeight : null,

        initialize:function(){
            this.width      = window.innerWidth;
            this.halfWidth  = this.width / 2;
            this.height     = window.innerHeight;
            this.halfHeight = this.height / 2;

            if(Modernizr.mobile){
                window.addEventListener('orientationchange', this.onResizeWindow);
            } else {
                Constans.$WINDOW.resize(this.onResizeWindow);
            }
        },

        onResizeWindow : function(){
            this.width      = window.innerWidth;
            this.halfWidth  = this.width / 2;
            this.height     = window.innerHeight;
            this.halfHeight = this.height / 2;

            Events.emit(Events.WINDOW_RESIZE);
        }
    }

    var windower = new Windower();

    return windower;

});