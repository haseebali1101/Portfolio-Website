import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Sales Performance Dashboard',
    description: 'Power BI dashboard for food portfolio performance metrics',
    longDescription:
      'Developed and maintained comprehensive Power BI dashboards to enhance visibility of food portfolio performance metrics. Provided weekly updates on Reach and Penetration across all regions to track and meet sales targets effectively. Delivered insights on weekly stock cover at distributor and distribution center levels.',
    technologies: ['Power BI', 'Data Analysis', 'Excel', 'SAP'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'Portfolio Management System',
    description: 'Managed 200+ B2B accounts with data-driven strategies',
    longDescription:
      'Managed a portfolio of 200+ B2B accounts across Karachi, achieving high client satisfaction and consistent MoM growth of 10%. Oversaw monthly turnover of approximately half a million dollars by implementing robust sales management strategies. Directed cash recovery operations and conducted financial feasibility analyses.',
    technologies: ['Excel VBA', 'Data Analysis', 'Financial Modeling', 'SAP'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Sales Operations Analytics',
    description: 'Consolidated primary and secondary sales data analysis',
    longDescription:
      'Oversaw the consolidation of primary and secondary sales data for comprehensive analysis. Conducted creation and modification of new distributor codes in SAP, ensuring accurate tracking of sales data and performance. Developed data-driven coaching strategies to consistently surpass sales targets.',
    technologies: ['SAP', 'Excel', 'Power BI', 'Data Analysis'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 4,
    title: 'Treasury & Banking Analytics',
    description: 'Financial analysis and currency trend monitoring',
    longDescription:
      'Managed and maintained Nostro accounts for clients, ensuring accuracy and reliability in financial transactions. Monitored global currency trends to make informed decisions on currency conversions. Verified and processed incoming remittances from abroad, adhering to strict compliance and security protocols.',
    technologies: ['Financial Analysis', 'Excel', 'Banking Systems', 'Data Analysis'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 5,
    title: 'Supply Chain Optimization',
    description: 'Coordinated SKU delivery and order fulfillment analysis',
    longDescription:
      'Coordinated with supply chain teams to guarantee timely SKU delivery to distributors, improving order fulfillment accuracy and operational efficiency. Administered discount strategies and ensured optimal stock management to maximize profitability. Supported marketing in planning promotional activities through data insights.',
    technologies: ['Excel', 'SAP', 'Data Analysis', 'Operations'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 6,
    title: 'Team Performance Management',
    description: 'KPI tracking and data-driven coaching system',
    longDescription:
      'Led a team of Sales Representatives, set and monitored KPIs, and consistently surpassed sales targets through data-driven coaching and performance management. Implemented robust sales management strategies and drove revenue acceleration through analytical insights and strategic planning.',
    technologies: ['Excel', 'Power BI', 'Data Analysis', 'Leadership'],
    image: '/api/placeholder/600/400',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
    hidden: { opacity: 0, y: 50 },
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
      id="projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
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
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my skills and experience
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-600 opacity-50">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4"
                  initial={false}
                >
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  >
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-purple-500 transition-colors"
                  >
                    <FaExternalLinkAlt size={20} />
                  </motion.a>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <FaGithub /> View Code
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-4 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects

