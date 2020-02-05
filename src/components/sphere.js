import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

class Sphere extends Component {
  changeColor() {
    let color = "#00aeff";
    return color;
  }
  componentDidMount() {
    const canvas = document.querySelector("#s");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.5;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    //orbit control mouse
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#536872");

    {
      const color = "#6e7f80";
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    const radius = 1;
    const geometry = new THREE.IcosahedronBufferGeometry(radius);

    const material = new THREE.MeshStandardMaterial({
      color: this.changeColor(),
      transparent: false,
      opacity: 0.2,
      metalness: 0.1
    }); // greenish blue

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //responsiveness
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render(time) {
      time *= 0.0005; // convert time to seconds

      //responsiveness
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      sphere.rotation.x = time;
      sphere.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  render() {
    return <canvas id="s"></canvas>;
  }
}
export default Sphere;
