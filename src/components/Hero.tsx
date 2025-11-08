import { motion } from 'framer-motion'
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useEffect, useState, useMemo } from 'react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  // Generate particle positions once
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random(),
      y: Math.random(),
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.2,
      moveDistance: Math.random() * 100 + 50,
    }))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / windowSize.width, 
        y: e.clientY / windowSize.height
      })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [windowSize.width, windowSize.height])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient" />
      
      {/* Parallax effect based on mouse */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: [
            `${50 + (mousePosition.x - 0.5) * 10}%`,
            `${50 + (mousePosition.y - 0.5) * 10}%`,
          ],
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: particle.x * windowSize.width,
            y: particle.y * windowSize.height,
            opacity: particle.opacity,
          }}
          animate={{
            y: particle.y * windowSize.height - particle.moveDistance,
            opacity: 0,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            repeatDelay: particle.duration,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Haseeb Ali
              </span>
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Business Analytics & Information Management
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Data-driven analyst leveraging advanced analytics to drive business solutions
              and operational excellence
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            >
              Learn More
              <FaArrowDown className="animate-bounce" />
            </motion.button>

            <div className="flex gap-4">
              {[
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/haseebali2/', label: 'LinkedIn' },
                { icon: FaEnvelope, href: 'mailto:ali354@purdue.edu', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500/50 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

