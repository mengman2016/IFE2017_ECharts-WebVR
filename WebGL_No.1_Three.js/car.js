/**
 * Created by Mengman on 2017/2/24.
 */

var renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById("mainCanvas")
});
renderer.setClearColor(0x666666);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50,4/3,1,200);
camera.position.set(100,70,100);
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

var material = new THREE.MeshLambertMaterial({color:0xa0a0a0});
var carBody = new THREE.Mesh(new THREE.CubeGeometry(72,30,36),material);
scene.add(carBody);
var carWheel = [];
for (var i =0; i<4;i++){
    carWheel[i] = new THREE.Mesh(new THREE.TorusGeometry(8,2.5,60,60),material);
    scene.add(carWheel[i]);
}
carBody.position.set(0,16,0);
carWheel[0].position.set(-23,0,18);
carWheel[1].position.set(23,0,18);
carWheel[2].position.set(-23,0,-18);
carWheel[3].position.set(23,0,-18);

//light
var ambientLight = new THREE.AmbientLight(0xeeeeee);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(80,100,40);
scene.add(ambientLight);
scene.add(directionalLight);

renderer.render(scene,camera);