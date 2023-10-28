import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { FaceLandmarker, FaceControls, Image, Text } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

// Components
import { Lightbulb } from './components/lightbulb'
import { TalkingHead } from './components/talking-head'
import { Eye } from './components/eye'
import { Ghost } from './components/ghost'
import FractalBG from './components/fractals'
import HellBG from './components/hell'

import { useEffect, useState } from 'react'
delete globalThis.process?.versions?.node

export default function App() {
  return (
    <>
      <Canvas shadows>
        <FaceLandmarker>
          <Scene />
        </FaceLandmarker>
      </Canvas>
    </>
  )
}

function Scene() {
  const [scene, setScene] = useState(0);
  const [audio, setAudio] = useState(null);
  const [talking, setTalking] = useState(false); // Added state

  const sceneAudios = [
    './audio_1.mp3',
    './audio_2.mp3',
    './audio_3.mp3',
    './audio_4.mp3',
    './audio_5.mp3',
    './audio_6.mp3',
    './audio_7.mp3',
    './audio_8.mp3',
    './audio_9.mp3',
    './audio_10.mp3'
  ];

  useEffect(() => {
    if (scene === 0) return;

    const newAudio = new Audio(sceneAudios[scene - 1]);
    setAudio(newAudio);

    newAudio.onloadedmetadata = () => {
      newAudio.play();
      setTalking(true);
    };

    newAudio.onended = () => {
      setAudio(null);
      setTalking(false);
      setScene(scene + 1);
    };

    newAudio.onpause = () => {
      setTalking(false);
    };

    return () => {
      newAudio.pause();
      setAudio(null);
    };
  }, [scene]);

  return (
    <>
      <color args={scene < 11 && scene > 0 ? ["#000000"] : ["#ffffff"]} attach="background" />

      <FaceControls
        // debug
        // eyes 
        eyesAsOrigin
      // offsetScalar={15}
      />

      {scene < 11 && scene > 0 ? (
        <>
          <pointLight
            castShadow position={[0, 0, -1.5]} intensity={10.0} color='white' penumbra={1}
          />
          <ambientLight intensity={0.5} />
        </>
      ) : (
        <>
          <ambientLight intensity={1} />
          <spotLight position={[1, 2, 0]} angle={0.15} penumbra={1} />
          <pointLight position={[-1, 2, 0]} />
        </>
      )}

      {scene === 0 ? (
        <>
          <Text font='./Creepster-Regular.ttf' color='red' scale={2} position={[-4.5, 4, -10]}>
            NIGHTMARE
          </Text>
          <Text font='./Creepster-Regular.ttf' color='black' scale={0.5} position={[-4.5, 2.7, -10]}>
            Turn audio on. Click the light to begin...
          </Text>
        </>
      ) : scene === 11 ? (
        <>
          <Text font='./Creepster-Regular.ttf' color='black' scale={0.5} position={[-6, 4, -10]}>
            Thanks for experiencing my nightmare!...
          </Text>
          <Text font='./Creepster-Regular.ttf' color='black' scale={0.3} position={[-6, 3, -10]} onClick={() => window.open('https://www.jackjack.dev', '_blank', 'noopener,noreferrer')}>
            Built by JackJack. Find me at https://jackjack.dev
          </Text>
          <Text font='./Creepster-Regular.ttf' color='red' scale={0.6} position={[7, 2, -10]} onClick={() => window.open('https://www.rapidtables.com/tools/mirror.html', '_blank', 'noopener,noreferrer')}>
            Click here for an even scarier nightmare!
          </Text>
        </>
      ) : <></>}

      <Lightbulb
        onClick={() => setScene(1)}
        position={[0, 0, -2]}
        rotation-y={-Math.PI / 2}
        on={scene < 11 && scene > 0}
      />

      {scene > 0 && scene < 11 ? (
        <>
          <TalkingHead
            talking={talking}
            scale={1}
            position={[0, -0.3, -1]}
            rotation={talking ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
          />
        </>
      ) : <></>}

      {scene === 3 ? (
        <>
          {Array(20).fill().map(i => <Eye scale={0.03} position={[(i % 2 === 0 ? Math.random() * 10 : Math.random() * -10) + 5, Math.random() * 2, -3]} talking={talking} />)}
        </>
      ) : <></>}

      {scene === 4 ? (
        <>
          <Lightbulb
            onClick={() => setScene(1)}
            position={[2, 0.5, -5.5]}
            rotation-y={-Math.PI / 2}
            on={true}
          />
          <pointLight
            castShadow position={[2, 0.5, -5.5]} intensity={1.0} color='white' penumbra={1}
          />
          <Ghost rotation-y={Math.PI / 2} position={[0.2, 0, -0.1]} talking={talking} />
        </>
      ) : <></>}

      {scene === 5 ? (
        <>
          <Image scale={1.5} url='./jeff.png' />
        </>
      ) : <></>}

      {scene === 7 || scene === 8 ? (
        <>
          <FractalBG scale={10} />
        </>
      ) : <></>}

      {scene === 10 ? (
        <>
          <HellBG scale={10} />
        </>
      ) : <></>}


      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} scale={10} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color={"#000000"} />
      </mesh>


      <EffectComposer>
        <DepthOfField
          focusDistance={0} // where to focus
          focalLength={0.02} // focal length
          bokehScale={2} // bokeh size
        />
      </EffectComposer>
    </>
  )
}