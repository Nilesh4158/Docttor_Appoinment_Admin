import { useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for your message! We&apos;ll get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Our Main Office',
      details: ['54709 Willms Station', 'Suite 350, Washington, USA', 'Zip Code: 20001'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '📞',
      title: 'Phone Numbers',
      details: ['Main: (415) 555-0132', 'Emergency: (415) 555-0911', 'Appointments: (415) 555-0156'],
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '✉️',
      title: 'Email Addresses',
      details: ['General: info@prescripto.com', 'Support: support@prescripto.com', 'Careers: careers@prescripto.com'],
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM'],
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const departments = [
    {
      name: 'Patient Care',
      description: 'For appointment booking, medical inquiries, and patient support',
      phone: '(415) 555-0156',
      email: 'patients@prescripto.com',
      hours: '24/7 Available',
      icon: '🏥'
    },
    {
      name: 'Technical Support',
      description: 'For app issues, account problems, and technical assistance',
      phone: '(415) 555-0178',
      email: 'support@prescripto.com',
      hours: 'Mon-Fri 9AM-6PM',
      icon: '💻'
    },
    {
      name: 'Business Inquiries',
      description: 'For partnerships, business development, and corporate services',
      phone: '(415) 555-0199',
      email: 'business@prescripto.com',
      hours: 'Mon-Fri 9AM-5PM',
      icon: '🤝'
    },
    {
      name: 'Media & Press',
      description: 'For media inquiries, press releases, and public relations',
      phone: '(415) 555-0145',
      email: 'media@prescripto.com',
      hours: 'Mon-Fri 9AM-5PM',
      icon: '📺'
    }
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book appointments through our website, mobile app, or by calling our patient care line at (415) 555-0156.'
    },
    {
      question: 'What should I do in case of a medical emergency?',
      answer: 'For medical emergencies, call 911 immediately. For urgent but non-emergency medical questions, call our emergency line at (415) 555-0911.'
    },
    {
      question: 'How can I access my medical records?',
      answer: 'Log into your patient portal through our website or app to access your complete medical records, test results, and appointment history.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'We accept most major insurance plans. Please contact our patient care team to verify your specific insurance coverage.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Get In Touch With Us
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100'>
              We&apos;re here to help with all your healthcare needs
            </p>
            <div className='flex justify-center space-x-4'>
              <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
                <span className='text-blue-100 text-sm'>Available 24/7 for Emergencies</span>
              </div>
              <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
                <span className='text-blue-100 text-sm'>Multilingual Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Info Cards */}
      <div className='max-w-6xl mx-auto px-4 -mt-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {contactInfo.map((info, index) => (
            <div key={index} className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105'>
              <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                {info.icon}
              </div>
              <h3 className='font-semibold text-gray-800 mb-3'>{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className='text-gray-600 text-sm mb-1'>{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white rounded-2xl shadow-xl p-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>Send us a Message</h2>
              <p className='text-gray-600'>Fill out the form below and we&apos;ll get back to you as soon as possible</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200'
                    placeholder='Your full name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200'
                    placeholder='(555) 123-4567'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200'
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none'
                  placeholder='Please describe your inquiry in detail...'
                ></textarea>
              </div>

              <button
                type="submit"
                className='w-full bg-gradient-to-r from-primary to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg'
              >
                Send Message
              </button>

              {formStatus && (
                <div className='bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center'>
                  {formStatus}
                </div>
              )}
            </form>
          </div>

          {/* Contact Image and Info */}
          <div className='space-y-8'>
            <div className='bg-white rounded-2xl shadow-xl p-8'>
              <img className='w-full rounded-lg mb-6' src={assets.contact_image} alt="Contact Us" />
              
              <div className='space-y-6'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-4'>Why Contact Prescripto?</h3>
                  <ul className='space-y-3 text-gray-600'>
                    <li className='flex items-start'>
                      <span className='text-primary mr-2 mt-1'>✓</span>
                      <span>24/7 customer support for urgent medical questions</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-primary mr-2 mt-1'>✓</span>
                      <span>Expert guidance from certified healthcare professionals</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-primary mr-2 mt-1'>✓</span>
                      <span>Multilingual support in English, Spanish, and French</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-primary mr-2 mt-1'>✓</span>
                      <span>Secure and confidential communication</span>
                    </li>
                  </ul>
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-800 mb-2 flex items-center'>
                    <span className='text-xl mr-2'>🚨</span>
                    Emergency Notice
                  </h4>
                  <p className='text-sm text-blue-800'>
                    For life-threatening emergencies, please call 911 immediately. 
                    Our contact form is not monitored 24/7 for emergency situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Contact Info */}
      <div className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Contact By <span className='text-primary'>Department</span>
            </h2>
            <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
              Reach out to the right department for faster and more accurate assistance
            </p>
            <div className='w-24 h-1 bg-primary mx-auto mt-4'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {departments.map((dept, index) => (
              <div key={index} className='bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-3xl mr-3'>{dept.icon}</span>
                  <h3 className='text-xl font-semibold text-gray-800'>{dept.name}</h3>
                </div>
                <p className='text-gray-600 mb-4'>{dept.description}</p>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center text-gray-700'>
                    <span className='w-5 h-5 text-primary mr-2'>📞</span>
                    <span className='font-medium'>{dept.phone}</span>
                  </div>
                  <div className='flex items-center text-gray-700'>
                    <span className='w-5 h-5 text-primary mr-2'>✉️</span>
                    <span className='font-medium'>{dept.email}</span>
                  </div>
                  <div className='flex items-center text-gray-700'>
                    <span className='w-5 h-5 text-primary mr-2'>🕒</span>
                    <span className='font-medium'>{dept.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='bg-gray-50 py-16'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Frequently Asked <span className='text-primary'>Questions</span>
            </h2>
            <p className='text-gray-600 text-lg'>
              Quick answers to common questions about our services
            </p>
            <div className='w-24 h-1 bg-primary mx-auto mt-4'></div>
          </div>

          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <div key={index} className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                  <span className='text-primary mr-2'>Q:</span>
                  {faq.question}
                </h3>
                <p className='text-gray-600 ml-6'>
                  <span className='text-primary font-semibold mr-2'>A:</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-white text-center'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold mb-4'>Join Our Healthcare Team</h2>
              <p className='text-xl mb-8 text-blue-100'>
                Make a difference in people&apos;s lives while building your career with Prescripto
              </p>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-2xl mb-2'>🏥</div>
                  <h3 className='font-semibold mb-1'>Healthcare Roles</h3>
                  <p className='text-sm text-blue-100'>Doctors, Nurses, Specialists</p>
                </div>
                <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-2xl mb-2'>💻</div>
                  <h3 className='font-semibold mb-1'>Technology Roles</h3>
                  <p className='text-sm text-blue-100'>Developers, Engineers, Analysts</p>
                </div>
                <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4'>
                  <div className='text-2xl mb-2'>📊</div>
                  <h3 className='font-semibold mb-1'>Business Roles</h3>
                  <p className='text-sm text-blue-100'>Marketing, Sales, Operations</p>
                </div>
              </div>

              <div className='space-y-4'>
                <button className='bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg mr-4'>
                  View Open Positions
                </button>
                <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300'>
                  Learn About Benefits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className='bg-gray-800 text-white py-12'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Still Have Questions?</h2>
          <p className='text-gray-300 mb-6'>
            Our customer service team is available to help you with any questions or concerns
          </p>
          <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <a href="tel:+14155550132" className='flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-300'>
              <span className='mr-2'>📞</span>
              Call Now: (415) 555-0132
            </a>
            <a href="mailto:info@prescripto.com" className='flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-300'>
              <span className='mr-2'>✉️</span>
              Email Us: info@prescripto.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
