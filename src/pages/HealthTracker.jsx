import React, { useState, useEffect } from 'react';
import { 
  LineChart as LineChartIcon, 
  Heart, 
  Scale, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp,
  ArrowDown,
  X,
  Info,
  Activity
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample initial data
const initialHealthData = {
  weight: [
    { date: '2024-06-01', value: 70.5 },
    { date: '2024-06-02', value: 70.3 },
    { date: '2024-06-03', value: 70.2 },
    { date: '2024-06-04', value: 70.4 },
    { date: '2024-06-05', value: 70.1 },
    { date: '2024-06-06', value: 69.9 },
    { date: '2024-06-07', value: 69.8 }
  ],
  heartRate: [
    { date: '2024-06-01', value: 72 },
    { date: '2024-06-02', value: 75 },
    { date: '2024-06-03', value: 71 },
    { date: '2024-06-04', value: 73 },
    { date: '2024-06-05', value: 70 },
    { date: '2024-06-06', value: 72 },
    { date: '2024-06-07', value: 74 }
  ],
  bloodPressure: [
    { date: '2024-06-01', systolic: 120, diastolic: 80 },
    { date: '2024-06-02', systolic: 122, diastolic: 82 },
    { date: '2024-06-03', systolic: 118, diastolic: 79 },
    { date: '2024-06-04', systolic: 121, diastolic: 81 },
    { date: '2024-06-05', systolic: 119, diastolic: 80 },
    { date: '2024-06-06', systolic: 120, diastolic: 78 },
    { date: '2024-06-07', systolic: 117, diastolic: 77 }
  ],
  sleep: [
    { date: '2024-06-01', hours: 7.5, quality: 'Good' },
    { date: '2024-06-02', hours: 6.8, quality: 'Fair' },
    { date: '2024-06-03', hours: 7.2, quality: 'Good' },
    { date: '2024-06-04', hours: 8.0, quality: 'Excellent' },
    { date: '2024-06-05', hours: 6.5, quality: 'Fair' },
    { date: '2024-06-06', hours: 7.0, quality: 'Good' },
    { date: '2024-06-07', hours: 7.8, quality: 'Good' }
  ]
};

const HealthTracker = () => {
  // State for health data
  const [healthData, setHealthData] = useState(() => {
    // Try to load data from localStorage
    const savedData = localStorage.getItem('healthData');
    return savedData ? JSON.parse(savedData) : initialHealthData;
  });
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(''); // 'weight', 'heartRate', 'bloodPressure', 'sleep'
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [editIndex, setEditIndex] = useState(null);
  
  // Form input states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weightValue, setWeightValue] = useState('');
  const [heartRateValue, setHeartRateValue] = useState('');
  const [systolicValue, setSystolicValue] = useState('');
  const [diastolicValue, setDiastolicValue] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('Good');
  
  // Chart settings
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'
  const [activeTab, setActiveTab] = useState('weight');

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(healthData));
  }, [healthData]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Open form for adding new entry
  const openAddForm = (type) => {
    setFormType(type);
    setFormMode('add');
    setDate(new Date().toISOString().split('T')[0]);
    resetFormValues();
    setShowForm(true);
  };

  // Open form for editing entry
  const openEditForm = (type, index) => {
    setFormType(type);
    setFormMode('edit');
    setEditIndex(index);
    
    const entry = healthData[type][index];
    setDate(entry.date);
    
    if (type === 'weight') {
      setWeightValue(entry.value);
    } else if (type === 'heartRate') {
      setHeartRateValue(entry.value);
    } else if (type === 'bloodPressure') {
      setSystolicValue(entry.systolic);
      setDiastolicValue(entry.diastolic);
    } else if (type === 'sleep') {
      setSleepHours(entry.hours);
      setSleepQuality(entry.quality);
    }
    
    setShowForm(true);
  };

  // Reset form values
  const resetFormValues = () => {
    setWeightValue('');
    setHeartRateValue('');
    setSystolicValue('');
    setDiastolicValue('');
    setSleepHours('');
    setSleepQuality('Good');
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    resetFormValues();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newEntry;
    
    if (formType === 'weight') {
      newEntry = { date, value: parseFloat(weightValue) };
    } else if (formType === 'heartRate') {
      newEntry = { date, value: parseInt(heartRateValue) };
    } else if (formType === 'bloodPressure') {
      newEntry = { 
        date, 
        systolic: parseInt(systolicValue), 
        diastolic: parseInt(diastolicValue) 
      };
    } else if (formType === 'sleep') {
      newEntry = { 
        date, 
        hours: parseFloat(sleepHours), 
        quality: sleepQuality 
      };
    }
    
    if (formMode === 'add') {
      // Add new entry and sort by date
      const updatedData = [...healthData[formType], newEntry].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      setHealthData({
        ...healthData,
        [formType]: updatedData
      });
    } else if (formMode === 'edit') {
      // Update existing entry
      const updatedData = [...healthData[formType]];
      updatedData[editIndex] = newEntry;
      
      // Re-sort by date
      updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      setHealthData({
        ...healthData,
        [formType]: updatedData
      });
    }
    
    closeForm();
  };

  // Delete an entry
  const deleteEntry = (type, index) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedData = [...healthData[type]];
      updatedData.splice(index, 1);
      
      setHealthData({
        ...healthData,
        [type]: updatedData
      });
    }
  };

  // Filter data based on time range
  const getFilteredData = (type) => {
    const now = new Date();
    let cutoffDate;
    
    if (timeRange === 'week') {
      cutoffDate = new Date(now.setDate(now.getDate() - 7));
    } else if (timeRange === 'month') {
      cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
    } else if (timeRange === 'year') {
      cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
    }
    
    return healthData[type].filter(entry => new Date(entry.date) >= cutoffDate);
  };

  // Prepare chart data
  const prepareChartData = (type) => {
    const filteredData = getFilteredData(type);
    const labels = filteredData.map(entry => formatDate(entry.date));
    
    if (type === 'bloodPressure') {
      return {
        labels,
        datasets: [
          {
            label: 'Systolic',
            data: filteredData.map(entry => entry.systolic),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            tension: 0.3
          },
          {
            label: 'Diastolic',
            data: filteredData.map(entry => entry.diastolic),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3
          }
        ]
      };
    } else {
      const valueKey = type === 'sleep' ? 'hours' : 'value';
      const colorMap = {
        weight: { border: 'rgb(16, 185, 129)', background: 'rgba(16, 185, 129, 0.5)' },
        heartRate: { border: 'rgb(239, 68, 68)', background: 'rgba(239, 68, 68, 0.5)' },
        sleep: { border: 'rgb(139, 92, 246)', background: 'rgba(139, 92, 246, 0.5)' }
      };
      
      return {
        labels,
        datasets: [
          {
            label: type === 'weight' ? 'Weight (kg)' : 
                   type === 'heartRate' ? 'Heart Rate (bpm)' : 'Sleep (hours)',
            data: filteredData.map(entry => entry[valueKey]),
            borderColor: colorMap[type].border,
            backgroundColor: colorMap[type].background,
            tension: 0.3
          }
        ]
      };
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#D1D5DB' : '#4B5563'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(156, 163, 175, 0.1)' : 'rgba(209, 213, 219, 0.3)'
        }
      },
      y: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(156, 163, 175, 0.1)' : 'rgba(209, 213, 219, 0.3)'
        }
      }
    }
  };

  // Get trend indication (up, down, stable)
  const getTrend = (type) => {
    const data = getFilteredData(type);
    if (data.length < 2) return 'stable';
    
    let valueKey = 'value';
    if (type === 'sleep') valueKey = 'hours';
    if (type === 'bloodPressure') valueKey = 'systolic'; // Just using systolic for trend
    
    const latestValue = type === 'bloodPressure' ? 
      data[data.length - 1].systolic : 
      data[data.length - 1][valueKey];
    
    const previousValue = type === 'bloodPressure' ? 
      data[data.length - 2].systolic : 
      data[data.length - 2][valueKey];
    
    const difference = latestValue - previousValue;
    const percentChange = (difference / previousValue) * 100;
    
    if (Math.abs(percentChange) < 1) return 'stable';
    
    // For weight and blood pressure, lower is generally better
    // For heart rate, it depends on the context, but we'll assume stable is best
    // For sleep, more is generally better
    if (type === 'weight' || type === 'bloodPressure') {
      return difference < 0 ? 'down' : 'up';
    } else if (type === 'sleep') {
      return difference > 0 ? 'up' : 'down';
    } else {
      return 'stable';
    }
  };

  // Get health recommendations based on trends
  const getRecommendations = () => {
    const trends = {
      weight: getTrend('weight'),
      heartRate: getTrend('heartRate'),
      bloodPressure: getTrend('bloodPressure'),
      sleep: getTrend('sleep')
    };
    
    const recommendations = [];
    
    // Weight recommendations
    if (trends.weight === 'up') {
      recommendations.push({
        type: 'weight',
        text: 'Your weight is trending upward. Consider reviewing your diet and increasing physical activity.'
      });
    } else if (trends.weight === 'down') {
      recommendations.push({
        type: 'weight',
        text: 'Your weight is trending downward. If this is intentional, great job! If not, consider consulting a healthcare provider.'
      });
    } else {
      recommendations.push({
        type: 'weight',
        text: 'Your weight is stable. Maintain your current diet and exercise routine.'
      });
    }
    
    // Heart rate recommendations
    const latestHeartRate = healthData.heartRate.length > 0 ? 
      healthData.heartRate[healthData.heartRate.length - 1].value : 0;
    
    if (latestHeartRate > 90) {
      recommendations.push({
        type: 'heartRate',
        text: 'Your resting heart rate is elevated. Consider stress-reduction techniques and consult a healthcare provider if it remains high.'
      });
    } else if (latestHeartRate < 60) {
      recommendations.push({
        type: 'heartRate',
        text: 'Your resting heart rate is low. This may be normal for athletes, but consider consulting a healthcare provider if you experience symptoms.'
      });
    } else {
      recommendations.push({
        type: 'heartRate',
        text: 'Your heart rate is within a normal range. Continue with your current lifestyle habits.'
      });
    }
    
    // Blood pressure recommendations
    const latestBP = healthData.bloodPressure.length > 0 ? 
      healthData.bloodPressure[healthData.bloodPressure.length - 1] : { systolic: 0, diastolic: 0 };
    
    if (latestBP.systolic >= 140 || latestBP.diastolic >= 90) {
      recommendations.push({
        type: 'bloodPressure',
        text: 'Your blood pressure is elevated. Consider reducing sodium intake, increasing exercise, and consulting a healthcare provider.'
      });
    } else if (latestBP.systolic <= 90 || latestBP.diastolic <= 60) {
      recommendations.push({
        type: 'bloodPressure',
        text: 'Your blood pressure is low. This may be normal for some individuals, but consider consulting a healthcare provider if you experience symptoms.'
      });
    } else {
      recommendations.push({
        type: 'bloodPressure',
        text: 'Your blood pressure is within a normal range. Maintain your current lifestyle habits.'
      });
    }
    
    // Sleep recommendations
    const latestSleep = healthData.sleep.length > 0 ? 
      healthData.sleep[healthData.sleep.length - 1] : { hours: 0, quality: '' };
    
    if (latestSleep.hours < 7) {
      recommendations.push({
        type: 'sleep',
        text: 'You\'re getting less than the recommended 7-9 hours of sleep. Consider improving your sleep hygiene and establishing a consistent sleep schedule.'
      });
    } else if (latestSleep.quality === 'Poor') {
      recommendations.push({
        type: 'sleep',
        text: 'Your sleep quality is poor. Consider limiting screen time before bed, creating a comfortable sleep environment, and establishing a relaxing bedtime routine.'
      });
    } else {
      recommendations.push({
        type: 'sleep',
        text: 'Your sleep duration and quality are good. Continue with your current sleep habits.'
      });
    }
    
    return recommendations;
  };

  // Get trend icon
  const getTrendIcon = (trend, type) => {
    // For weight and blood pressure, down is good
    // For sleep, up is good
    // For heart rate, stable is good
    let isPositive;
    
    if (type === 'weight' || type === 'bloodPressure') {
      isPositive = trend === 'down';
    } else if (type === 'sleep') {
      isPositive = trend === 'up';
    } else {
      isPositive = trend === 'stable';
    }
    
    if (trend === 'up') {
      return <ArrowUp className={`h-5 w-5 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />;
    } else if (trend === 'down') {
      return <ArrowDown className={`h-5 w-5 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />;
    } else {
      return <div className="h-5 w-5 rounded-full bg-blue-500"></div>;
    }
  };

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Health Tracker Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor your health metrics over time, visualize trends, and get personalized recommendations
          to improve your overall well-being.
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Weight Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-900/30">
              <Scale className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            {healthData.weight.length > 0 && (
              <div className="flex items-center">
                {getTrendIcon(getTrend('weight'), 'weight')}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Weight</h3>
          {healthData.weight.length > 0 ? (
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {healthData.weight[healthData.weight.length - 1].value}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">kg</span>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No data yet</div>
          )}
          <button 
            className="mt-4 w-full btn btn-outline py-1 text-sm"
            onClick={() => openAddForm('weight')}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </button>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900/30">
              <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            {healthData.heartRate.length > 0 && (
              <div className="flex items-center">
                {getTrendIcon(getTrend('heartRate'), 'heartRate')}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Heart Rate</h3>
          {healthData.heartRate.length > 0 ? (
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {healthData.heartRate[healthData.heartRate.length - 1].value}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">bpm</span>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No data yet</div>
          )}
          <button 
            className="mt-4 w-full btn btn-outline py-1 text-sm"
            onClick={() => openAddForm('heartRate')}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </button>
        </div>

        {/* Blood Pressure Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            {healthData.bloodPressure.length > 0 && (
              <div className="flex items-center">
                {getTrendIcon(getTrend('bloodPressure'), 'bloodPressure')}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Blood Pressure</h3>
          {healthData.bloodPressure.length > 0 ? (
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {healthData.bloodPressure[healthData.bloodPressure.length - 1].systolic}/
                {healthData.bloodPressure[healthData.bloodPressure.length - 1].diastolic}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">mmHg</span>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No data yet</div>
          )}
          <button 
            className="mt-4 w-full btn btn-outline py-1 text-sm"
            onClick={() => openAddForm('bloodPressure')}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </button>
        </div>

        {/* Sleep Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            {healthData.sleep.length > 0 && (
              <div className="flex items-center">
                {getTrendIcon(getTrend('sleep'), 'sleep')}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Sleep</h3>
          {healthData.sleep.length > 0 ? (
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {healthData.sleep[healthData.sleep.length - 1].hours}
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">hours</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Quality: {healthData.sleep[healthData.sleep.length - 1].quality}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No data yet</div>
          )}
          <button 
            className="mt-4 w-full btn btn-outline py-1 text-sm"
            onClick={() => openAddForm('sleep')}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Recommendations</h2>
        </div>
        
        <div className="space-y-4">
          {getRecommendations().map((rec, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
            >
              <div className="flex">
                {rec.type === 'weight' && <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />}
                {rec.type === 'heartRate' && <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />}
                {rec.type === 'bloodPressure' && <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />}
                {rec.type === 'sleep' && <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />}
                <p className="text-gray-700 dark:text-gray-300">{rec.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Trends</h2>
          </div>
          
          <div className="flex space-x-2">
            <select
              className="form-select text-sm py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Chart tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'weight' 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('weight')}
            >
              Weight
            </button>
            <button
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'heartRate' 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('heartRate')}
            >
              Heart Rate
            </button>
            <button
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'bloodPressure' 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('bloodPressure')}
            >
              Blood Pressure
            </button>
            <button
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'sleep' 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('sleep')}
            >
              Sleep
            </button>
          </nav>
        </div>

        {/* Chart */}
        <div className="h-80">
          {getFilteredData(activeTab).length > 0 ? (
            <Line 
              data={prepareChartData(activeTab)} 
              options={chartOptions} 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <LineChartIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">No data available for the selected time range</p>
              <button 
                className="btn btn-primary text-sm py-1"
                onClick={() => openAddForm(activeTab)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Data
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Log Entries Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Log Entries</h2>
            <select
              className="form-select text-sm py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="weight">Weight</option>
              <option value="heartRate">Heart Rate</option>
              <option value="bloodPressure">Blood Pressure</option>
              <option value="sleep">Sleep</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                {activeTab === 'weight' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Weight (kg)
                  </th>
                )}
                {activeTab === 'heartRate' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Heart Rate (bpm)
                  </th>
                )}
                {activeTab === 'bloodPressure' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Systolic (mmHg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Diastolic (mmHg)
                    </th>
                  </>
                )}
                {activeTab === 'sleep' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quality
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {healthData[activeTab].length > 0 ? (
                [...healthData[activeTab]].reverse().slice(0, 10).map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(entry.date)}
                    </td>
                    {activeTab === 'weight' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {entry.value}
                      </td>
                    )}
                    {activeTab === 'heartRate' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {entry.value}
                      </td>
                    )}
                    {activeTab === 'bloodPressure' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {entry.systolic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {entry.diastolic}
                        </td>
                      </>
                    )}
                    {activeTab === 'sleep' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {entry.hours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            entry.quality === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            entry.quality === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            entry.quality === 'Fair' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {entry.quality}
                          </span>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                        onClick={() => openEditForm(activeTab, healthData[activeTab].length - 1 - index)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        onClick={() => deleteEntry(activeTab, healthData[activeTab].length - 1 - index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={activeTab === 'bloodPressure' || activeTab === 'sleep' ? 4 : 3} 
                    className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No entries found. Click "Add Entry" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-90 transition-opacity" 
              aria-hidden="true"
              onClick={closeForm}
            ></div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-700 rounded-full p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  onClick={closeForm}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-6 pt-5 pb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white" id="modal-title">
                  {formMode === 'add' ? 'Add New' : 'Edit'} {
                    formType === 'weight' ? 'Weight' :
                    formType === 'heartRate' ? 'Heart Rate' :
                    formType === 'bloodPressure' ? 'Blood Pressure' : 'Sleep'
                  } Entry
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  {formType === 'weight' && (
                    <div>
                      <label htmlFor="weight" className="form-label">Weight (kg)</label>
                      <input
                        type="number"
                        id="weight"
                        className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                        step="0.1"
                        min="0"
                        required
                      />
                    </div>
                  )}
                  
                  {formType === 'heartRate' && (
                    <div>
                      <label htmlFor="heartRate" className="form-label">Heart Rate (bpm)</label>
                      <input
                        type="number"
                        id="heartRate"
                        className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={heartRateValue}
                        onChange={(e) => setHeartRateValue(e.target.value)}
                        step="1"
                        min="0"
                        required
                      />
                    </div>
                  )}
                  
                  {formType === 'bloodPressure' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="systolic" className="form-label">Systolic (mmHg)</label>
                        <input
                          type="number"
                          id="systolic"
                          className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={systolicValue}
                          onChange={(e) => setSystolicValue(e.target.value)}
                          step="1"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="diastolic" className="form-label">Diastolic (mmHg)</label>
                        <input
                          type="number"
                          id="diastolic"
                          className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={diastolicValue}
                          onChange={(e) => setDiastolicValue(e.target.value)}
                          step="1"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {formType === 'sleep' && (
                    <>
                      <div>
                        <label htmlFor="sleepHours" className="form-label">Sleep Duration (hours)</label>
                        <input
                          type="number"
                          id="sleepHours"
                          className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={sleepHours}
                          onChange={(e) => setSleepHours(e.target.value)}
                          step="0.1"
                          min="0"
                          max="24"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="sleepQuality" className="form-label">Sleep Quality</label>
                        <select
                          id="sleepQuality"
                          className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={sleepQuality}
                          onChange={(e) => setSleepQuality(e.target.value)}
                          required
                        >
                          <option value="Excellent">Excellent</option>
                          <option value="Good">Good</option>
                          <option value="Fair">Fair</option>
                          <option value="Poor">Poor</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={closeForm}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {formMode === 'add' ? 'Add Entry' : 'Update Entry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTracker;