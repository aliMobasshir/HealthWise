import React, { useState, useEffect } from 'react';
import { Scale, Info, Activity, ArrowRight } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiCategoryColor, setBmiCategoryColor] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');

  // Effect to reset the form when unit changes
  useEffect(() => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setShowResult(false);
    setError('');
  }, [unit]);

  // Calculate BMI
  const calculateBMI = (e) => {
    e.preventDefault();
    
    if (!height || !weight) {
      setError('Please enter both height and weight');
      return;
    }

    let bmiValue;
    if (unit === 'metric') {
      // Metric: BMI = weight(kg) / height(m)²
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // Imperial: BMI = (weight(lb) / height(in)²) * 703
      bmiValue = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }

    if (isNaN(bmiValue) || !isFinite(bmiValue)) {
      setError('Please enter valid height and weight values');
      return;
    }

    setBmi(bmiValue.toFixed(1));
    determineBMICategory(bmiValue);
    setShowResult(true);
    setError('');
  };

  // Determine BMI category
  const determineBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setBmiCategory('Underweight');
      setBmiCategoryColor('text-blue-600 dark:text-blue-400');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBmiCategory('Healthy Weight');
      setBmiCategoryColor('text-green-600 dark:text-green-400');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBmiCategory('Overweight');
      setBmiCategoryColor('text-amber-600 dark:text-amber-400');
    } else if (bmiValue >= 30 && bmiValue < 35) {
      setBmiCategory('Obesity Class I');
      setBmiCategoryColor('text-orange-600 dark:text-orange-400');
    } else if (bmiValue >= 35 && bmiValue < 40) {
      setBmiCategory('Obesity Class II');
      setBmiCategoryColor('text-red-600 dark:text-red-400');
    } else {
      setBmiCategory('Obesity Class III');
      setBmiCategoryColor('text-red-700 dark:text-red-500');
    }
  };

  // Reset the form
  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setShowResult(false);
    setError('');
  };

  // Get height placeholder
  const getHeightPlaceholder = () => {
    return unit === 'metric' ? 'Height (cm)' : 'Height (inches)';
  };

  // Get weight placeholder
  const getWeightPlaceholder = () => {
    return unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';
  };

  // Get BMI category description
  const getCategoryDescription = () => {
    switch (bmiCategory) {
      case 'Underweight':
        return 'Being underweight may indicate nutritional deficiencies or other health issues. Consider consulting with a healthcare provider.';
      case 'Healthy Weight':
        return 'Your weight is within the range considered healthy for your height. Maintain a balanced diet and regular physical activity.';
      case 'Overweight':
        return 'Being overweight may increase your risk for certain health conditions. Consider healthy lifestyle changes.';
      case 'Obesity Class I':
        return 'Obesity increases the risk of several health conditions. Consider consulting with a healthcare provider for guidance.';
      case 'Obesity Class II':
        return 'Severe obesity significantly increases health risks. Medical consultation is recommended.';
      case 'Obesity Class III':
        return 'Extreme obesity is associated with severe health risks. Medical consultation is strongly recommended.';
      default:
        return '';
    }
  };

  // Get recommendations based on BMI category
  const getRecommendations = () => {
    switch (bmiCategory) {
      case 'Underweight':
        return [
          'Consult with a healthcare provider to rule out underlying medical conditions',
          'Focus on nutrient-dense foods that provide both calories and nutrients',
          'Consider strength training to build muscle mass',
          'Eat frequent, smaller meals throughout the day',
          'Include healthy fats like avocados, nuts, and olive oil in your diet'
        ];
      case 'Healthy Weight':
        return [
          'Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins',
          'Engage in regular physical activity, at least 150 minutes of moderate exercise per week',
          'Stay hydrated by drinking plenty of water throughout the day',
          'Get adequate sleep, aiming for 7-9 hours per night',
          'Manage stress through relaxation techniques like meditation or yoga'
        ];
      case 'Overweight':
        return [
          'Focus on portion control and mindful eating',
          'Increase physical activity, aiming for at least 150-300 minutes of moderate exercise per week',
          'Reduce consumption of processed foods, sugary beverages, and excessive alcohol',
          'Incorporate more fruits, vegetables, and whole grains into your diet',
          'Consider keeping a food and activity journal to track your progress'
        ];
      case 'Obesity Class I':
      case 'Obesity Class II':
      case 'Obesity Class III':
        return [
          'Consult with a healthcare provider for personalized advice and potential medical interventions',
          'Consider working with a registered dietitian for a personalized meal plan',
          'Start with gentle physical activities like walking and gradually increase intensity',
          'Set realistic goals for weight loss, aiming for 1-2 pounds per week',
          'Consider joining a support group to help maintain motivation and share experiences'
        ];
      default:
        return [];
    }
  };

  // Render BMI scale with indicator
  const renderBMIScale = () => {
    const bmiValue = parseFloat(bmi);
    const min = 15;
    const max = 40;
    const position = Math.min(Math.max(((bmiValue - min) / (max - min)) * 100, 0), 100);

    return (
      <div className="mt-6 mb-8">
        <div className="relative h-8 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-lg overflow-hidden">
          <div 
            className="absolute top-0 w-3 h-8 bg-white border-2 border-gray-800 dark:border-white transform -translate-x-1/2"
            style={{ left: `${position}%` }}
          ></div>
          <div className="absolute top-full mt-2 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40+</span>
          </div>
          <div className="absolute top-full mt-6 left-0 right-0 flex justify-between text-xs text-gray-800 dark:text-gray-200 font-medium">
            <span className="text-blue-600 dark:text-blue-400">Underweight</span>
            <span className="text-green-600 dark:text-green-400">Healthy</span>
            <span className="text-amber-600 dark:text-amber-400">Overweight</span>
            <span className="text-red-600 dark:text-red-400">Obese</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">BMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Calculate your Body Mass Index (BMI) to get insights about your weight category and potential health risks.
          BMI is a useful measure of overweight and obesity but is not a diagnostic tool.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Calculate Your BMI</h2>
          </div>

          <div className="mb-6">
            <label className="form-label mb-2">Unit System</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  value="metric"
                  checked={unit === 'metric'}
                  onChange={() => setUnit('metric')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Metric (cm, kg)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  value="imperial"
                  checked={unit === 'imperial'}
                  onChange={() => setUnit('imperial')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Imperial (in, lbs)</span>
              </label>
            </div>
          </div>

          <form onSubmit={calculateBMI}>
            <div className="mb-4">
              <label htmlFor="height" className="form-label">Height</label>
              <input
                type="number"
                id="height"
                className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={getHeightPlaceholder()}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                step="any"
                min="0"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="weight" className="form-label">Weight</label>
              <input
                type="number"
                id="weight"
                className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={getWeightPlaceholder()}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="any"
                min="0"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="btn btn-primary flex-1"
              >
                Calculate BMI
              </button>
              <button
                type="button"
                className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          {showResult ? (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your BMI Results</h2>
              </div>

              <div className="text-center py-6">
                <div className="text-5xl font-bold mb-4">{bmi}</div>
                <div className={`text-2xl font-semibold mb-2 ${bmiCategoryColor}`}>
                  {bmiCategory}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {getCategoryDescription()}
                </p>
              </div>

              {renderBMIScale()}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {getRecommendations().map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Info className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                BMI Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                BMI is a measure of body fat based on height and weight. It's used to screen for weight 
                categories that may lead to health problems, but it does not diagnose the body fatness or 
                health of an individual.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">BMI Categories:</div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 text-left">
                    <li>Below 18.5: Underweight</li>
                    <li>18.5 - 24.9: Healthy Weight</li>
                    <li>25.0 - 29.9: Overweight</li>
                    <li>30.0 and Above: Obesity</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Limitations:</div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 text-left">
                    <li>Doesn't account for muscle mass</li>
                    <li>May not be accurate for athletes</li>
                    <li>Different considerations for elderly</li>
                    <li>Varies by ethnicity</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Important Notes About BMI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">BMI Limitations</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              BMI is a useful measurement for most people over 18 years old, but it does have some limitations:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>It may overestimate body fat in athletes and others with muscular builds</li>
              <li>It may underestimate body fat in older persons and those who have lost muscle mass</li>
              <li>It doesn't account for differences in body composition between genders</li>
              <li>It doesn't consider where fat is distributed on the body</li>
              <li>BMI may vary by ethnicity and may not be appropriate for all ethnic groups</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Additional Health Indicators</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              For a more comprehensive health assessment, consider these additional measurements:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>Waist circumference (indicator of abdominal fat)</li>
              <li>Waist-to-hip ratio</li>
              <li>Body fat percentage</li>
              <li>Blood pressure</li>
              <li>Cholesterol levels</li>
              <li>Blood glucose levels</li>
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
              Always consult with a healthcare provider for a complete evaluation of your health status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;