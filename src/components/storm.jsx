'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function RainScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        let camera, scene, renderer, ambient, cloudGeo, cloudMaterial, directionalLight, flash, cloudParticles = [], stars, starGeo, starCount = 5000, starVertices = [];

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;

        ambient = new THREE.AmbientLight(0x555555);
        scene.add(ambient);

        directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);

        // flash = new THREE.PointLight(0x11111f, 30, 500, 1.7);
        // flash.position.set(200, 300, 100);
        // scene.add(flash);

        renderer = new THREE.WebGLRenderer({ alpha: true });
        scene.fog = new THREE.FogExp2(0x000000, 0.002);
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        let positions = [];
        let sizes = [];

        let loader = new THREE.TextureLoader();
        loader.load("https://static.vecteezy.com/system/resources/previews/010/884/548/original/dense-fluffy-puffs-of-white-smoke-and-fog-on-transparent-background-abstract-smoke-clouds-movement-blurred-out-of-focus-smoking-blows-from-machine-dry-ice-fly-fluttering-in-air-effect-texture-png.png", function (texture) {
            cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
            cloudMaterial = new THREE.MeshLambertMaterial({ map: texture, transparent: true });

            for (let p = 0; p < 5; p++) {
                let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
                cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 450);
                cloud.rotation.x = 1.16;
                cloud.rotation.y = -0.12;
                cloud.rotation.z = Math.random() * 360;
                cloud.material.opacity = 0.6;
                cloudParticles.push(cloud);
                scene.add(cloud);
            }
        });

        // for (let i = 0; i < starCount; i++) {
        //     let x = (Math.random() - 0.5) * 3000;  // These values can be adjusted
        //     let y = (Math.random() - 0.5) * 3000;
        //     let z = (Math.random() - 0.5) * 3000;
        //     starVertices.push(x, y, z);
        // }

        // starGeo = new THREE.BufferGeometry();
        // starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

        let starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 2
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        function animate() {
            cloudParticles.forEach(p => { p.rotation.z -= 0.002; });
            // if (Math.random() > 0.93 || flash.power > 100) {
            //     if (flash.power < 100) flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
            //     flash.power = 50 + Math.random() * 500;
            // }
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', onWindowResize, false);

        mountRef.current.appendChild(renderer.domElement);
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize, false);
            mountRef.current.removeChild(renderer.domElement);
        };

    }, []);

    return <div ref={mountRef} className="rainBackground" />;
}

