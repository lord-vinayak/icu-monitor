export const VITAL_RANGES = {
  heartRate: { 
    normal: [60, 100], 
    warning: [50, 110], 
    critical: [40, 130] 
  },
  systolic: { 
    normal: [90, 120], 
    warning: [80, 140], 
    critical: [70, 160] 
  },
  diastolic: { 
    normal: [60, 80], 
    warning: [50, 90], 
    critical: [40, 100] 
  },
  temp: { 
    normal: [36.5, 37.5], 
    warning: [36, 38], 
    critical: [35, 39] 
  },
  respirate: { 
    normal: [12, 20], 
    warning: [10, 24], 
    critical: [8, 28] 
  },
  spO2: { 
    normal: [95, 100], 
    warning: [90, 95], 
    critical: [0, 90] 
  },
  etco2: { 
    normal: [35, 45], 
    warning: [30, 50], 
    critical: [25, 55] 
  },
};

const generateTrendData = (baseValue: number, variance: number, points: number = 30) => {
  const data = [];
  let value = baseValue;
  
  for (let i = 0; i < points; i++) {
    value = value + (Math.random() - 0.5) * variance;
    data.push({
      name: `${i}`,
      value: Number(value.toFixed(1)),
    });
  }
  
  return data;
};

const generateBPTrendData = (systolic: number, diastolic: number, points: number = 30) => {
  const data = [];
  let sysValue = systolic;
  let diaValue = diastolic;
  
  for (let i = 0; i < points; i++) {
    sysValue = sysValue + (Math.random() - 0.5) * 10;
    diaValue = diaValue + (Math.random() - 0.5) * 8;
    data.push({
      name: `${i}`,
      systolic: Number(sysValue.toFixed(0)),
      diastolic: Number(diaValue.toFixed(0)),
    });
  }
  
  return data;
};

export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  location: 'ICU' | 'Wards';
  room: string;
  vitals: {
    heartRate: number;
    bp: { systolic: number; diastolic: number };
    temp: number;
    respirate: number;
    spO2: number;
    etco2: number;
  };
  history: {
    medical: string;
    physician: string;
  };
  trends: {
    heartRate: Array<{ name: string; value: number }>;
    bp: Array<{ name: string; systolic: number; diastolic: number }>;
    temp: Array<{ name: string; value: number }>;
    spO2: Array<{ name: string; value: number }>;
    respirate: Array<{ name: string; value: number }>;
    etco2: Array<{ name: string; value: number }>;
  };
}

export const initialPatients: Patient[] = [
  {
    id: 1,
    name: "J. Sonib",
    age: 41,
    condition: "Attending Diagnosis",
    location: "ICU",
    room: "RM 101",
    vitals: {
      heartRate: 98,
      bp: { systolic: 95, diastolic: 60 },
      temp: 38.2,
      respirate: 24,
      spO2: 89,
      etco2: 35,
    },
    history: {
      medical: "Augmenting nemo dedit eos haet est etchid solicitans pescodic sanit, donvalent. Thessa amnialiores sent loke mod sed a do ned essons ticarie et promod mire a ad oien noot.",
      physician: "Excessa er oration ero sit fluss time o vetericula parcelant mod e sit bounct netliceat final one posnos. Apuna nunselliems care ollem atecity doras tam met presont ad toe oct pont tract herntimd airee pretallent.",
    },
    trends: {
      heartRate: generateTrendData(98, 8),
      bp: generateBPTrendData(95, 60),
      temp: generateTrendData(38.2, 0.5),
      spO2: generateTrendData(89, 3),
      respirate: generateTrendData(24, 3),
      etco2: generateTrendData(35, 3),
    },
  },
  {
    id: 2,
    name: "A. Patel",
    age: 55,
    condition: "Hypertension Trend",
    location: "ICU",
    room: "RM 102",
    vitals: {
      heartRate: 75,
      bp: { systolic: 155, diastolic: 95 },
      temp: 37.1,
      respirate: 18,
      spO2: 96,
      etco2: 40,
    },
    history: {
      medical: "Patient has a history of chronic hypertension managed with medication. Recent blood pressure readings have shown an upward trend requiring close monitoring.",
      physician: "Increase antihypertensive medication. Monitor blood pressure every 2 hours. Restrict sodium intake. Consider cardiology consult if BP remains elevated.",
    },
    trends: {
      heartRate: generateTrendData(75, 5),
      bp: generateBPTrendData(155, 95),
      temp: generateTrendData(37.1, 0.3),
      spO2: generateTrendData(96, 2),
      respirate: generateTrendData(18, 2),
      etco2: generateTrendData(40, 2),
    },
  },
  {
    id: 3,
    name: "M. Johnson",
    age: 68,
    condition: "Post-Operative Recovery",
    location: "ICU",
    room: "RM 103",
    vitals: {
      heartRate: 82,
      bp: { systolic: 118, diastolic: 72 },
      temp: 37.4,
      respirate: 16,
      spO2: 98,
      etco2: 38,
    },
    history: {
      medical: "Status post cardiac surgery. Patient recovering well with stable vital signs. No immediate complications noted.",
      physician: "Continue current medication regimen. Monitor cardiac function. Encourage early mobilization when cleared by PT.",
    },
    trends: {
      heartRate: generateTrendData(82, 6),
      bp: generateBPTrendData(118, 72),
      temp: generateTrendData(37.4, 0.4),
      spO2: generateTrendData(98, 1),
      respirate: generateTrendData(16, 2),
      etco2: generateTrendData(38, 2),
    },
  },
  {
    id: 4,
    name: "S. Rodriguez",
    age: 34,
    condition: "Sepsis Protocol",
    location: "ICU",
    room: "RM 104",
    vitals: {
      heartRate: 115,
      bp: { systolic: 88, diastolic: 55 },
      temp: 38.9,
      respirate: 26,
      spO2: 92,
      etco2: 42,
    },
    history: {
      medical: "Admitted with severe sepsis secondary to pneumonia. Currently on broad-spectrum antibiotics and vasopressor support.",
      physician: "Continue sepsis bundle. Fluid resuscitation as needed. Monitor lactate levels. Daily infectious disease consult.",
    },
    trends: {
      heartRate: generateTrendData(115, 10),
      bp: generateBPTrendData(88, 55),
      temp: generateTrendData(38.9, 0.6),
      spO2: generateTrendData(92, 3),
      respirate: generateTrendData(26, 3),
      etco2: generateTrendData(42, 3),
    },
  },
  {
    id: 5,
    name: "K. Chen",
    age: 72,
    condition: "COPD Exacerbation",
    location: "ICU",
    room: "RM 105",
    vitals: {
      heartRate: 88,
      bp: { systolic: 132, diastolic: 78 },
      temp: 37.2,
      respirate: 28,
      spO2: 91,
      etco2: 48,
    },
    history: {
      medical: "Long-standing COPD with acute exacerbation. On BiPAP support. Respiratory status improving slowly.",
      physician: "Continue BiPAP. Bronchodilators and steroids as ordered. Monitor ABGs closely. Pulmonology following.",
    },
    trends: {
      heartRate: generateTrendData(88, 7),
      bp: generateBPTrendData(132, 78),
      temp: generateTrendData(37.2, 0.3),
      spO2: generateTrendData(91, 2),
      respirate: generateTrendData(28, 4),
      etco2: generateTrendData(48, 3),
    },
  },
  {
    id: 6,
    name: "T. Williams",
    age: 45,
    condition: "Stable Condition",
    location: "Wards",
    room: "RM 201",
    vitals: {
      heartRate: 72,
      bp: { systolic: 115, diastolic: 75 },
      temp: 36.8,
      respirate: 14,
      spO2: 98,
      etco2: 38,
    },
    history: {
      medical: "Recovering from minor surgical procedure. All vitals within normal limits. Expected discharge within 24-48 hours.",
      physician: "Continue observation. Pain management as needed. Ambulate with assistance. Diet as tolerated.",
    },
    trends: {
      heartRate: generateTrendData(72, 4),
      bp: generateBPTrendData(115, 75),
      temp: generateTrendData(36.8, 0.2),
      spO2: generateTrendData(98, 1),
      respirate: generateTrendData(14, 1),
      etco2: generateTrendData(38, 1),
    },
  },
  {
    id: 7,
    name: "L. Martinez",
    age: 29,
    condition: "Observation",
    location: "Wards",
    room: "RM 202",
    vitals: {
      heartRate: 68,
      bp: { systolic: 108, diastolic: 68 },
      temp: 37.0,
      respirate: 16,
      spO2: 99,
      etco2: 37,
    },
    history: {
      medical: "Under observation following allergic reaction. Symptoms resolved. Awaiting final clearance.",
      physician: "Monitor for 24 hours. Antihistamines as needed. Discharge planning in progress.",
    },
    trends: {
      heartRate: generateTrendData(68, 3),
      bp: generateBPTrendData(108, 68),
      temp: generateTrendData(37.0, 0.2),
      spO2: generateTrendData(99, 0.5),
      respirate: generateTrendData(16, 1),
      etco2: generateTrendData(37, 1),
    },
  },
  {
    id: 8,
    name: "R. Brown",
    age: 61,
    condition: "Diabetes Management",
    location: "Wards",
    room: "RM 203",
    vitals: {
      heartRate: 76,
      bp: { systolic: 125, diastolic: 80 },
      temp: 36.9,
      respirate: 15,
      spO2: 97,
      etco2: 39,
    },
    history: {
      medical: "Type 2 diabetes with recent hyperglycemic episode. Blood sugar levels stabilizing with insulin adjustment.",
      physician: "Continue glucose monitoring q4h. Adjust insulin sliding scale. Dietary consult. Endocrinology following.",
    },
    trends: {
      heartRate: generateTrendData(76, 4),
      bp: generateBPTrendData(125, 80),
      temp: generateTrendData(36.9, 0.2),
      spO2: generateTrendData(97, 1),
      respirate: generateTrendData(15, 1),
      etco2: generateTrendData(39, 1),
    },
  },
  {
    id: 9,
    name: "N. Davis",
    age: 52,
    condition: "Stable Post-Treatment",
    location: "Wards",
    room: "RM 204",
    vitals: {
      heartRate: 70,
      bp: { systolic: 112, diastolic: 70 },
      temp: 37.1,
      respirate: 14,
      spO2: 98,
      etco2: 38,
    },
    history: {
      medical: "Completed treatment course for pneumonia. Chest X-ray shows improvement. Vital signs stable.",
      physician: "Complete antibiotic course. Follow-up chest X-ray in 2 weeks. Discharge tomorrow if stable overnight.",
    },
    trends: {
      heartRate: generateTrendData(70, 3),
      bp: generateBPTrendData(112, 70),
      temp: generateTrendData(37.1, 0.2),
      spO2: generateTrendData(98, 1),
      respirate: generateTrendData(14, 1),
      etco2: generateTrendData(38, 1),
    },
  },
  {
    id: 10,
    name: "E. Anderson",
    age: 38,
    condition: "Recovery Phase",
    location: "Wards",
    room: "RM 205",
    vitals: {
      heartRate: 74,
      bp: { systolic: 118, diastolic: 74 },
      temp: 36.7,
      respirate: 16,
      spO2: 99,
      etco2: 37,
    },
    history: {
      medical: "Recovering from acute gastroenteritis. Tolerating oral fluids well. No fever for 24 hours.",
      physician: "Advance diet as tolerated. Continue IV fluids until adequate PO intake. Likely discharge within 24 hours.",
    },
    trends: {
      heartRate: generateTrendData(74, 3),
      bp: generateBPTrendData(118, 74),
      temp: generateTrendData(36.7, 0.2),
      spO2: generateTrendData(99, 0.5),
      respirate: generateTrendData(16, 1),
      etco2: generateTrendData(37, 1),
    },
  },
];
