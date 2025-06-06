import type { NextConfig } from "next"
import Icons from "unplugin-icons/webpack"

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    )

    return config
  },
}

export default nextConfig
