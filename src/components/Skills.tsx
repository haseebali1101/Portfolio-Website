import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaPython,
  FaMicrosoft,
  FaChartLine,
  FaDatabase,
  FaFileExcel,
  FaBriefcase,
  FaChartBar,
} from 'react-icons/fa'
import {
  SiPowerbi,
  SiSap,
  SiMicrosoftoffice,
} from 'react-icons/si'

interface Skill {
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  level: number
  color: string
}

const skills: Skill[] = [
  { name: 'Python', icon: FaPython, level: 85, color: 'text-blue-400' },
  { name: 'Power BI', icon: SiMicrosoftpowerbi, level: 90, color: 'text-yellow-400' },
  { name: 'SAP', icon: SiSap, level: 85, color: 'text-blue-500' },
  { name: 'Excel VBA', icon: FaFileExcel, level: 90, color: 'text-green-500' },
  { name: 'SPSS', icon: FaChartBar, level: 80, color: 'text-orange-500' },
  { name: 'Financial Modeling', icon: FaChartLine, level: 85, color: 'text-green-400' },
  { name: 'Data Analysis', icon: FaDatabase, level: 90, color: 'text-purple-400' },
  { name: 'Business Analytics', icon: FaChartBar, level: 88, color: 'text-cyan-400' },
  { name: 'Sales Operations', icon: FaBriefcase, level: 90, color: 'text-blue-300' },
  { name: 'Portfolio Management', icon: FaChartLine, level: 85, color: 'text-indigo-400' },
  { name: 'MS Excel', icon: SiMicrosoftoffice, level: 95, color: 'text-green-600' },
  { name: 'Investment Analysis', icon: FaChartBar, level: 80, color: 'text-yellow-500' },
]

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Analytics, business intelligence, and data-driven decision making tools
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col items-center justify-center cursor-pointer">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-4 ${skill.color}`}
                  >
                    <Icon size={48} />
                  </motion.div>
                  <div className="text-white font-semibold mb-2 text-center">
                    {skill.name}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{
                        duration: 1,
                        delay: skills.indexOf(skill) * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                  <div className="text-gray-400 text-sm mt-2">{skill.level}%</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

