import React from 'react';
import { Heart, Shield, Clock, Apple, Scale, LineChart, MessageCircle } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="space-y-16 page-transition">

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            About HealthWise
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Built as a part of the world's largest hackathon presented by Bolt,
            HealthWise is on a mission to revolutionize healthcare by making it more 
            <span className="font-semibold"> accessible, informative, and proactive.</span>  
            Our platform empowers individuals to take charge of their well-being through a seamless blend of 
            intelligent tools, reliable virtual assistance, and scientifically validated data — all in one place.
            <br /><br />
            In an age where healthcare can often feel reactive and out of reach, HealthWise is designed to put the 
            power of knowledge, prediction, and prevention directly into the hands of users — helping them make 
            smarter decisions, detect issues earlier, and manage health confidently and wisely.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Shield}
            title="Disease Prediction"
            description="Leverages AI to predict possible health conditions based on your symptoms."
            color="bg-blue-600"
          />
          <FeatureCard 
            icon={Clock}
            title="Next Diagnostic Steps"
            description="Provides actionable recommendations such as tests, doctor visits, or home care."
            color="bg-green-600"
          />
          <FeatureCard 
            icon={Apple}
            title="Food Database"
            description="Explore detailed nutritional information, benefits, and potential side effects of various foods."
            linkTo="/food-database"
            color="bg-green-600"
          />
          <FeatureCard 
            icon={Scale}
            title="BMI Calculator"
            description="Calculate your Body Mass Index and get insights about your weight category and health risks."
            linkTo="/bmi-calculator"
            color="bg-amber-600"
          />
          <FeatureCard 
            icon={LineChart}
            title="Health Tracker"
            description="Record and visualize your health metrics over time to identify trends and improvements."
            linkTo="/health-tracker"
            color="bg-purple-600"
          />
          <FeatureCard 
            icon={MessageCircle}
            title="AI Doctor"
            description="Get instant health advice and guidance from our AI-powered virtual doctor assistant."
            linkTo="/ai-doctor"
            color="bg-teal-600"
          />
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="relative py-20 md:py-28 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Your Health, Our Priority
          </h2>
          <p className="text-lg text-white text-opacity-90 max-w-2xl mx-auto">
            At HealthWise, your well-being isn’t just a feature — it’s the foundation of everything we do. 
            Every tool we build, every insight we deliver, and every line of code we write is guided by a commitment to care, accuracy, and empowerment.
            <br /><br />
            With advanced AI, secure handling of your data, and constant improvements backed by science, 
            we’re here to support your health journey — one wise decision at a time.
            You deserve to feel confident, informed, and supported — and with HealthWise, you will.
          </p>
        </div>
      </section>

      {/* Built with Bolt Section */}
      <section className="container mx-auto px-4 text-center py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Proudly built using</p>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Bolt.new</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Proudly built by</p>
          <p className="font-semibold text-lg text-gray-900 dark:text-white">MD Mobasshir Ali</p>
        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={`rounded-full w-12 h-12 flex items-center justify-center ${color} mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default AboutUs;
