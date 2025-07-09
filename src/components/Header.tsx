'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="text-center py-6 md:py-10">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/logo.jpg"
          alt="IPPITSUロゴ"
          width={100}
          height={100}
          className="w-20 md:w-[120px] shadow-md"
          priority
        />

        <motion.p
          className="text-gray-600 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          あなたの思考を、一筆で。
        </motion.p>

        <motion.p
          className="text-gray-500 text-sm md:text-base max-w-[90%] md:max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          バグは近くで見ると悲劇だが、遠くから見れば喜劇である——。<br />
          これは、失敗もコンテンツにする、新たな供養の試みの場だ。
        </motion.p>
      </div>
    </header>
  )
}