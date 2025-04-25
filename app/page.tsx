import Earth from "@/components/earth"
import R3fCanvas from "@/components/r3f-canvas"
import SelfIntro from "@/components/self-intro"

export default function Home() {
  return (
    <>
      <SelfIntro />
      <R3fCanvas>
        <Earth />
      </R3fCanvas>
    </>
  )
}
