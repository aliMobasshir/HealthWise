import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronRight, Search, ArrowRight, Clipboard, Activity } from 'lucide-react';

// Sample symptoms data
const symptomsData = [
  { id: 1, name: 'Fever', category: 'General' },
  { id: 2, name: 'Headache', category: 'Neurological' },
  { id: 3, name: 'Cough', category: 'Respiratory' },
  { id: 4, name: 'Sore Throat', category: 'Respiratory' },
  { id: 5, name: 'Fatigue', category: 'General' },
  { id: 6, name: 'Runny Nose', category: 'Respiratory' },
  { id: 7, name: 'Body Aches', category: 'Musculoskeletal' },
  { id: 8, name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 9, name: 'Nausea', category: 'Digestive' },
  { id: 10, name: 'Vomiting', category: 'Digestive' },
  { id: 11, name: 'Diarrhea', category: 'Digestive' },
  { id: 12, name: 'Chest Pain', category: 'Cardiovascular' },
  { id: 13, name: 'Abdominal Pain', category: 'Digestive' },
  { id: 14, name: 'Dizziness', category: 'Neurological' },
  { id: 15, name: 'Rash', category: 'Dermatological' },
  { id: 16, name: 'Chills', category: 'General' },
  { id: 17, name: 'Loss of Appetite', category: 'Digestive' },
  { id: 18, name: 'Joint Pain', category: 'Musculoskeletal' },
  { id: 19, name: 'Loss of Taste', category: 'Neurological' },
  { id: 20, name: 'Loss of Smell', category: 'Neurological' },
  { id: 21, name: 'Swollen Lymph Nodes', category: 'General' },
  { id: 22, name: 'Wheezing', category: 'Respiratory' },
  { id: 23, name: 'Heart Palpitations', category: 'Cardiovascular' },
  { id: 24, name: 'Itching', category: 'Dermatological' },
  { id: 25, name: 'Night Sweats', category: 'General' },
  { id: 26, name: 'Muscle Weakness', category: 'Musculoskeletal' },
  { id: 27, name: 'Confusion', category: 'Neurological' },
  { id: 28, name: 'Difficulty Swallowing', category: 'Digestive' },
  { id: 29, name: 'Blurry Vision', category: 'Neurological' },
  { id: 30, name: 'Hives', category: 'Dermatological' },
  { id: 31, name: 'Swelling in Legs', category: 'Cardiovascular' },
  { id: 32, name: 'Frequent Urination', category: 'Urinary' },
  { id: 33, name: 'Blood in Urine', category: 'Urinary' },
  { id: 34, name: 'Tremors', category: 'Neurological' },
  { id: 35, name: 'Weight Loss', category: 'General' },
];

// Sample conditions with symptoms and next steps
 const conditionsData = [
      {
        id: 1,
        name: 'Common Cold',
        symptoms: [3, 4, 5, 6],
        probability: (symptoms) => {
          const matches = [3, 4, 5, 6].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.8 : matches >= 2 ? 0.5 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild',
        description: 'A viral infection of the upper respiratory tract that causes inflammation in the nose and throat.',
        nextSteps: [
          'Rest and stay hydrated',
          'Take over-the-counter cold medications if needed',
          'Use a humidifier to relieve congestion',
          'Consult a doctor if symptoms persist for more than 10 days'
        ]
      },
      {
        id: 2,
        name: 'Influenza (Flu)',
        symptoms: [1, 2, 3, 5, 7, 16],
        probability: (symptoms) => {
          const matches = [1, 2, 3, 5, 7, 16].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.85 : matches >= 3 ? 0.6 : matches >= 2 ? 0.4 : 0;
        },
        severity: 'Moderate',
        description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.',
        nextSteps: [
          'Rest and stay hydrated',
          'Take fever-reducing medications like acetaminophen or ibuprofen',
          'Consider antiviral medications (must be started within 48 hours of symptoms)',
          'Consult a doctor if symptoms are severe or you\'re at high risk for complications',
          'Get tested for influenza to confirm diagnosis'
        ]
      },
      {
        id: 3,
        name: 'COVID-19',
        symptoms: [1, 3, 5, 8, 19, 20],
        probability: (symptoms) => {
          const matches = [1, 3, 5, 8, 19, 20].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.7 : matches >= 3 ? 0.5 : matches >= 2 ? 0.3 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'A respiratory illness caused by the SARS-CoV-2 virus that can range from mild to severe and may affect multiple organ systems.',
        nextSteps: [
          'Get tested for COVID-19',
          'Self-isolate to prevent spreading the virus',
          'Monitor your oxygen levels with a pulse oximeter if available',
          'Seek immediate medical attention if you experience severe symptoms',
          'Follow public health guidelines for isolation duration'
        ]
      },
      {
        id: 4,
        name: 'Gastroenteritis',
        symptoms: [9, 10, 11, 13],
        probability: (symptoms) => {
          const matches = [9, 10, 11, 13].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.9 : matches >= 2 ? 0.6 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild to Moderate',
        description: 'An intestinal infection marked by diarrhea, abdominal cramps, nausea or vomiting, and sometimes fever.',
        nextSteps: [
          'Stay hydrated with clear fluids like water, clear broths, or oral rehydration solutions',
          'Avoid dairy, caffeine, alcohol, and fatty or highly seasoned foods',
          'Gradually reintroduce bland foods like toast, rice, and bananas',
          'Seek medical attention if unable to keep fluids down or if symptoms persist more than 3 days'
        ]
      },
      {
        id: 5,
        name: 'Migraine',
        symptoms: [2, 9, 14],
        probability: (symptoms) => {
          const matches = [2, 9, 14].filter(id => symptoms.includes(id)).length;
          return matches >= 2 ? 0.75 : matches >= 1 ? 0.4 : 0;
        },
        severity: 'Moderate',
        description: 'A neurological condition that causes severe, debilitating headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.',
        nextSteps: [
          'Rest in a quiet, dark room',
          'Apply cold or warm compresses to your head or neck',
          'Take pain relievers as recommended by your doctor',
          'Consider preventive medications if migraines are frequent',
          'Keep a headache diary to identify triggers'
        ]
      },
      {
        id: 6,
        name: 'Pneumonia',
        symptoms: [1, 3, 8, 12, 16],
        probability: (symptoms) => {
          const matches = [1, 3, 8, 12, 16].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.8 : matches >= 3 ? 0.6 : matches >= 2 ? 0.4 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'An infection that inflames the air sacs in one or both lungs, caused by bacteria, viruses, or fungi, leading to cough, fever, and difficulty breathing.',
        nextSteps: [
          'Seek medical attention for a diagnosis (e.g., chest X-ray, sputum test)',
          'Take prescribed antibiotics or antiviral medications as directed',
          'Rest and stay hydrated',
          'Use a humidifier to ease breathing',
          'Monitor for worsening symptoms like severe shortness of breath'
        ]
      },
      {
        id: 7,
        name: 'Urinary Tract Infection (UTI)',
        symptoms: [32, 33, 13, 1],
        probability: (symptoms) => {
          const matches = [32, 33, 13, 1].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.85 : matches >= 2 ? 0.6 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild to Moderate',
        description: 'An infection in any part of the urinary system, often caused by bacteria, leading to pain, frequent urination, and sometimes blood in the urine.',
        nextSteps: [
          'Consult a doctor for a urine test and diagnosis',
          'Take prescribed antibiotics as directed',
          'Drink plenty of water to flush out bacteria',
          'Avoid irritants like caffeine and alcohol',
          'Seek urgent care if fever or back pain worsens'
        ]
      },
      {
        id: 8,
        name: 'Allergic Reaction',
        symptoms: [15, 24, 30, 8],
        probability: (symptoms) => {
          const matches = [15, 24, 30, 8].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.8 : matches >= 2 ? 0.5 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild to Severe',
        description: 'An immune system response to a substance (allergen) causing symptoms like rash, itching, hives, or in severe cases, difficulty breathing.',
        nextSteps: [
          'Identify and avoid the allergen if possible',
          'Take antihistamines for mild symptoms as recommended',
          'Use an epinephrine auto-injector if prescribed for severe reactions',
          'Seek emergency care for breathing difficulty or swelling',
          'Consult an allergist for testing and long-term management'
        ]
      },
      {
        id: 9,
        name: 'Hypertension (High Blood Pressure)',
        symptoms: [2, 14, 12, 29],
        probability: (symptoms) => {
          const matches = [2, 14, 12, 29].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.7 : matches >= 2 ? 0.5 : matches >= 1 ? 0.2 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'A condition where blood pressure is consistently elevated, often asymptomatic but may cause headaches, dizziness, or chest pain if severe.',
        nextSteps: [
          'Monitor blood pressure regularly with a home device',
          'Consult a doctor for diagnosis and management',
          'Reduce salt intake and eat a balanced diet',
          'Exercise regularly and manage stress',
          'Take prescribed medications as directed'
        ]
      },
      {
        id: 10,
        name: 'Arthritis',
        symptoms: [18, 7, 26, 1],
        probability: (symptoms) => {
          const matches = [18, 7, 26, 1].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.75 : matches >= 2 ? 0.5 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild to Moderate',
        description: 'Inflammation of the joints causing pain, stiffness, and sometimes swelling, often worsening with age or activity.',
        nextSteps: [
          'Consult a doctor for diagnosis (e.g., blood tests, imaging)',
          'Take pain relievers or anti-inflammatory drugs as prescribed',
          'Engage in low-impact exercise like swimming or walking',
          'Apply heat or cold packs to affected joints',
          'Consider physical therapy for long-term management'
        ]
      },
      {
        id: 11,
        name: 'Strep Throat',
        symptoms: [4, 1, 21, 28],
        probability: (symptoms) => {
          const matches = [4, 1, 21, 28].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.85 : matches >= 2 ? 0.6 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Mild to Moderate',
        description: 'A bacterial infection caused by Streptococcus, leading to a sore throat, fever, and swollen lymph nodes, often painful when swallowing.',
        nextSteps: [
          'Consult a doctor for a throat swab and diagnosis',
          'Take prescribed antibiotics to treat the infection',
          'Gargle with warm salt water for relief',
          'Stay hydrated and rest',
          'Seek care if fever persists or breathing becomes difficult'
        ]
      },
      {
        id: 12,
        name: 'Asthma',
        symptoms: [8, 22, 3, 5],
        probability: (symptoms) => {
          const matches = [8, 22, 3, 5].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.8 : matches >= 2 ? 0.5 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'A chronic condition where airways narrow and swell, causing wheezing, shortness of breath, and coughing, often triggered by allergens or exercise.',
        nextSteps: [
          'Use a prescribed inhaler (e.g., bronchodilator) as directed',
          'Avoid triggers like dust, pollen, or smoke',
          'Consult a doctor for a management plan',
          'Monitor breathing with a peak flow meter if recommended',
          'Seek emergency care for severe attacks'
        ]
      },
      {
        id: 13,
        name: 'Diabetes (Type 2)',
        symptoms: [32, 35, 5, 17],
        probability: (symptoms) => {
          const matches = [32, 35, 5, 17].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.7 : matches >= 2 ? 0.5 : matches >= 1 ? 0.2 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'A chronic condition where blood sugar levels are elevated due to insulin resistance, leading to frequent urination, weight loss, and fatigue.',
        nextSteps: [
          'Consult a doctor for blood sugar testing (e.g., A1C, glucose)',
          'Monitor blood sugar levels regularly',
          'Follow a balanced diet low in refined sugars',
          'Exercise regularly to improve insulin sensitivity',
          'Take prescribed medications as directed'
        ]
      },
      {
        id: 14,
        name: 'Appendicitis',
        symptoms: [13, 9, 1, 17],
        probability: (symptoms) => {
          const matches = [13, 9, 1, 17].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.9 : matches >= 2 ? 0.6 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Severe',
        description: 'Inflammation of the appendix, often causing sharp abdominal pain, nausea, fever, and loss of appetite, requiring urgent attention.',
        nextSteps: [
          'Seek immediate medical attention',
          'Avoid eating or drinking until evaluated',
          'Prepare for possible imaging (e.g., ultrasound, CT scan)',
          'Surgery (appendectomy) may be needed if confirmed',
          'Monitor for worsening pain or fever'
        ]
      },
      {
        id: 15,
        name: 'Lyme Disease',
        symptoms: [15, 1, 18, 5, 25],
        probability: (symptoms) => {
          const matches = [15, 1, 18, 5, 25].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.8 : matches >= 3 ? 0.6 : matches >= 2 ? 0.4 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'A bacterial infection from tick bites, often starting with a bullseye rash, fever, joint pain, and fatigue, potentially affecting the heart or nerves.',
        nextSteps: [
          'Consult a doctor for blood tests and diagnosis',
          'Take prescribed antibiotics as directed',
          'Check for tick bites if you’ve been in wooded areas',
          'Rest and monitor for neurological or heart symptoms',
          'Seek care if symptoms persist or worsen'
        ]
      },
      {
        id: 16,
        name: 'Meningitis',
        symptoms: [1, 2, 14, 27, 18],
        probability: (symptoms) => {
          const matches = [1, 2, 14, 27, 18].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.9 : matches >= 3 ? 0.6 : matches >= 2 ? 0.4 : 0;
        },
        severity: 'Severe',
        description: 'Inflammation of the membranes around the brain and spinal cord, often from infection, causing fever, headache, confusion, and neck stiffness.',
        nextSteps: [
          'Seek emergency medical care immediately',
          'Prepare for tests like a lumbar puncture or imaging',
          'Take prescribed antibiotics or antivirals as directed',
          'Rest and avoid spreading infection to others',
          'Monitor for worsening confusion or seizures'
        ]
      },
      {
        id: 17,
        name: 'Heart Attack',
        symptoms: [12, 8, 23, 9, 5],
        probability: (symptoms) => {
          const matches = [12, 8, 23, 9, 5].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.95 : matches >= 3 ? 0.7 : matches >= 2 ? 0.4 : 0;
        },
        severity: 'Severe',
        description: 'A life-threatening condition where blood flow to the heart is blocked, causing chest pain, shortness of breath, and potential heart damage.',
        nextSteps: [
          'Call emergency services immediately',
          'Chew aspirin if advised and not allergic',
          'Remain calm and rest while awaiting help',
          'Avoid eating or drinking until evaluated',
          'Seek follow-up care for heart health'
        ]
      },
      {
        id: 18,
        name: 'Chronic Fatigue Syndrome',
        symptoms: [5, 18, 26, 2, 14],
        probability: (symptoms) => {
          const matches = [5, 18, 26, 2, 14].filter(id => symptoms.includes(id)).length;
          return matches >= 4 ? 0.7 : matches >= 3 ? 0.5 : matches >= 2 ? 0.3 : 0;
        },
        severity: 'Moderate',
        description: 'A complex disorder causing extreme fatigue, joint pain, and muscle weakness, often worsened by activity and not relieved by rest.',
        nextSteps: [
          'Consult a doctor for diagnosis (no specific test exists)',
          'Pace activities to avoid overexertion',
          'Consider cognitive behavioral therapy or graded exercise',
          'Manage sleep with a consistent routine',
          'Seek specialist care for long-term management'
        ]
      },
      {
        id: 19,
        name: 'Eczema',
        symptoms: [15, 24, 30],
        probability: (symptoms) => {
          const matches = [15, 24, 30].filter(id => symptoms.includes(id)).length;
          return matches >= 2 ? 0.8 : matches >= 1 ? 0.4 : 0;
        },
        severity: 'Mild to Moderate',
        description: 'A chronic skin condition causing red, itchy rashes and sometimes hives, often triggered by allergens, stress, or irritants.',
        nextSteps: [
          'Moisturize skin regularly with fragrance-free products',
          'Avoid triggers like harsh soaps or allergens',
          'Use prescribed topical steroids or creams',
          'Consult a dermatologist for severe cases',
          'Bathe in lukewarm water and pat dry'
        ]
      },
      {
        id: 20,
        name: 'Kidney Stones',
        symptoms: [13, 33, 9, 32],
        probability: (symptoms) => {
          const matches = [13, 33, 9, 32].filter(id => symptoms.includes(id)).length;
          return matches >= 3 ? 0.9 : matches >= 2 ? 0.6 : matches >= 1 ? 0.3 : 0;
        },
        severity: 'Moderate to Severe',
        description: 'Hard deposits in the kidneys causing severe abdominal pain, blood in urine, nausea, and frequent urination as they pass.',
        nextSteps: [
          'Seek medical attention for diagnosis (e.g., imaging, urine test)',
          'Drink plenty of water to help pass small stones',
          'Take pain relievers as prescribed',
          'Consult a doctor for procedures if stones are large',
          'Adjust diet to reduce stone-forming foods'
        ]
      },
    ];

const SymptomsChecker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState(symptomsData);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Filter symptoms based on search term
  useEffect(() => {
    const filtered = symptomsData.filter(
      symptom => 
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedSymptoms.includes(symptom.id)
    );
    setFilteredSymptoms(filtered);
  }, [searchTerm, selectedSymptoms]);

  // Add symptom to selected list
  const addSymptom = (symptomId) => {
    if (!selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      setSearchTerm('');
    }
  };

  // Remove symptom from selected list
  const removeSymptom = (symptomId) => {
    setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
  };

  // Get symptom name by ID
  const getSymptomName = (id) => {
    const symptom = symptomsData.find(s => s.id === id);
    return symptom ? symptom.name : '';
  };

  // Check symptoms and generate results
  const checkSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    const possibleConditions = conditionsData
      .map(condition => {
        const probability = condition.probability(selectedSymptoms);
        return {
          ...condition,
          calculatedProbability: probability
        };
      })
      .filter(condition => condition.calculatedProbability > 0)
      .sort((a, b) => b.calculatedProbability - a.calculatedProbability);

    setResults(possibleConditions);
    setShowResults(true);
    setCurrentStep(2);
  };

  // Reset the checker
  const resetChecker = () => {
    setSelectedSymptoms([]);
    setSearchTerm('');
    setResults([]);
    setShowResults(false);
    setCurrentStep(1);
  };

  // Format probability as percentage
  const formatProbability = (probability) => {
    return `${Math.round(probability * 100)}%`;
  };

  // Get color class based on probability
  const getProbabilityColorClass = (probability) => {
    if (probability >= 0.7) return 'text-red-600 dark:text-red-400';
    if (probability >= 0.4) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  // Get badge color based on severity
  const getSeverityBadgeClass = (severity) => {
    if (severity.includes('Severe')) return 'badge-red';
    if (severity.includes('Moderate')) return 'badge-yellow';
    return 'badge-green';
  };

  return (
    <div className="max-w-4xl mx-auto page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Symptoms Checker</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Select your symptoms to get information about possible conditions and recommended next steps.
          Remember, this tool is for informational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>

      {/* Warning notice */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-8 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> This symptom checker provides general information only and should not be used for diagnosis or treatment. 
              Always consult with a qualified healthcare provider for medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'}`}>
            1
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep === 1 ? 'bg-gray-300 dark:bg-gray-700' : 'bg-blue-600'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'}`}>
            2
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Select Symptoms</span>
          <span>View Results</span>
        </div>
      </div>

      {/* Step 1: Symptom Selection */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Your Symptoms</h2>
          
          {/* Search input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Search for symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Search results */}
          {searchTerm && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Results:</h3>
              <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md">
                {filteredSymptoms.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredSymptoms.map(symptom => (
                      <li 
                        key={symptom.id} 
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                        onClick={() => addSymptom(symptom.id)}
                      >
                        <div>
                          <span className="text-gray-800 dark:text-gray-200">{symptom.name}</span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{symptom.category}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-gray-500 dark:text-gray-400">No symptoms found</div>
                )}
              </div>
            </div>
          )}

          {/* Selected symptoms */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Symptoms:</h3>
            {selectedSymptoms.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSymptoms.map(id => (
                  <div 
                    key={id}
                    className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {getSymptomName(id)}
                    <button 
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      onClick={() => removeSymptom(id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-6">No symptoms selected yet</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end">
            <button 
              className="btn btn-primary flex items-center"
              onClick={checkSymptoms}
              disabled={selectedSymptoms.length === 0}
            >
              Check Symptoms <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Results */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Possible Conditions</h2>
              <button 
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                onClick={resetChecker}
              >
                <Clipboard className="h-4 w-4 mr-1" /> Start Over
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(id => (
                  <div 
                    key={id}
                    className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {getSymptomName(id)}
                  </div>
                ))}
              </div>
            </div>

            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map(condition => (
                  <div 
                    key={condition.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h3 className="font-medium text-gray-900 dark:text-white">{condition.name}</h3>
                        <span className={`ml-3 ${getSeverityBadgeClass(condition.severity)} badge`}>
                          {condition.severity}
                        </span>
                      </div>
                      <div className={`font-bold ${getProbabilityColorClass(condition.calculatedProbability)}`}>
                        {formatProbability(condition.calculatedProbability)} match
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{condition.description}</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Common Symptoms:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {condition.symptoms.map(id => (
                          <div 
                            key={id}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedSymptoms.includes(id) 
                                ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}
                          >
                            {getSymptomName(id)}
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Next Steps:</h4>
                      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                        {condition.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Matching Conditions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We couldn't find any conditions that match your symptoms. Please add more symptoms or consult with a healthcare provider.
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Important Disclaimer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This symptom checker is intended for informational purposes only and does not provide medical advice, diagnosis, or treatment.
              The results are based on the symptoms you provided and may not be comprehensive or accurate for your specific situation.
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomsChecker;