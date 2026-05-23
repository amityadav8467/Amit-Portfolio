import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Shopify - E Commerce Web',
      description: 'A fully responsive e-commerce website with product listings, cart functionality, and modern UI design.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://amityadav8467.github.io/Shopify-E-Commerce-Web/',
      codeUrl: 'https://github.com/amityadav8467/Shopify-E-Commerce-Web',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      title: 'Tic-Tac-Toe Game',
      description: 'An interactive Tic-Tac-Toe game with clean UI, game logic, and win detection algorithm.',
      tags: ['JavaScript', 'Game Logic'],
      liveUrl: 'https://amityadav8467.github.io/Tic-Tac-Toe-Game/',
      codeUrl: 'https://github.com/amityadav8467/Tic-Tac-Toe-Game',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Modern Music Player',
      description: 'A feature-rich music player with playlist management, controls, and sleek interface.',
      tags: ['JavaScript', 'Audio API'],
      liveUrl: 'https://amityadav8467.github.io/Modern-Music-Player/',
      codeUrl: 'https://github.com/amityadav8467/Modern-Music-Player',
      gradient: 'from-pink-400 to-rose-600',
    },
    {
      title: 'FileFusion-A Local File Tools',
      description: 'Local file tools application for managing and processing files with various utilities.',
      tags: ['JavaScript', 'File API'],
      liveUrl: 'https://filefusion-local-file-tools.onrender.com/',
      codeUrl: 'https://github.com/amityadav8467/FileFusion-Local-File-Tools',
      gradient: 'from-orange-400 to-red-600',
    },
    {
      title: 'Complaint Management System-A Full Stack Web App',
      description: 'A web application for submitting and managing complaints with real-time updates and notifications.',
      tags: ['React.js', 'Node.js', 'MongoDB'],
      liveUrl: 'https://amityadav8467.github.io/complain-management-system/',
      codeUrl: 'https://github.com/amityadav8467/complain-management-system.git',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'AuraChat — AI Conversational Chatbot',
      description: 'An AI-powered chatbot that provides conversational interactions and assistance.',
      tags: ['Python', 'Flask', 'Groq API', 'MongoDB'],
      liveUrl: 'https://aurachat-e6k6.onrender.com/',
      codeUrl: 'https://github.com/amityadav8467/AuraChat.git',
      gradient: 'from-purple-400 to-purple-600',
    }

  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <h3 className="text-white text-2xl font-bold text-center px-4">{project.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 min-h-[60px]">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
