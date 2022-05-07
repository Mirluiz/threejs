import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { _2d, _3d } from "./interfaces";

let json_1: _3d = require('./_1.json');
let json_2: _2d = require('./_2.json');


function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    ref.current.appendChild(( renderer.domElement ))

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );


    scene.add( cube );

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  }, [])

  return (
    <div ref={ref}/>
  );
}

export default App;
