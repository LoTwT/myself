import NextLink from "next/link"
import LucideGithub from "~icons/lucide/github"
import LucideMail from "~icons/lucide/mail"
import QlementineIconsResume16 from "~icons/qlementine-icons/resume-16"

function SelfIntro() {
  return (
    <section className="absolute top-0 left-0 z-10 w-fit text-white">
      <h2 className="flex items-end text-6xl">
        Cao Yujie
        <span className="ml-2 text-sm">28 years old, Wuxi</span>
      </h2>
      <div className="mt-2 flex flex-col text-xl">
        <span>5 years experience of frontend development</span>
        <span>experienced at Vue3, React, Vite, etc.</span>
      </div>

      <div className="mt-2 flex gap-4">
        <NextLink
          href="https://ayingott.me/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="resume"
        >
          <QlementineIconsResume16 className="h-6 w-6" />
        </NextLink>

        <NextLink
          href="https://github.com/LoTwT"
          target="_blank"
          rel="noopener noreferrer"
          title="github"
        >
          <LucideGithub className="h-6 w-6" />
        </NextLink>

        <NextLink
          href="mailto:hi@ayingott.me"
          target="_blank"
          rel="noopener noreferrer"
          title="email"
        >
          <LucideMail className="h-6 w-6" />
        </NextLink>
      </div>
    </section>
  )
}

export default SelfIntro
