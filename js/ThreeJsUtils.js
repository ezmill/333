//THREE.JS UTILS - EZRA MILLER
function screenshot(renderer) {
    if (event.keyCode == "32") {
        grabScreen(renderer);

        function grabScreen(renderer) {
            var blob = dataURItoBlob(renderer.domElement.toDataURL('image/png'));
            var file = window.URL.createObjectURL(blob);
            var img = new Image();
            img.src = file;
            img.onload = function(e) {
                window.open(this.src);

            }
        }
        function dataURItoBlob(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        }

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
    if(event.keyCode == "82"){
        capturer.start();
    }
    if(event.keyCode == "84"){
        capturer.stop();
        capturer.save( function( blob ) {
            window.location = blob;
        });
    }
}
function map(value,max,minrange,maxrange) {
    return ((max-value)/(max))*(maxrange-minrange)+minrange;
}

var manager = new THREE.LoadingManager();

function loadModel(model, material, params) {
    var loader = new THREE.OBJLoaderGEO(manager);
    loader.load(model, function(object) {

        object.traverse(function(child) {

            if (child instanceof THREE.Mesh) {
                child.material = material;
                child.geometry.computeVertexNormals();
                child.geometry.mergeVertices();
            }
        });
        object.scale.x = object.scale.y = object.scale.z = params.scale;
        object.position.copy(params.position);
        object.rotation.copy(params.rotation);

        scene.add(object);
        objects.push(object);

    }, onProgress, onError);
}

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
    }
};

function onError(xhr) {};
function createTex(string){
    var tex = THREE.ImageUtils.loadTexture(string);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;  
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.antialias = true;
    return tex;
}
