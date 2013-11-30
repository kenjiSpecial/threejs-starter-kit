define('modernizr', [], Modernizr);


require.config({
    shim: {
        threeJs: {
            exports: 'THREE'
        },

        underscore : {
            exports: '_'
        },

        greensockLite : {
            exports: 'TweenLite'
        }

    },

    paths: {
        jquery     : '../bower_components/jquery/jquery',
        threeJs    : '../bower_components/threejs/build/three',
        eddy       : '../bower_components/eddy-js/build/eddy',
        underscore : '../bower_components/underscore/underscore',
        greensockLite  : '../bower_components/greensock/src/uncompressed/TweenLite'
    }
});

require([
    // library
    'jquery',
    'threeJs',
    'greensockLite',

    // view
    'view/sub/subDom',

    // helper
    'helper/ticker',
    'helper/windower',
    'helper/events',
    'helper/mouse',
    'helper/keys',
    'helper/constans',

    //
    'eddy',
    //'greensock'

], function ( $, _THREE, TweenLite, subDom, ticker, windower, Events, mouse, keys, Constans ) {

    var scene, renderer, camera;
    var spheres = [];
    var currentPostions = [],
        nextPostions = [];

    var cameraRad = 1000, theta1 = 0, theta2 = 0, futureTheta1 = 0, futureTheta2 = 0, NUM = 30;
    var obj = {rate: 0};


    if(Modernizr.mobile){
        var html =  "<div>" +
                    "<p>Thank you for checking 'Three.js start kit' demo page.</p>" +
                    "<p>Your browser doesn't seem to support WEBGL.</p>" +
                    "<iframe width='280' height='150 ' src='//www.youtube.com/embed/48AqRSn-fPw' frameborder='0' allowfullscreen></iframe>"+
                    "<p>This is the video how you can play the demo of 'Three.js start kit'.</p>" +
                    "<p>Please check it on WebGL Supported browser such as Google Chrome.</p>" +
                    "</div>"

        Constans.$BODY.html(html);
        Constans.$BODY.addClass("mobile")



    }else{
        subDom.visible();
        init();
    }


    function init(){
        ticker.start();

        initScene();

        Events.on(Events.WINDOW_RESIZE , onResize);
        Events.on(Events.MOUSE_MOVE    , onMouseMove);
        Events.on(Events.MOUSE_DOWN    , onMouseDown);
        Events.on(Events.TICK         ,  loop);

    }

    function initScene(){

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize( windower.width, windower.height );

        document.getElementById("main").appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, windower.width/windower.height, 0.1, 10000);


        camera.position.x = cameraRad * Math.sin(theta1) * Math.cos(theta2);
        camera.position.y = cameraRad * Math.sin(theta1) * Math.sin(theta2);
        camera.position.z = cameraRad * Math.cos(theta1);
        scene.add(camera);


        for(var i = 0; i < NUM; i++){
            var rad = (30 + 120 * Math.random())|0;
            sphere = new THREE.Mesh( new THREE.SphereGeometry( rad, 20, 20 ), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}) );
            var position = { x: 1000 * (Math.random() - 0.5), y: 1000 * (Math.random() - 0.5), z: 1000 * (Math.random() - 0.5)  };

            currentPostions[i] = {x: null, y: null, z: null};
            nextPostions.push({x: null, y: null, z: null});

            sphere.position.x = position.x;
            sphere.position.z = position.y;
            sphere.position.y = position.z;

            spheres.push(sphere);
            scene.add(sphere);
        }

        var pointLight = new THREE.PointLight( 0xffffff );

        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        scene.add(pointLight);

        // add helper
        var helperObject = new THREE.AxisHelper(100);
        helperObject.position.set(0, 0, 0);
        scene.add(helperObject);

        camera.lookAt(scene.position);


    }

    function onResize(){

        camera.aspect =  windower.width / windower.height;
        camera.updateProjectionMatrix();

        renderer.setSize( windower.width, windower.height );


    }

    function onMouseMove( data ){
        futureTheta1 = (data.mouse.x / windower.width) * 2 * Math.PI;
        futureTheta2 = (data.mouse.x / windower.width) * Math.PI/4;
    }

    function loop(){
        theta1 += (futureTheta1 - theta1) * 0.05;
        theta2 += (futureTheta2 - theta2) * 0.05;

        camera.position.x = cameraRad * Math.sin(theta1);
        camera.position.y = cameraRad * Math.sin(theta1);
        camera.position.z = cameraRad * Math.cos(theta2);

        camera.lookAt(scene.position);

        keyDownMove();

        renderer.render(scene, camera);
    }

    function keyDownMove(){
        if      (keys.isKeyDown(keys.KEY_A)) move("x", -1);
        else if (keys.isKeyDown(keys.KEY_D)) move("x",  1);
        else if (keys.isKeyDown(keys.KEY_W)) move("y",  1);
        else if (keys.isKeyDown(keys.KEY_X)) move("y", -1);
        else if (keys.isKeyDown(keys.KEY_P)) move("z",  1);
        else if (keys.isKeyDown(keys.KEY_L)) move("z", -1);

    }

    function move( coordinate, val){
        switch (coordinate){
            case "x":
                for(var i = 0; i< spheres.length; i++){
                    var sphere = spheres[i];
                    sphere.position.x += val;
                }
                break;
            case "y":
                for(var i = 0; i< spheres.length; i++){
                    var sphere = spheres[i];
                    sphere.position.y += val;
                }
                break;
            case "z":
                for(var i = 0; i< spheres.length; i++){
                    var sphere = spheres[i];
                    sphere.position.z += val;
                }
                break;
        }
    }

    var tween;

    function onMouseDown(){
        console.log('mousedown');

        if(tween)
            if(tween.isActive()) tween.pause();


        for(var i = 0; i < nextPostions.length; i++){

            currentPostions[i].x = spheres[i].position.x;
            currentPostions[i].y = spheres[i].position.y;
            currentPostions[i].z = spheres[i].position.z;


            var position = { x: 1000 * (Math.random() - 0.5), y: 1000 * (Math.random() - 0.5), z: 1000 * (Math.random() - 0.5)  };

            nextPostions[i].x = position.x;
            nextPostions[i].y = position.y;
            nextPostions[i].z = position.z;

        }


        obj = {rate: 0};
        tween = TweenLite.to(obj, 0.6, { rate: 1, onUpdate: updateAnimation, onComplete: completeAnimation, ease:Power2.easeOut});

    }

    function updateAnimation(){

        for(var i = 0; i < spheres.length; i++){
            var sphere = spheres[i];

            sphere.position.x = currentPostions[i].x * (1 - obj.rate) + nextPostions[i].x * obj.rate;
            sphere.position.y = currentPostions[i].y * (1 - obj.rate) + nextPostions[i].y * obj.rate;
            sphere.position.z = currentPostions[i].z * (1 - obj.rate) + nextPostions[i].z * obj.rate;
        }


    }

    function completeAnimation(){

        for(var i = 0; i < spheres.length; i++){
            var sphere = spheres[i];

            sphere.position.x = nextPostions[i].x;
            sphere.position.y = nextPostions[i].y;
            sphere.position.z = nextPostions[i].z;


            currentPostions[i].x = nextPostions[i].x;
            currentPostions[i].y = nextPostions[i].y;
            currentPostions[i].z = nextPostions[i].z;
        }

    }


});
