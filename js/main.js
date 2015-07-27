var container;
var scene, renderer, camera, controls;
var mouseX = 0, mouseY = 0;
var time = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var start = Date.now(); 

var index = 0;

init();
animate();

function init() {
        
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);
    camera.position.set(0,0, 10);
    controls = new THREE.OrbitControls(camera);
    
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
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );
    // window.addEventListener( 'resize', onWindowResize, false );

}
function addLights(){
    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(0,1, 0);
    scene.add(light);

    // var light = new THREE.AmbientLight(0xffffff, 1.0);
    // scene.add(light);
}
function loadModels(){
    var urls = ["Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg","Environment.jpg"];
    var abstractCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);
    var logoCube = THREE.ImageUtils.loadTextureCube(urls);
    abstractCube.minFilter = abstractCube.magFilter = THREE.NearestFilter;
    var abstractMat = new THREE.MeshBasicMaterial({
        envMap: abstractCube,
        refractionRatio: 0.8,
        side: 2
    })
    loadModel("Abstract Mesh.obj", abstractMat, {scale: 1.0, position: new THREE.Vector3(0.0,0.0,0.0), rotation: new THREE.Vector3(0.0,0.0,0.0)});
    var logoMat = new THREE.MeshPhongMaterial({
        envMap: logoCube,
        side: 2,
        color: 0x000000,
        reflectivity: 0.05,
        combine: THREE.MixOperation 
    })
    loadModel("Extruded Logo.obj", logoMat, {scale: 1.0, position: new THREE.Vector3(0.0,0.0,0.0), rotation: new THREE.Vector3(0.0,0.0,0.0)});

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
    // console.log(camera.position.z);


}
function draw(){
    
    time+=0.01;

	renderer.render(scene, camera);


}