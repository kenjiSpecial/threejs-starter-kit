define([
    'jquery',
    'helper/events'
], function($, Events){


    var Ticker = function(){
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
    }

    Ticker.prototype = {
        rafID : null,
        prevTime: null,
        deltas : null,
        paused : false,
        eventData : {
            delta: 0,
            paused: false
        },

        start : function(){
            this.startTime = +new Date();
            this.prevTime = +new Date();
            this.deltas = [];
            this.rafID     = requestAnimationFrame(this.onAnimationFrame);
        },

        stop : function(){
            cancelRequestAnimationFrame(this.onAnimationFrame);
        },

        onAnimationFrame : function(){
            var nextTime = +new Date(),
                delta = nextTime - this.prevTime;

            this.rafID    = requestAnimationFrame(this.onAnimationFrame);
            this.prevTime = nextTime;
            this.eventData.delta = delta;
            this.eventData.paused = this.paused;

            this.deltas.push(delta);

            while(this.deltas.length > 100) this.deltas.shift();

            Events.trigger(Events.TICK, this.eventData);
        },

        get frameLength() {
            var i   = this.deltas.length,
                sum = 0;

            while(i--) {
                sum += this.deltas[i];
            };

            return sum / this.deltas.length;
        },

        get FPS() {
            return 1000 / this.frameLength;
        }

    };

    return new Ticker();

});