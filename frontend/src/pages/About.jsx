import { assets } from '../assets/assets'

const About = () => {
  const specialties = [
    {
      name: "General Medicine",
      description: "Comprehensive primary care for common conditions like fever, cold, diabetes, hypertension",
      conditions: ["Diabetes", "Hypertension", "Common Cold", "Fever", "Health Check-ups"],
      icon: "🩺"
    },
    {
      name: "Cardiology",
      description: "Heart and cardiovascular system disorders",
      conditions: ["Heart Attack", "Arrhythmia", "High Blood Pressure", "Heart Failure", "Chest Pain"],
      icon: "❤️"
    },
    {
      name: "Dermatology", 
      description: "Skin, hair, and nail conditions",
      conditions: ["Acne", "Eczema", "Psoriasis", "Skin Cancer", "Hair Loss"],
      icon: "🧴"
    },
    {
      name: "Orthopedics",
      description: "Bone, joint, and muscle problems",
      conditions: ["Fractures", "Arthritis", "Back Pain", "Sports Injuries", "Joint Replacement"],
      icon: "🦴"
    },
    {
      name: "Pediatrics",
      description: "Healthcare for infants, children, and adolescents",
      conditions: ["Vaccinations", "Growth Issues", "Childhood Infections", "Developmental Delays"],
      icon: "👶"
    },
    {
      name: "Gynecology",
      description: "Women's reproductive health and wellness",
      conditions: ["Pregnancy Care", "Menstrual Issues", "PCOS", "Menopause", "Contraception"],
      icon: "👩‍⚕️"
    }
  ];

  const selfCareTypes = [
    {
      category: "Physical Health",
      tips: [
        "Regular exercise (30 minutes daily)",
        "Balanced nutrition with fruits and vegetables",
        "Adequate sleep (7-9 hours nightly)",
        "Stay hydrated (8-10 glasses water daily)",
        "Regular health check-ups"
      ],
      icon: "💪",
      color: "bg-blue-50 border-blue-200"
    },
    {
      category: "Mental Health",
      tips: [
        "Practice meditation and mindfulness",
        "Manage stress through relaxation techniques",
        "Maintain social connections",
        "Limit screen time and social media",
        "Seek professional help when needed"
      ],
      icon: "🧠",
      color: "bg-green-50 border-green-200"
    },
    {
      category: "Preventive Care",
      tips: [
        "Regular dental check-ups every 6 months",
        "Annual eye examinations",
        "Cancer screenings as recommended",
        "Vaccinations and immunizations",
        "Monitor vital signs regularly"
      ],
      icon: "🛡️",
      color: "bg-purple-50 border-purple-200"
    },
    {
      category: "Emergency Preparedness",
      tips: [
        "Know when to call emergency services",
        "Keep first aid kit at home",
        "Maintain emergency contact list",
        "Learn basic CPR and first aid",
        "Have emergency medications ready"
      ],
      icon: "🚨",
      color: "bg-red-50 border-red-200"
    }
  ];

  const commonConditions = [
    {
      name: "Diabetes",
      description: "Blood sugar management and monitoring",
      symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision"],
      prevention: ["Healthy diet", "Regular exercise", "Weight management", "Regular screening"]
    },
    {
      name: "Hypertension",
      description: "High blood pressure management", 
      symptoms: ["Headaches", "Shortness of breath", "Nosebleeds", "Chest pain"],
      prevention: ["Low sodium diet", "Regular exercise", "Stress management", "Limit alcohol"]
    },
    {
      name: "Heart Disease",
      description: "Cardiovascular health and prevention",
      symptoms: ["Chest pain", "Shortness of breath", "Fatigue", "Irregular heartbeat"],
      prevention: ["Heart-healthy diet", "Regular exercise", "No smoking", "Stress management"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Your Complete Healthcare Guide
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100'>
              Understanding Health, Diseases, and Self-Care for Better Living
            </p>
          </div>
        </div>
      </div>

      {/* About Prescripto Section */}
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>
            ABOUT <span className='text-primary'>PRESCRIPTO</span>
          </h2>
          <div className='w-24 h-1 bg-primary mx-auto'></div>
        </div>

        <div className='flex flex-col md:flex-row gap-12 items-center mb-16'>
          <img className='w-full md:max-w-[400px] rounded-lg shadow-lg' src={assets.about_image} alt="About Prescripto" />
          <div className='flex flex-col justify-center gap-6 md:w-2/3 text-gray-700'>
            <p className='text-lg leading-relaxed'>
              Welcome to Prescripto, your comprehensive healthcare platform that goes beyond simple appointment booking. 
              We&apos;re committed to educating and empowering you with knowledge about health conditions, medical specialties, 
              and self-care practices.
            </p>
            <p className='text-lg leading-relaxed'>
              Our mission is to bridge the gap between patients and healthcare providers while providing valuable health 
              education to help you make informed decisions about your wellbeing.
            </p>
            <div className='bg-blue-50 border-l-4 border-primary p-4 rounded'>
              <p className='font-semibold text-primary mb-2'>Our Vision</p>
              <p className='text-gray-700'>
                To create a world where quality healthcare information and services are accessible to everyone, 
                promoting preventive care and healthy living through education and technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Specialties Section */}
      <div className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              MEDICAL <span className='text-primary'>SPECIALTIES</span>
            </h2>
            <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
              Understanding different medical specialties helps you choose the right healthcare provider for your specific needs
            </p>
            <div className='w-24 h-1 bg-primary mx-auto mt-4'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {specialties.map((specialty, index) => (
              <div key={index} className='bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105'>
                <div className='text-center mb-4'>
                  <div className='text-4xl mb-2'>{specialty.icon}</div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>{specialty.name}</h3>
                  <p className='text-gray-600 text-sm'>{specialty.description}</p>
                </div>
                <div>
                  <p className='font-medium text-gray-800 mb-2'>Common Conditions:</p>
                  <ul className='space-y-1'>
                    {specialty.conditions.map((condition, idx) => (
                      <li key={idx} className='text-sm text-gray-600 flex items-center'>
                        <span className='w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0'></span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Self-Care Section */}
      <div className='bg-gray-50 py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              SELF-CARE <span className='text-primary'>GUIDE</span>
            </h2>
            <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
              Preventive care and healthy lifestyle choices are the foundation of good health. Learn how to take care of yourself.
            </p>
            <div className='w-24 h-1 bg-primary mx-auto mt-4'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {selfCareTypes.map((category, index) => (
              <div key={index} className={`${category.color} border rounded-xl p-6 shadow-lg`}>
                <div className='flex items-center mb-4'>
                  <span className='text-3xl mr-3'>{category.icon}</span>
                  <h3 className='text-xl font-semibold text-gray-800'>{category.category}</h3>
                </div>
                <ul className='space-y-3'>
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className='text-gray-700 flex items-start'>
                      <span className='w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0'></span>
                      <span className='text-sm'>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Health Conditions Section */}
      <div className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              COMMON HEALTH <span className='text-primary'>CONDITIONS</span>
            </h2>
            <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
              Learn about prevalent health conditions, their symptoms, and prevention strategies
            </p>
            <div className='w-24 h-1 bg-primary mx-auto mt-4'></div>
          </div>

          <div className='space-y-8'>
            {commonConditions.map((condition, index) => (
              <div key={index} className='bg-gray-50 rounded-xl p-8 shadow-lg'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='text-2xl font-semibold text-gray-800 mb-3'>{condition.name}</h3>
                    <p className='text-gray-600 mb-6'>{condition.description}</p>
                    
                    <div className='mb-4'>
                      <h4 className='font-semibold text-gray-800 mb-2 flex items-center'>
                        <span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
                        Common Symptoms:
                      </h4>
                      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className='text-sm text-gray-600 flex items-center'>
                            <span className='text-red-500 mr-2'>•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-2 flex items-center'>
                      <span className='w-3 h-3 bg-green-500 rounded-full mr-2'></span>
                      Prevention Tips:
                    </h4>
                    <ul className='space-y-2'>
                      {condition.prevention.map((tip, idx) => (
                        <li key={idx} className='text-sm text-gray-600 flex items-start'>
                          <span className='text-green-500 mr-2 mt-1'>✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                    
                    <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                      <p className='text-sm text-yellow-800'>
                        <strong>⚠️ Important:</strong> If you experience these symptoms, consult with a healthcare professional for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Information Section */}
      <div className='bg-red-50 py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              EMERGENCY <span className='text-red-600'>INFORMATION</span>
            </h2>
            <div className='w-24 h-1 bg-red-600 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
                <span className='text-2xl mr-2'>🚨</span>
                When to Call Emergency Services
              </h3>
              <ul className='space-y-2 text-gray-700'>
                <li className='flex items-start'><span className='text-red-600 mr-2'>•</span>Severe chest pain or difficulty breathing</li>
                <li className='flex items-start'><span className='text-red-600 mr-2'>•</span>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
                <li className='flex items-start'><span className='text-red-600 mr-2'>•</span>Severe allergic reactions</li>
                <li className='flex items-start'><span className='text-red-600 mr-2'>•</span>Uncontrolled bleeding or severe injuries</li>
                <li className='flex items-start'><span className='text-red-600 mr-2'>•</span>Loss of consciousness or severe confusion</li>
              </ul>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
                <span className='text-2xl mr-2'>📞</span>
                Important Contact Numbers
              </h3>
              <div className='space-y-3 text-gray-700'>
                <div className='flex justify-between items-center border-b pb-2'>
                  <span>Emergency Services</span>
                  <span className='font-semibold text-red-600'>911</span>
                </div>
                <div className='flex justify-between items-center border-b pb-2'>
                  <span>Poison Control</span>
                  <span className='font-semibold'>1-800-222-1222</span>
                </div>
                <div className='flex justify-between items-center border-b pb-2'>
                  <span>Mental Health Crisis</span>
                  <span className='font-semibold'>988</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Your Doctor</span>
                  <span className='text-gray-500 text-sm'>Keep handy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              WHY <span className='text-primary'>CHOOSE PRESCRIPTO</span>
            </h2>
            <div className='w-24 h-1 bg-primary mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105'>
              <div className='text-4xl mb-4'>⚡</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>EFFICIENCY</h3>
              <p className='text-gray-600'>
                Streamlined appointment scheduling, comprehensive health information, and quick access to medical expertise that fits your busy lifestyle.
              </p>
            </div>
            
            <div className='bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105'>
              <div className='text-4xl mb-4'>🏥</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>COMPREHENSIVE CARE</h3>
              <p className='text-gray-600'>
                Access to trusted healthcare professionals, detailed health education, and preventive care resources all in one platform.
              </p>
            </div>
            
            <div className='bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105'>
              <div className='text-4xl mb-4'>🎯</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>PERSONALIZED APPROACH</h3>
              <p className='text-gray-600'>
                Tailored health recommendations, educational content, and appointment reminders to help you stay on top of your health journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-16'>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Take Control of Your Health?</h2>
          <p className='text-xl mb-8 text-blue-100'>
            Book an appointment with our qualified healthcare professionals and start your journey to better health today.
          </p>
          <button className='bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg'>
            Book Appointment Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
