"use client"

import type { ThreeToJSXElements } from "@react-three/fiber"
import type { PropsWithChildren } from "react"
import { ScrollControls } from "@react-three/drei"
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
      <ScrollControls>{children}</ScrollControls>
    </Canvas>
  )
}

export default R3fCanvas
