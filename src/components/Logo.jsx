'use client'
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


const ThreeScene = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Define your shaders here
        const vertexShader = `
        varying vec2 vUv;
      
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;
      
      const fragmentShader = `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        varying vec2 vUv;
      
        void main() {
          gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
        }
      `;    
      const noiseFS = `
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
      
      float cnoise(vec4 P){
        vec4 Pi0 = floor(P); // Integer part for indexing
        vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec4 Pf0 = fract(P); // Fractional part for interpolation
        vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = vec4(Pi0.zzzz);
        vec4 iz1 = vec4(Pi1.zzzz);
        vec4 iw0 = vec4(Pi0.wwww);
        vec4 iw1 = vec4(Pi1.wwww);
      
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 ixy00 = permute(ixy0 + iw0);
        vec4 ixy01 = permute(ixy0 + iw1);
        vec4 ixy10 = permute(ixy1 + iw0);
        vec4 ixy11 = permute(ixy1 + iw1);
      
        vec4 gx00 = ixy00 / 7.0;
        vec4 gy00 = floor(gx00) / 7.0;
        vec4 gz00 = floor(gy00) / 6.0;
        gx00 = fract(gx00) - 0.5;
        gy00 = fract(gy00) - 0.5;
        gz00 = fract(gz00) - 0.5;
        vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
        vec4 sw00 = step(gw00, vec4(0.0));
        gx00 -= sw00 * (step(0.0, gx00) - 0.5);
        gy00 -= sw00 * (step(0.0, gy00) - 0.5);
      
        vec4 gx01 = ixy01 / 7.0;
        vec4 gy01 = floor(gx01) / 7.0;
        vec4 gz01 = floor(gy01) / 6.0;
        gx01 = fract(gx01) - 0.5;
        gy01 = fract(gy01) - 0.5;
        gz01 = fract(gz01) - 0.5;
        vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
        vec4 sw01 = step(gw01, vec4(0.0));
        gx01 -= sw01 * (step(0.0, gx01) - 0.5);
        gy01 -= sw01 * (step(0.0, gy01) - 0.5);
      
        vec4 gx10 = ixy10 / 7.0;
        vec4 gy10 = floor(gx10) / 7.0;
        vec4 gz10 = floor(gy10) / 6.0;
        gx10 = fract(gx10) - 0.5;
        gy10 = fract(gy10) - 0.5;
        gz10 = fract(gz10) - 0.5;
        vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
        vec4 sw10 = step(gw10, vec4(0.0));
        gx10 -= sw10 * (step(0.0, gx10) - 0.5);
        gy10 -= sw10 * (step(0.0, gy10) - 0.5);
      
        vec4 gx11 = ixy11 / 7.0;
        vec4 gy11 = floor(gx11) / 7.0;
        vec4 gz11 = floor(gy11) / 6.0;
        gx11 = fract(gx11) - 0.5;
        gy11 = fract(gy11) - 0.5;
        gz11 = fract(gz11) - 0.5;
        vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
        vec4 sw11 = step(gw11, vec4(0.0));
        gx11 -= sw11 * (step(0.0, gx11) - 0.5);
        gy11 -= sw11 * (step(0.0, gy11) - 0.5);
      
        vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
        vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
        vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
        vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
        vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
        vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
        vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
        vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
        vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
        vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
        vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
        vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
        vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
        vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
        vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
        vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);
      
        vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
        g0000 *= norm00.x;
        g0100 *= norm00.y;
        g1000 *= norm00.z;
        g1100 *= norm00.w;
      
        vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
        g0001 *= norm01.x;
        g0101 *= norm01.y;
        g1001 *= norm01.z;
        g1101 *= norm01.w;
      
        vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
        g0010 *= norm10.x;
        g0110 *= norm10.y;
        g1010 *= norm10.z;
        g1110 *= norm10.w;
      
        vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
        g0011 *= norm11.x;
        g0111 *= norm11.y;
        g1011 *= norm11.z;
        g1111 *= norm11.w;
      
        float n0000 = dot(g0000, Pf0);
        float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
        float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
        float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
        float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
        float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
        float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
        float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
        float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
        float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
        float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
        float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
        float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
        float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
        float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
        float n1111 = dot(g1111, Pf1);
      
        vec4 fade_xyzw = fade(Pf0);
        vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
        vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
        vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
        vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
        float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
        return 2.2 * n_xyzw;
      }
      `;
      
      // const width = mountRef.current.clientWidth;
      // const height = mountRef.current.clientHeight;
      const canvas = canvasRef.current;
      const width = canvas.offsetWidth; // Example width
      const height = canvas.offsetHeight;

      let scene = new THREE.Scene();
      scene.background = null;
      let camera = new THREE.PerspectiveCamera(calculateFoV(window.innerWidth), (width / height), 1, 1000);
      //let camera = new THREE.PerspectiveCamera(calculateFoV(window.innerWidth), (width / height), 1, 1000);
      camera.position.set(0, 0, 10);

      let renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvasRef.current });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      // mount.appendChild(renderer.domElement);
      
     

      let controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.enableRotate = false;
      controls.autoRotateSpeed *= 0.25;
      
      
      let light = new THREE.DirectionalLight(0xffffff, 1.75);
      light.position.setScalar(1);
      scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));
      
      let globalUniforms = {
        bloom: {value: 0},
        time: {value: 0},
        aspect: {value: width / height}
      }
      
      // <OBJECT>
      let g = new THREE.IcosahedronGeometry(1, 70);
      let localUniforms = {
        color1: {value: new THREE.Color(0xff3232)},
        color2: {value: new THREE.Color(0x0032ff)}
      }
      let m = new THREE.MeshStandardMaterial({
        roughness: 0.125,
        metalness: 0.875,
        onBeforeCompile: shader => {
          shader.uniforms.bloom = globalUniforms.bloom;
          shader.uniforms.time = globalUniforms.time;
          shader.uniforms.color1 = localUniforms.color1;
          shader.uniforms.color2 = localUniforms.color2;
          shader.vertexShader = `
            uniform float time;
            varying vec3 rPos;
            ${noiseFS}
            float noise(vec3 p){
              return cnoise(vec4(p, time));
            }
            vec3 getPos(vec3 p){
              return p * (4. + noise(p * 3.) * 2.);
            }
            ${shader.vertexShader}
          `.replace(
            `#include <beginnormal_vertex>`,
            `#include <beginnormal_vertex>
            
              vec3 p0 = getPos(position);
              
              // https://stackoverflow.com/a/39296939/4045502
              
              float theta = .1; 
              vec3 vecTangent = normalize(cross(p0, vec3(1.0, 0.0, 0.0)) + cross(p0, vec3(0.0, 1.0, 0.0)));
              vec3 vecBitangent = normalize(cross(vecTangent, p0));
              vec3 ptTangentSample = getPos(normalize(p0 + theta * normalize(vecTangent)));
              vec3 ptBitangentSample = getPos(normalize(p0 + theta * normalize(vecBitangent)));
              
              objectNormal = normalize(cross(ptBitangentSample - p0, ptTangentSample - p0));
              
              ///////////////////////////////////////////////
            `
          )
           .replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
              transformed = p0;
              rPos = transformed;
            `
          );
          shader.fragmentShader = `
            #define ss(a, b, c) smoothstep(a, b, c)
            uniform float bloom;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 rPos;
            ${shader.fragmentShader}
          `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
            vec3 col = mix(color1, color2, ss(2., 6., length(rPos)));
            vec4 diffuseColor = vec4( col, opacity );
            `
          )
           .replace(
            `#include <dithering_fragment>`,
            `#include <dithering_fragment>
              
              //https://madebyevan.com/shaders/grid/
              float coord = length(rPos) * 4.;
              float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) / 1.25;
              float grid = 1.0 - min(line, 1.0);
              //////////////////////////////////////
              
              gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0), bloom);
              gl_FragColor.rgb = mix(gl_FragColor.rgb, col * 2., grid);
              
            `
          );
        }
      });
      let o = new THREE.Mesh(g, m);
      scene.add(o);

    let clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      let t = clock.getElapsedTime();
      controls.update();
      globalUniforms.time.value = t * 0.1;
      renderer.render(scene, camera);
    });
    const onWindowResize = () => {
      camera.aspect = (width / height);
      camera.fov = calculateFoV(window.innerWidth);
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      // console.log(mount.offsetWidth, mount.offsetHeight, "resize")
      globalUniforms.aspect.value = camera.aspect;
    };
    
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      // mount.removeChild(renderer.domElement);
    //   scene.traverse(object => {
    //     if (object.isMesh) {
    //         if (object.geometry) {
    //             object.geometry.dispose();
    //         }
    //         if (object.material) {
    //             if (object.material.isMaterial) {
    //                 cleanMaterial(object.material);
    //             } else if (Array.isArray(object.material)) {
    //                 // In case of multi-materials
    //                 object.material.forEach(material => cleanMaterial(material));
    //             }
    //         }
    //     }
    // });

    renderer.dispose();
  };

  }, []);

    return <canvas ref={canvasRef} className='z-10 w-[320px] h-[320px] mt-20% lg:my-[20%]' />;
};


export default ThreeScene;

function cleanMaterial(material) {
  material.dispose();
  // Dispose textures if any
  for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === 'object' && 'dispose' in value) {
          value.dispose();
      }
  }
}
const calculateFoV = (screenWidth) => {
  const min_width = 350;
  const max_width = 1744;
  const min_fov = 110;
  const max_fov = 90;

  const clampedWidth = Math.max(min_width, Math.min(max_width, screenWidth));
  return min_fov + (max_fov - min_fov) * (clampedWidth - min_width) / (max_width - min_width);
};