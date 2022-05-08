import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { tour, images } from "./types";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {getLnFromFormatted} from "./utils";

let additionalData: images = require('./data/_1.json');
let mainData: tour = require('./data/_2.json');


function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // THREE.Object3D.DefaultUp.set(0, 0, 1)

    if(!ref.current) return;

    const scene = new THREE.Scene();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 60,  w/h, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    camera.position.set(20,20,20); // Set position like this
    camera.lookAt(new THREE.Vector3(0,0,0));

    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize( w, h);
    renderer.setClearColor( new THREE.Color('white'), 1 );
    ref.current.appendChild(( renderer.domElement ))

    // default all length in meters
    // walls
    for (let wall of mainData.walls){
      const geometry = new THREE.BoxGeometry(
        getLnFromFormatted(wall.lengthFormatted),
        wall.thickness/100,
        wall.height ?? 1,

      );
      const material = new THREE.MeshBasicMaterial( { color: new THREE.Color('grey') } );
      const cube = new THREE.Mesh( geometry, material );
      cube.name = wall.id;
      cube.userData = {
        id: wall.id
      };

      scene.add( cube );
      // break;
    }

    // corners
    for (const corner of mainData.corners){
      for (let start of corner.wallStarts){

        let startVector = new THREE.Vector3(corner.x, corner.y);
        let endVector;

        let endCorner = mainData.corners.find((c ) => {
          if (c.wallEnds.find(w => w.id === start.id))return c;
        })


        if (endCorner){
          let wall = scene.getObjectByName(start.id)

          if (wall){
            endVector = new THREE.Vector3(endCorner.x, endCorner.y)
            const subVector = startVector.clone().sub(endVector);
            const midPoint = new THREE.Vector3((startVector.x + endVector.x)/2, (startVector.y + endVector.y)/2)
            const matrix = new THREE.Matrix4();
            const euler = new THREE.Euler(
              THREE.MathUtils.degToRad(0),
              THREE.MathUtils.degToRad(0),
              Math.atan2(subVector.clone().normalize().y, subVector.clone().normalize().x)
            )
            matrix.makeRotationFromEuler(euler)
            matrix.setPosition( midPoint.x/100, midPoint.y/100, 0 );
            wall.applyMatrix4(matrix)
          }
        }
      }
    }


    for (let room of mainData.rooms){
      room.interiorCorners.map((c) => {
        const geometry = new THREE.BoxGeometry(.1, .1);
        const material = new THREE.MeshBasicMaterial( { color: new THREE.Color('red') } );
        const cube = new THREE.Mesh( geometry, material );

        const matrix = new THREE.Matrix4();
        matrix.setPosition( c.x/100, c.y/100, 0 );
        cube.applyMatrix4(matrix);
        scene.add( cube );
      })
    }


    // camera.position.setX(mainData.cameras[0].x)
    // camera.position.setY(mainData.cameras[0].y)



    // helpers
    const axesHelper = new THREE.AxesHelper( 10);
    scene.add( axesHelper );
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    function animate() {
      requestAnimationFrame( animate );

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  }, [])

  return (
    <div ref={ref}/>
  );
}

export default App;
