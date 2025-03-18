"use client"

import type { WebGPURootState } from "@/types/three"
import { useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import {
  bumpMap,
  cameraPosition,
  color,
  max,
  mix,
  normalize,
  normalWorld,
  output,
  positionWorld,
  step,
  texture,
  uniform,
  uv,
  vec3,
  vec4,
} from "three/tsl"
import * as THREE from "three/webgpu"

function Earth() {
  const globeRef = useRef<THREE.Mesh>(null)

  const { camera } = useThree<WebGPURootState>()

  camera.fov = 24
  camera.near = 0.1
  camera.far = 100
  camera.position.set(4.5, 2, 3)

  const [dayTexture, nightTexture, bumpRoughnessCloudsTexture] = useTexture([
    "/earth_day_4096.jpg",
    "/earth_night_4096.jpg",
    "/earth_bump_roughness_clouds_4096.jpg",
  ])

  dayTexture.colorSpace = THREE.SRGBColorSpace
  dayTexture.anisotropy = 8

  nightTexture.colorSpace = THREE.SRGBColorSpace
  nightTexture.anisotropy = 8

  bumpRoughnessCloudsTexture.anisotropy = 8

  // uniforms
  const atmosphereDayColor = uniform(color("#4db2ff"))
  const atmosphereTwilightColor = uniform(color("#bc490b"))
  const roughnessLow = uniform(0.25)
  const roughnessHigh = uniform(0.35)

  // fresnel
  const viewDirection = positionWorld.sub(cameraPosition).normalize()
  const fresnel = viewDirection.dot(normalWorld).abs().oneMinus().toVar()

  // sun orientation
  const sunPosition = new THREE.Vector3(0, 0, 3)
  const sunOrientation = normalWorld.dot(normalize(sunPosition)).toVar()

  // atmosphere color
  const atmosphereColor = mix(
    atmosphereTwilightColor,
    atmosphereDayColor,
    sunOrientation.smoothstep(-0.25, 0.75),
  )

  // globe
  const cloudsStrength = texture(bumpRoughnessCloudsTexture, uv()).b.smoothstep(
    0.2,
    1,
  )

  const roughness = max(
    texture(bumpRoughnessCloudsTexture).g,
    step(0.01, cloudsStrength),
  )

  const night = texture(nightTexture)
  const dayStrength = sunOrientation.smoothstep(-0.25, 0.5)

  const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1)
  const atmosphereMix = atmosphereDayStrength.mul(fresnel.pow(2)).clamp(0, 1)

  const finalOutput = mix(
    mix(night.rgb, output.rgb, dayStrength),
    atmosphereColor,
    atmosphereMix,
  )

  const bumpElevation = max(
    texture(bumpRoughnessCloudsTexture).r,
    cloudsStrength,
  )

  // atmosphere
  const alpha = fresnel
    .remap(0.73, 1, 1, 0)
    .pow(3)
    .mul(sunOrientation.smoothstep(-0.5, 1))

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.025
    }
  })

  return (
    <>
      {/* sun */}
      <directionalLight color="#ffffff" intensity={2} position={sunPosition} />

      {/* globle */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardNodeMaterial
          colorNode={mix(texture(dayTexture), vec3(1), cloudsStrength.mul(2))}
          roughnessNode={roughness.remap(0, 1, roughnessLow, roughnessHigh)}
          outputNode={vec4(finalOutput, output.a)}
          normalNode={bumpMap(bumpElevation)}
        />
      </mesh>

      {/* atmosphere */}
      <mesh scale={1.04}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicNodeMaterial
          side={THREE.BackSide}
          transparent
          outputNode={vec4(atmosphereColor, alpha)}
        />
      </mesh>
    </>
  )
}

export default Earth
