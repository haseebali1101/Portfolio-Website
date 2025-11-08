import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      id="about"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="space-y-4 text-gray-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              <p>
                I'm a graduate student in Business Analytics and Information Management at Purdue University 
                with a proven track record as a sales and operations specialist. I leverage data-driven analysis 
                and strategic insights to manage large portfolios, drive market expansion, plan demand, and deliver 
                actionable business solutions.
              </p>
              <p>
                Currently seeking an internship to apply advanced analytics expertise, contribute to cross-functional 
                teams, and further develop operational leadership skills for future business success. My experience 
                includes managing B2B accounts, leading teams, and developing data-driven solutions using tools like 
                Power BI, SAP, Python, and Excel VBA.
              </p>
              <p>
                When I'm not analyzing data or building dashboards, you can find me playing cricket, working out, 
                enjoying paddle tennis, or gaming. I'm passionate about using analytics to solve real-world business 
                challenges and drive growth.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="relative w-full max-w-md mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder for profile image */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-600">HA</div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional info cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              title: 'Experience',
              description: 'Years in analytics and operations',
              value: '3+',
            },
            {
              title: 'Accounts Managed',
              description: 'B2B accounts portfolio',
              value: '200+',
            },
            {
              title: 'Tools & Technologies',
              description: 'Analytics and business intelligence',
              value: '10+',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.title}
              </div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

