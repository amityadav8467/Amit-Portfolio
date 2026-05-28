import { Github, Linkedin, Download, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'amit resume.pdf';
    link.download = 'Amit_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fadeIn text-center">
            <div className="mb-8">
              <img
                src="profile-pic.png"
                alt="Amit Yadav"
                className="w-45 h-40 rounded-full object-cover mx-auto shadow-lg border-4 border-blue-100"
              />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              I build. I ship. I run a startup <span className="text-blue-600">Amit Yadav</span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-700 mb-4 font-medium">
              Full-Stack Developer • Startup Founder • Tech Enthusiast
            </p>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              BCA Graduate and Full-Stack Developer with a passion for building real-world web products. I founded Codexora Solutions to help small businesses establish their online presence. I work with React, Node.js, Python, and AI to turn ideas into working products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="mr-2" size={20} />
                Hire Me
              </a>
              <button
                onClick={downloadResume}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="mr-2" size={20} />
                Download Resume
              </button>
            </div>

            <div className="flex gap-6 justify-center">
              <a
                href="https://www.linkedin.com/in/amit-yadav-a03337260"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/amityadav8467"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
