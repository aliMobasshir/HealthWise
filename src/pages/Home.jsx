import React from 'react';
import { Link } from 'react-router-dom';
import blackbadge from '../assets/black_circle_360x360.png';
import whitebadge from '../assets/white_circle_360x360.png';
import { 
  Thermometer, 
  Apple, 
  Scale, 
  LineChart, 
  MessageCircle, 
  ArrowRight,
  Heart,
  Shield
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, linkTo, color }) => {
  const Icon = icon;
  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700 group hover:translate-y-[-4px] hover:shadow-lg">
      <Link to={linkTo} className="block p-6">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center ${color} mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-200">
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <div className="space-y-12 page-transition">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-90"></div>
        <Link to="https://bolt.new/">
        <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3 w-14 md:w-20 lg:w-23 transition-transform hover:scale-105">
          <img
            src={whitebadge}
            alt="Powered by Bolt.new"
            className="w-full h-auto hidden dark:block"
          />
          <img
            src={blackbadge}
            alt="Powered by Bolt.new"
            className="w-full h-auto block dark:hidden"
          />
        </div>
        </Link>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Personal Health & Wellness Companion
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Track your health metrics, check symptoms, explore nutrition information, 
            and get personalized wellness recommendations all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/symptoms-checker" 
              className="btn btn-outline dark:border-white bg-white hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20"
            >
              Check Your Symptoms
            </Link>
            <Link 
              to="/health-tracker" 
              className="btn btn-outline border-white text-white  bg-white/10 hover:bg-white/20"
            >
              Track Your Health
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-6 z-10 text-sm text-white opacity-70">
          Powered By <span className="font-semibold">Bolt.new</span>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive suite of health and wellness tools designed to help you 
            monitor, understand, and improve your overall well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Thermometer}
            title="Symptoms Checker"
            description="Check your symptoms and get information about possible conditions and next steps for diagnosis."
            linkTo="/symptoms-checker"
            color="bg-blue-600"
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
          <div className="card dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-600 mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <Heart className="h-10 w-10 text-red-500 animate-pulse-slow" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Health Matters</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We're committed to providing you with reliable tools and information to support your health journey.
                </p>
              </div>
              <div className="mt-4">
                <Link to="/about-us" className="btn btn-primary inline-flex" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Health Journey Today</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Take the first step towards a healthier you. Our comprehensive tools are here to guide and support you every step of the way.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-8 py-3 text-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    location: "New York",
    quote: "The Health Tracker has helped me stay on top of my fitness goals. I love seeing my progress visualized!"
  },
  {
    name: "Michael Chen",
    initials: "MC",
    location: "California",
    quote: "The BMI calculator and personalized recommendations gave me the motivation I needed to make healthier choices."
  },
  {
    name: "Emily Rodriguez",
    initials: "ER",
    location: "Texas",
    quote: "The Food Database is amazing! I've discovered so much about nutrition and it's changed how I eat for the better."
  }
];

export default Home;
