import type { RootState } from "@react-three/fiber"
import type { PerspectiveCamera } from "three/webgpu"

export type WebGPURootState = Omit<RootState, "camera"> & {
  camera: PerspectiveCamera
}
