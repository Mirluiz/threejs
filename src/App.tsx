import React, { useEffect, useRef } from 'react';
import dat from 'dat.gui';
import * as THREE from 'three';
import {tour, images, room} from "./types";
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

    camera.position.set(0,0,20); // Set position like this
    camera.lookAt(new THREE.Vector3(0,0,0));

    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize( w, h);
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

    // corners red
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



    // helpers
    const axesHelper = new THREE.AxesHelper( 10);
    scene.add( axesHelper );

    getGui(camera, (room: room | 'Plan') => {

      if (room === 'Plan'){
        scene.background = null
        renderer.setClearColor( 0xffffff, 1 );
        axesHelper.visible = true;
        scene.visible = true
        return;
      }

      Object.values(additionalData.tour.rooms).map(_r => {
        if (_r.name === room){
          const texture = new THREE.TextureLoader().load( _r.url);
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;

          axesHelper.visible = false;
          scene.visible = false
        }
      })

    });

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };

    animate();
  }, [])


  const getGui = (camera: any, callBack: (room: room | 'Plan') => void) => {
    let options: {[key: string]: boolean} = {
      Bedroom: false,
      Kitchen: false,
      Living: false,
      'Closed Room': false,
      Plan: false,
    };


    let gui = new dat.GUI();
    gui.add(options, 'Bedroom').name('Bedroom').listen().onChange(() => setChecked('Bedroom'));
    gui.add(options, 'Kitchen').name('Kitchen').listen().onChange(() => setChecked('Kitchen'));
    gui.add(options, 'Living').name('Living').listen().onChange(() => setChecked('Living'));
    gui.add(options, 'Closed Room').name('Closed Room').listen().onChange(() => setChecked('Closed Room'));
    gui.add(options, 'Plan').name('Plan').listen().onChange(() => setChecked('Plan'));


    function setChecked( prop: room | 'Plan' ){
      for (let param in options){
        options[param] = false;
      }
      options[prop] = true;

      callBack(prop);
    }
  }

  return (
    <div ref={ref}/>
  );
}

export default App;
