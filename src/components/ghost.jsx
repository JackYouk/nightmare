/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: reactorous (https://sketchfab.com/reactorous)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/boo-but-scary-42bdc4aa71d74b629ce5222bb38b7bc1
Title: Boo but Scary
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Ghost(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/boo_but_scary.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (props.talking) {
        actions["Take 001"].play()
    } else {
        actions["Take 001"].stop()
    }
    }, [props.talking])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e6afdffcb55349efa4de4af370b35fd0fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Fantasmico1}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="fantasmico4_lowPolyGroup30646" />
                  <group name="group1" position={[-0.337, 1.749, -3.127]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/boo_but_scary.glb");