import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120305, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Floating 3D Glowing Objects Group
    const culinaryGroup = new THREE.Group();

    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.TorusGeometry(1.0, 0.35, 16, 100),
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.DodecahedronGeometry(0.9, 0),
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.ConeGeometry(0.7, 1.8, 8)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0xEF4444, // Glowing Crimson Red
        roughness: 0.15,
        metalness: 0.85,
        emissive: 0x990000,
        emissiveIntensity: 0.7
      }),
      new THREE.MeshStandardMaterial({
        color: 0xF59E0B, // Glowing Saffron Gold
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x663300,
        emissiveIntensity: 0.6
      }),
      new THREE.MeshStandardMaterial({
        color: 0xFFD700, // Metallic Gold
        roughness: 0.05,
        metalness: 0.95
      })
    ];

    const meshes = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const geom = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geom, mat);

      mesh.position.x = (Math.random() - 0.5) * 55;
      mesh.position.y = (Math.random() - 0.5) * 55;
      mesh.position.z = (Math.random() - 0.5) * 30 - 3;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      const scale = 0.5 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.015,
        rotY: (Math.random() - 0.5) * 0.015,
        initialY: mesh.position.y,
        initialX: mesh.position.x,
        speed: 1.0 + Math.random() * 0.8
      };

      meshes.push(mesh);
      culinaryGroup.add(mesh);
    }
    scene.add(culinaryGroup);

    // 4. Glowing Particle Cloud
    const particlesCount = 350;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i + 2] = (Math.random() - 0.5) * 45;

      const isGold = Math.random() > 0.4;
      particleColors[i] = isGold ? 0.98 : 0.95;
      particleColors[i + 1] = isGold ? 0.78 : 0.25;
      particleColors[i + 2] = isGold ? 0.12 : 0.25;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Glowing Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xEF4444, 3.5, 70);
    pointLight1.position.set(18, 18, 12);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xF59E0B, 3.5, 70);
    pointLight2.position.set(-18, -18, 12);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const scrollFactor = scrollY * 0.007;

      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += mesh.userData.rotX;
        mesh.rotation.y += mesh.userData.rotY;

        const wave = Math.sin(elapsedTime * mesh.userData.speed + idx) * 0.8;
        mesh.position.y = mesh.userData.initialY + wave - scrollFactor * (idx % 2 === 0 ? 0.6 : -0.6);
      });

      particleSystem.rotation.y = elapsedTime * 0.03 + scrollFactor * 0.3;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 4 - scrollY * 0.012 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85 transition-opacity duration-1000"
    />
  );
};
