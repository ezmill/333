var container;
var scene, renderer, camera, controls;
var mouseX = 0, mouseY = 0;
var time = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var button = document.getElementById("shop");
var start = Date.now(); 

var index = 0;
var objects = [];
var loadedItems = 0;
init();
function checkLoading() {

    ++loadedItems;

    if (loadedItems >= 3) {
      document.getElementById("loading-container").style.display = "none";

      animate();

    }
}
// animate();

function init() {
        
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);
    camera.position.set(0,0, 10);
    controls = new THREE.OrbitControls(camera);
    controls.noZoom = true;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( {preserveDrawingBuffer: true, antialias:true} );
    renderer.setClearColor(0xffffff, 1.0)
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    addLights();
    loadModels();
    var path = "./";
    var format = '.png';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    var envCube = THREE.ImageUtils.loadTextureCube( urls, null, checkLoading );
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = envCube;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
    scene.add( mesh );

    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );

    button.addEventListener("mousedown", function(event){
        container.innerHTML = "<iframe src='http://nullgallery.myshopify.com/' frameborder='0'></iframe>";
        button.style.display = "none";
    });

    window.addEventListener( 'resize', onWindowResize, false );

}
function addLights(){
    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1,0, 0.8);
    scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(-1,0, 0.8);
    scene.add(light);
    

    // var light = new THREE.AmbientLight(0xffffff, 1.0);
    // scene.add(light);
}
function loadModels(){
    // var urls = ["Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg"];
    var image = new Image();
    image.onload = function(){

    }
    image.src = "Environment.jpg";

    var urls = ["Environment-old.jpg",
                "Environment-old.jpg",
                "Environment-old.jpg",
                "Environment-old.jpg",
                "Environment-old.jpg",
                "Environment-old.jpg"
                ];
    var abstractCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping, checkLoading);
    var logoCube = THREE.ImageUtils.loadTextureCube(urls, null, checkLoading);
    abstractCube.minFilter = abstractCube.magFilter = THREE.NearestFilter;
    var abstractMat = new THREE.MeshBasicMaterial({
        envMap: abstractCube,
        refractionRatio: 0.9,
        side: 2
    })
    var logoMat = new THREE.MeshPhongMaterial({
        envMap: logoCube,
        side: 2,
        color: 0x000000,
        reflectivity: 0.15,
        combine: THREE.MixOperation 
    })
    loadModel("Extruded Logo Triangulated.obj", abstractMat, {scale: 1.0, position: new THREE.Vector3(0.0,0.0,0.0), rotation: new THREE.Vector3(0.0,0.0,0.0)});

    loadModel("Abstract Mesh 2.obj", logoMat, {scale: 2.0, position: new THREE.Vector3(0.0,0.0,0.0), rotation: new THREE.Vector3(0.0,0.0,0.0)});


}
function animate(){
	window.requestAnimationFrame(animate);

	draw();
}
function onDocumentMouseDown(event){
    // for(var i = 0; i < wallCubes.length; i++){
    //     wallCubes[i].handleDirection();
    // }
    // if(counter == 0){
    //     capturer.start();
    //     counter++;
    // } else {
    //     capturer.stop();
    //     capturer.save( function( blob ) {
    //         window.location = blob;
    //     });
    // }
    // console.log( camera.position.z);


}
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function draw(){
    
    time+=0.01;

    objects[0].rotation.y += 0.001;

	renderer.render(scene, camera);


}

