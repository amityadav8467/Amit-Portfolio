import { GraduationCap, Calendar, Award } from 'lucide-react';

const Experience = () => {
  const education = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Shambhunath College of Education, Prayagraj',
      year: '2023-2026',
    },
    
  ];

  const qualifications = [
    {
      title: 'Advanced Diploma in Computer Applications',
      institution: 'BCSM Institute',
      bgGradient: 'from-blue-500 to-blue-600',
      abbreviation: 'ADCA',
    },
    {
      title: 'Course on Computer Concepts',
      institution: 'NIELIT',
      bgGradient: 'from-green-500 to-green-600',
      abbreviation: 'CCC',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Education & Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

            {education.map((item, index) => (
              <div key={index} className="relative mb-12 last:mb-0 pl-20">
                <div className="absolute left-5 top-2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <GraduationCap className="text-blue-600" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.degree}</h3>
                      <p className="text-gray-700 font-medium mb-2">{item.institution}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{item.year}</span>
                        </div>
                        <div className="font-semibold text-blue-600">{item.score}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Extra Qualifications</h3>
            <div className="space-y-4">
              {qualifications.map((qual, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:translate-x-2 transition-all duration-300"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${qual.bgGradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-white font-bold text-lg text-center px-2">{qual.abbreviation}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{qual.title}</h4>
                    <p className="text-gray-600 text-sm">{qual.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
