import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, FaceLandmarker, FaceControls, Gltf, Image, Text } from '@react-three/drei'
import { LayerMaterial, Base, Depth, Noise } from 'lamina'
import { EffectComposer, Autofocus } from '@react-three/postprocessing'
import { useEffect, useState } from 'react'
import { Lightbulb } from './components/lightbulb'
import { Chair } from './components/chair'
import Monologue from './components/monologue'
import { TalkingHead } from './components/antagonist'
import { Eye } from './components/eye'
import { Ghost } from './components/ghost'
import FractalBG from './components/fractals'
import HellBG from './components/hell'
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
  const [currentText, setCurrentText] = useState('');
  const [audio, setAudio] = useState(null);
  const [talking, setTalking] = useState(false);

  const sceneScripts = {
    1: `Welcome to your nightmare... don't be scared I wont hurt you... haha ha ha ha ha`,
    2: `What are your fears, friend? Are you scared that they won't like you won't like you once they see you for who you really are? I promise you that they are watching... always...`,
    3: 'HAHA HA HAHA HA HA HA HAHA HA HAHA HA HAHA HA HA HA HAHA HA',
    4: `Shut up! Shut up! Shut your trap your not even alive!`,
    5: `Did I get you? Hahahahahaha`,
    6: `I know, I know... This stuff isnt that scary... Do you want to know what I think is scary? The infinite expanse of the universe. You are nothing! We are nothing! Just a tiny little stain on the fabric of time. Do you feel the existential dread?`,
    7: `Feel the burn of your nothingness. You mean nothing. You've never meant anything. And you never will mean anything. Have you ever felt special?`,
    8: `How will you ever find meaning when you can't even find yourself. Where are you friend. Tell me what it all means.`,
    9: `I can tell this nightmare is making you sad. Believe it or not I don't like making you upset. Why you ask? Because you're intolerable when you're sad. Nobody would want to be around you, and that of course includes me. Anyway... do you know why you feel this way? It's because of all the terrible things you've done. I'll see you in hell!`,
    10: `WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP! WAKE UP!`,
  };

  const sceneAudios = {
    1: './audio_1.mp3',
    2: './audio_2.mp3',
    3: './audio_3.mp3',
    4: './audio_4.mp3',
    5: './audio_5.mp3',
    6: './audio_6.mp3',
    7: './audio_7.mp3',
    8: './audio_8.mp3',
    9: './audio_9.mp3',
    10: './audio_10.mp3',
  };

  useEffect(() => {
    const script = sceneScripts[scene];
    if (!script) return;

    // Prepare the audio
    const audio = new Audio(sceneAudios[scene]);
    setAudio(audio);
    setTalking(true);

    // Split the script into words
    const words = script.split(' ');

    // Store timeout IDs to clear them if necessary
    const timeouts = [];

    audio.onloadedmetadata = () => {
      // Each word will have an equal share of the total audio duration
      const wordDuration = (audio.duration * 1000) / words.length;

      // Function to start the audio and flashing the words
      const startAudioAndFlashWords = () => {
        audio.play();

        // Start flashing the words
        let index = 0;
        const flashWord = () => {
          setCurrentText(words[index]);
          if (index < words.length - 1) {
            timeouts.push(setTimeout(flashWord, wordDuration));
            index++;
          } else {
            setTalking(false);  // Stop talking when all words have been flashed
            scene < 11 ? setTimeout(setScene(scene + 1), 2000) : null
          }
        };
        flashWord();
      };

      // If this is the first scene, apply a 1 second delay. Otherwise, start immediately.
      if (scene === 1) {
        timeouts.push(setTimeout(startAudioAndFlashWords, 1000));
      } else {
        startAudioAndFlashWords();
      }
    };

    // Cleanup
    return () => {
      audio.pause();
      setAudio(null);
      setTalking(false);
      // Clear all timeouts
      timeouts.forEach(clearTimeout);
    };
  }, [scene]);

  return (
    <>
      <color args={scene < 11 && scene > 0 ? ["#000000"] : ["#ffffff"]} attach="background" />

      {/* <mesh onClick={() => setScene(1)}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color={scene != 0 ? "#000000" : "#ffffff"} />
      </mesh> */}

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
          <Text font='./Creepster-Regular.ttf' color='red' scale={2} position={[-3, 4, -10]}>
            NIGHTMARE
          </Text>
          <Text color='black' scale={0.5} position={[-3, 2.7, -10]}>
            Click the light to begin...
          </Text>
        </>
      ) : scene === 11 ? (
        <>
          <Text color='black' scale={0.5} position={[-6, 4, -10]}>
            Thanks for experiencing my nightmare!...
          </Text>
          <Text color='black' scale={0.3} position={[-6, 3, -10]}>
            Built by JackJack. Find me at htts://jackjack.dev
          </Text>
        </>
      ) : <></>}

      <Lightbulb
        onClick={() => setScene(1)}
        position={[0, 0, -2]}
        rotation-y={-Math.PI / 2}
        on={scene < 11 && scene > 0}
      />

      {/* <Chair
        position={[-0.1, -0.1, -0.2]}
      /> */}

      {scene > 0 && scene < 11 ? (
        <>
          <TalkingHead
            talking={talking}
            scale={1}
            position={[0, -0.3, -1]}
            rotation={talking ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
          />
        </>
      ) : (
        <></>
      )}

      {scene === 3 ? (
        <>
          {Array(20).fill().map(i => <Eye scale={0.03} position={[(i % 2 === 0 ? Math.random() * 10 : Math.random() * -10) + 5, Math.random() * 2, -3]} talking={talking} />)}
        </>
      ) : (
        <></>
      )}

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
      ) : (
        <></>
      )}

      {scene === 5 ? (
        <>
          <Image scale={1.5} url='./jeff.png' />
        </>
      ) : (
        <></>
      )}

      {scene === 7 || scene === 8 ? (
        <>
          <FractalBG scale={10} />
        </>
      ) : (
        <></>
      )}

      {scene === 10 ? (
        <>
          <HellBG scale={10} />
        </>
      ) : (
        <></>
      )}

      {scene === 11 ? (
        <>

        </>
      ) : <></>}

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} scale={10} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color={scene != 0 ? "#000000" : "#ffffff"} />
      </mesh>


      <EffectComposer>
        <Autofocus
          // debug={0.02} 
          focusRange={0.001}
          bokehScale={0}
        />
      </EffectComposer>
    </>
  )
}