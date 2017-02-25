/**
 * Created by Mengman on 2017/2/25.
 */
var renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById("mainCanvas")
});
renderer.shadowMapEnabled = true;       //开启阴影
renderer.setClearColor(0x666666);       //backgroundColor

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, 4/3, 1, 400);  //透视
camera.position.set(80,70,80);                      //视线位置
camera.lookAt(new THREE.Vector3(0,20,10));        //视线方向
scene.add(camera);


//car
var material = new THREE.MeshLambertMaterial({color:0xa7a7a7}); //漫反射材料
var carBody = new THREE.Mesh(new THREE.CubeGeometry(72,30,36), material);
scene.add(carBody);
var carWheel = [];

for (var i=0;i<4;i++){
    carWheel[i] = new THREE.Mesh(new THREE.TorusGeometry(8,2.5,60,60),material);
    carWheel[i].castShadow = true;
    scene.add(carWheel[i]);         //产生阴影
}
carBody.position.set(0,25,0);       //摆位置
carWheel[0].position.set(-23,10.5,18);      //23 10.5 18
carWheel[1].position.set(23,10.5,18);
carWheel[2].position.set(-23,10.5,-18);
carWheel[3].position.set(23,10.5,-18);
carBody.castShadow = true;          //产生阴影

//plane
var plane = new THREE.Mesh(new THREE.PlaneGeometry(180,180), new THREE.MeshLambertMaterial({color:0xa3b77a}));
plane.rotation.x = -Math.PI/2;          //把plane放平
scene.add(plane);
plane.receiveShadow = true;             //接受阴影

//light
var ambientLight = new THREE.AmbientLight(0x666666);    //环境光
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xeeeeee,1);  //平行光
directionalLight.position.set(-40,35,50);
scene.add(directionalLight);

//阴影， 设置参数以光源的position属性为基准点
directionalLight.castShadow = true;
directionalLight.shadowCameraNear = 0;
directionalLight.shadowCameraFar = 300;
directionalLight.shadowCameraLeft = -50;
directionalLight.shadowCameraRight = 50;
directionalLight.shadowCameraTop = 70;
directionalLight.shadowCameraBottom = -20;
directionalLight.shadowCameraVisible = true;

renderer.render(scene,camera);