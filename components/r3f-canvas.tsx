"use client"

import type { ThreeToJSXElements } from "@react-three/fiber"
import type { PropsWithChildren } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import * as THREE from "three/webgpu"

declare module "@react-three/fiber" {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as any)

function R3fCanvas({ children }: PropsWithChildren) {
  return (
    <Canvas
      gl={async (glProps) => {
        const renderer = new THREE.WebGPURenderer(glProps as any)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        await renderer.init()
        return renderer
      }}
    >
      <OrbitControls enableDamping minDistance={0.1} maxDistance={50} />
      {children}
    </Canvas>
  )
}

export default R3fCanvas
