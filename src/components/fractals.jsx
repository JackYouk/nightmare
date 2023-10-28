import * as THREE from 'three';
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from 'react';


const FractalMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Color(1.0, 1.0, 1.0)
    },  
    
    // vertex shader
    /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // fragment shader
  /*glsl*/ `
    uniform float iTime;
    uniform vec3 iResolution;
  
    varying vec2 vUv;
  
    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.0, 0.0, 0.0);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263,0.416,0.557);
  
      return a + b * cos(6.28318 * (c * t + d));
    }
  
    void main() {
      vec2 uv = (vUv * 0.5 - iResolution.xy) / iResolution.y;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);
  
      for (float i = 0.0; i < 1.0; i += 0.1) {
        uv = fract(uv * 1.5) - 0.5;
  
        float d = length(uv) * exp(-length(uv0));
  
        vec3 col = palette(length(uv0) + i * 0.4 + iTime * 0.4);
  
        d = sin(d * 8.0 + iTime) / 8.0;
        d = abs(d);
  
  
        finalColor += col * d;
      }
  
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ FractalMaterial })

export default function FractalBG(props) {
    const fractalMaterial = useRef(new FractalMaterial());

    useFrame((state, delta) => {
        if (fractalMaterial.current) {
            fractalMaterial.current.iTime += delta;
        }
    });

    return (
        <>
            <mesh {...props}>
                <sphereGeometry />
                <primitive 
                    object={fractalMaterial.current} 
                    attach="material" 
                    side={THREE.DoubleSide} 
                />
            </mesh>
        </>
    );
}
