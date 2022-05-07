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
    if(!ref.current) return;

    const scene = new THREE.Scene();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const camera = new THREE.PerspectiveCamera( 60,  w/h, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize( w, h);
    renderer.setClearColor( new THREE.Color('white'), 1 );
    ref.current.appendChild(( renderer.domElement ))

    // default all length in meters
    //walls
    for (let wall of mainData.walls){
      const geometry = new THREE.BoxGeometry(
        getLnFromFormatted(wall.lengthFormatted),
        wall.thickness/100,
        wall.height ?? 2,

      );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      cube.name = wall.id;
      cube.userData = {
        id: wall.id
      };

      scene.add( cube );
    }

    // corners
    for (const corner of mainData.corners){
      let walls: Array<string> = [];

      for (let start of corner.wallStarts){
        if (walls.includes(start.id))continue;

        let startVector = new THREE.Vector3(corner.x, corner.y);
        let endVector;

        let endCorner = mainData.corners.find((c ) => {
          if (c.wallEnds.find(w => w.id === start.id))return c;
        })

        if (endCorner){
          endVector = new THREE.Vector3(endCorner.x, endCorner.y)
          startVector.sub(endVector);
          console.log(startVector);

          let wall = scene.getObjectByName(start.id)
          if (wall){
            wall.position.x = startVector.x/100;
            wall.position.y = startVector.y/100;
          }

          walls.push(start.id)
        }


      }
    }



    camera.position.z = 20;
    camera.position.setX(mainData.cameras[0].x)
    camera.position.setY(mainData.cameras[0].y)



    // helpers
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

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
