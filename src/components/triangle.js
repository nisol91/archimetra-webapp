import React, { Component } from "react";
import * as THREE from "three";
class Triangle extends Component {
  componentDidMount() {
    const canvas = document.querySelector("#t");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.5;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#536872");

    {
      const color = "#6e7f80";
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const radius = 0.8;
    const geometry = new THREE.TetrahedronBufferGeometry(radius);

    const material = new THREE.MeshStandardMaterial({
      color: "#00aeff",
      transparent: false,
      opacity: 0.2,
      metalness: 0.5
    }); // greenish blue

    const tri = new THREE.Mesh(geometry, material);
    scene.add(tri);

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

      tri.rotation.x = time;
      tri.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  render() {
    return <canvas id="t"></canvas>;
  }
}
export default Triangle;
