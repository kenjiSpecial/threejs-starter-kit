define([
    'jquery',
    'underscore',
    'modernizr',

    // helper
    'helper/constans',
    'helper/events',
    'helper/keys',

    'helper/modernizr'
],function( $, _, Modernizr, Constans, Events, Keys ){
    var SubDom = function(){
        _.bindAll(
            this,
            'keyDown',
            'keyUp'
        );

        this.el = document.getElementById("helper");
        this.$el = $(this.el);

        Events.on(Events.KEY_DOWN, this.keyDown);
        Events.on(Events.KEY_UP,   this.keyUp);

    }

    SubDom.prototype = {
        el: null,
        $el: null,
        keyDown: function(data){

            switch (data.keyCode){
                case Keys.KEY_A:
                    this.$el.find(".key-a").addClass("key-down");
                    break;
                case Keys.KEY_W:
                    this.$el.find(".key-w").addClass("key-down")
                    break;
                case Keys.KEY_D:
                    this.$el.find(".key-d").addClass("key-down");
                    break;
                case Keys.KEY_X:
                    this.$el.find(".key-x").addClass("key-down")
                    break;
                case Keys.KEY_P:
                    this.$el.find(".key-p").addClass("key-down");
                    break;
                case Keys.KEY_L:
                    this.$el.find(".key-l").addClass("key-down")
                    break;

            }
        },

        keyUp : function(data){

            switch (data.keyCode){
                case Keys.KEY_A:
                    this.$el.find(".key-a").removeClass("key-down");
                    break;
                case Keys.KEY_W:
                    this.$el.find(".key-w").removeClass("key-down")
                    break;
                case Keys.KEY_D:
                    this.$el.find(".key-d").removeClass("key-down");
                    break;
                case Keys.KEY_X:
                    this.$el.find(".key-x").removeClass("key-down")
                    break;
                case Keys.KEY_P:
                    this.$el.find(".key-p").removeClass("key-down");
                    break;
                case Keys.KEY_L:
                    this.$el.find(".key-l").removeClass("key-down")
                    break;
            }

        }
    }

    var subDom = new SubDom();

    return subDom;
});