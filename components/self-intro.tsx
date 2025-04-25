"use client"

import { motion } from "motion/react"
import NextLink from "next/link"
import LucideGithub from "~icons/lucide/github"
import LucideMail from "~icons/lucide/mail"
import QlementineIconsResume16 from "~icons/qlementine-icons/resume-16"

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
}

function SelfIntro() {
  return (
    <motion.section
      className="absolute top-0 left-0 z-10 w-fit text-white"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="flex items-end text-6xl" variants={itemVariants}>
        Cao Yujie
        <motion.span className="ml-2 text-sm" variants={itemVariants}>
          28 years old, Wuxi
        </motion.span>
      </motion.h2>
      <div className="mt-2 flex flex-col text-xl">
        <motion.span variants={itemVariants}>
          5 years experience of frontend development
        </motion.span>
        <motion.span variants={itemVariants}>
          experienced at Vue3, React, Vite, etc.
        </motion.span>
      </div>
      <div className="mt-2 flex gap-4">
        <NextLink
          href="https://ayingott.me/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="resume"
          className="transition-all duration-200 hover:scale-120"
        >
          <motion.div variants={itemVariants}>
            <QlementineIconsResume16 className="h-6 w-6" />
          </motion.div>
        </NextLink>
        <NextLink
          href="https://github.com/LoTwT"
          target="_blank"
          rel="noopener noreferrer"
          title="github"
          className="transition-all duration-200 hover:scale-120"
        >
          <motion.div variants={itemVariants}>
            <LucideGithub className="h-6 w-6" />
          </motion.div>
        </NextLink>
        <NextLink
          href="mailto:hi@ayingott.me"
          target="_blank"
          rel="noopener noreferrer"
          title="email"
          className="transition-all duration-200 hover:scale-120"
        >
          <motion.div variants={itemVariants}>
            <LucideMail className="h-6 w-6" />
          </motion.div>
        </NextLink>
      </div>
    </motion.section>
  )
}

export default SelfIntro
