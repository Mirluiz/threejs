import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { tour, images } from "./types";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let json_1: images = require('./data/_1.json');
let json_2: tour = require('./data/_2.json');


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
    ref.current.appendChild(( renderer.domElement ))

    //walls
    for (let wall of json_2.walls){
      const geometry = new THREE.BoxGeometry(
        wall.thickness,
        wall.height ?? 10
      );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );

      scene.add( cube );
    }

    //corners
    // for (let wall of json_2.corners){
    //   // const geometry = new THREE.BoxGeometry();
    //   // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //   // const cube = new THREE.Mesh( geometry, material );
    //
    //   // scene.add( cube );
    // }



    camera.position.z = 20;
    camera.position.setX(json_2.cameras[0].x)
    camera.position.setY(json_2.cameras[0].y)

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
