import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import { gsap } from "gsap";

const ParticleScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Creamos una escena
    const scene = new THREE.Scene();

    // Creamos una cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Inicializamos la posición del mouse
    let mouseX=0
    let mouseY=0

    // Añadimos un controlador de eventos del mouse
    document.addEventListener("mousemove", onMouseMove, false);

    // Inicializamos el renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Añadimos un controlador de eventos para el redimensionamiento de la ventana
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cálculamos la distancia
    const distance = Math.min(200, window.innerWidth / 4);

    // Creamos una geometría
    //const geometry = new THREE.BufferGeometry();

    let vertices = [];

    let theta, phi;
    let x, y, z;

    for (let i = 0; i < 1600; i++) {
      theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      phi = THREE.MathUtils.randFloatSpread(360);

      // const theta = THREE.Math.randFloatSpread(360);
      x = distance * Math.sin(theta) * Math.cos(phi);
      y = distance * Math.sin(theta) * Math.sin(phi);
      z = distance * Math.cos(theta);

      vertices.push(x, y, z);
    }

    console.log(vertices);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    // Creamos una nube de partículas
    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 2 })
    );
    particles.boundingSphere = 50;

    // Creamos un grupo para la escala
    const renderingParent = new THREE.Group();
    renderingParent.add(particles);

    // Creamos un grupo para el redimensionamiento
    const resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    // Establecemos la posición de lacámara
camera.position.z = 400;

// Añadimos la animación
const animate = () => {
  requestAnimationFrame(animate);

  particles.rotation.x += 0.001;
  particles.rotation.y += 0.002;

  gsap.to(particles.rotation, {
    duration: 0.1,
    x: mouseY * -0.1,
    y: mouseX ,
    ease: "power2.out",
  });

  renderer.render(scene, camera);
};
animate();



 // Scaling animation
 const animProps = { scale: 1, xRot: 0, yRot: 0 };

 gsap.to(animProps, {
   duration: 10,
   scale: 1,
   repeat: -1,
   yoyo: true,
   ease: "sine",
   onUpdate: function () {
     renderingParent.scale.set(
       animProps.scale,
       animProps.scale,
       animProps.scale
     );
   }
 });

 gsap.to(animProps, {
   duration: 120,
   xRot: Math.PI * 2,
   yRot: Math.PI * 4,
   repeat: -1,
   yoyo: true,
   ease: "none",
   onUpdate: function () {
     renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
   }});


// Manejador de eventos para mover el mouse
function onMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) * 10;
  mouseY = (event.clientY - window.innerHeight / 2) * 10;
}




// Limpiar los recursos al desmontar
return () => {
  document.removeEventListener("mousemove", onMouseMove, false);
  window.removeEventListener("resize", function () {});
};
}, []);

return <div  ref={canvasRef} />;
};

export default ParticleScene;
