import { MapPin, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Motivated and detail-oriented recent BCA student with practical experience building web projects
                and a strong foundation in HTML, CSS, JavaScript, Python, C/C++. Seeking opportunities as a Junior
                Developer to build useful and beautiful web apps. Committed to continuous learning and applying
                modern tools and best practices.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Ballia, Uttar Pradesh 221711</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+918467977759" className="text-gray-600 hover:text-blue-600 transition-colors">
                      +91 84679 7759
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:ay990351@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      ay990351@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
