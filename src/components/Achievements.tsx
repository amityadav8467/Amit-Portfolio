import { Award, Trophy, Star } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: 'NXTWAVE Generative AI Workshop',
      type: 'Workshop',
      icon: Star,
      color: 'from-blue-400 to-blue-600',
    },
    
    {
      title: 'Accenture Australia',
      subtitle: 'Technology Consulting Job Simulation',
      type: 'Certificate',
      icon: Award,
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Deloitte Australia',
      subtitle: 'Data Analytics Job Simulation',
      type: 'Certificate',
      icon: Award,
      color: 'from-green-400 to-emerald-600',
    },
    {
      title: 'Tata',
      subtitle: 'GenAI Powered Data Analytics Job Simulation',
      type: 'Certificate',
      icon: Award,
      color: 'from-cyan-400 to-blue-600',
    },
    {
      title: 'Google Cloud',
      subtitle: 'Generative AI Skill',
      type: 'Certificate',
      icon: Award,
      color: 'from-red-400 to-rose-600',
    },
    {
      title: 'Tcs iON',
      subtitle: 'AI and Cybersecurity Awareness and Generative AI Essentials',
      type: 'Certificate',
      icon: Award,
      color: 'from-indigo-400 to-purple-600',
    },
    {
      title: 'HCL GUVI',
      subtitle: 'Payment System Design using React',
      type: 'Certificate',
      icon: Award,
      color: 'from-yellow-400 to-yellow-600',
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Achievements & Certifications</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="text-white" size={32} />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-semibold mb-3">
                      {achievement.type}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    {achievement.subtitle && (
                      <p className="text-gray-600 text-sm">{achievement.subtitle}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
