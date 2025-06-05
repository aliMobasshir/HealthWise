import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SymptomsChecker from './pages/SymptomsChecker';
import FoodDatabase from './pages/FoodDatabase';
import BMICalculator from './pages/BMICalculator';
import HealthTracker from './pages/HealthTracker';
import AIDoctor from './pages/AIDoctor';
import Aboutus from './pages/Aboutus';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms-checker" element={<SymptomsChecker />} />
            <Route path="/food-database" element={<FoodDatabase />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/health-tracker" element={<HealthTracker />} />
            <Route path="/ai-doctor" element={<AIDoctor />} />
            <Route path="/about-us" element={<Aboutus />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;