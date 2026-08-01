import Service from "../models/Service.mjs";

const DEFAULT_SERVICES = [
  {
    name: "Cardiology",
    slug: "cardiology",
    shortDescription:
      "Advanced cardiovascular care, diagnostic ECG, echocardiograms, and preventive heart treatments.",
    fullDescription:
      "Our Cardiology department provides comprehensive cardiovascular health services ranging from routine preventive screenings to advanced interventional cardiology procedures. Managed by senior cardiologists and equipped with state-of-the-art diagnostic imaging, we focus on early detection, lifestyle rehabilitation, and evidence-based treatment plans tailored to each patient.",
    heroImage:
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Comprehensive ECG & Holter Monitoring",
        description:
          "24-hour continuous cardiac rhythm monitoring and digital electrocardiograms for precise arrhythmia tracking.",
        icon: "heartbeat",
      },
      {
        title: "2D & Color Doppler Echocardiography",
        description:
          "High-definition ultrasound imaging of heart valves, chamber thickness, and real-time blood flow dynamics.",
        icon: "activity",
      },
      {
        title: "Coronary Risk Assessment & Lipid Rehab",
        description:
          "Personalized preventive cardiovascular programs focusing on hypertension control and arterial health.",
        icon: "shield",
      },
    ],
    diagnosticPricing: [
      { testName: "Standard Digital 12-Lead ECG", price: 500, duration: "15 mins" },
      { testName: "2D Echocardiogram with Doppler", price: 2200, duration: "30 mins" },
      { testName: "24-Hour Ambulatory Holter Monitor", price: 3500, duration: "24 hrs" },
      { testName: "Cardiac Stress TMT Test", price: 1800, duration: "45 mins" },
    ],
  },
  {
    name: "Neurology",
    slug: "neurology",
    shortDescription:
      "Expert diagnosis and treatment for brain disorders, stroke care, migraines, and nerve illnesses.",
    fullDescription:
      "Saviours Clinic Neurology department specializes in diagnosing and treating complex neurological conditions affecting the brain, spinal cord, and peripheral nerve pathways. Utilizing high-resolution neuro-imaging and nerve conduction studies, our neurology team offers personalized clinical care for chronic headache, epilepsy, movement disorders, and neuro-rehabilitation.",
    heroImage:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "EEG Brain Wave Mapping",
        description:
          "Digital electroencephalography to record bioelectric brain signals for seizure and sleep evaluation.",
        icon: "brain",
      },
      {
        title: "EMG & Nerve Conduction Studies",
        description:
          "Diagnostic assessment of peripheral neuropathies, carpal tunnel syndrome, and muscular dystrophies.",
        icon: "zap",
      },
      {
        title: "Migraine & Neuropathic Pain Clinic",
        description:
          "Advanced therapeutic options for chronic tension headaches, trigeminal neuralgia, and nerve discomfort.",
        icon: "alert-circle",
      },
    ],
    diagnosticPricing: [
      { testName: "Digital Electroencephalogram (EEG)", price: 1800, duration: "45 mins" },
      { testName: "Nerve Conduction Velocity Study (NCV)", price: 2500, duration: "60 mins" },
      { testName: "Electromyography (EMG Diagnostic)", price: 2800, duration: "45 mins" },
    ],
  },
  {
    name: "Orthopedics",
    slug: "orthopedics",
    shortDescription:
      "Advanced joint replacement, fracture management, spine care, and sports physical therapy.",
    fullDescription:
      "The Orthopedics department at Saviours Clinic delivers comprehensive musculoskeletal care for bone, joint, ligament, and tendon health. From minimally invasive arthroscopic surgeries to non-surgical joint preservation therapies, our orthopedic specialists help restore mobility and relieve joint pain.",
    heroImage:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Arthroscopic Joint Surgery",
        description:
          "Keyhole arthroscopy for knee ligament ACL reconstruction, shoulder rotator cuff repair, and cartilage restoration.",
        icon: "bone",
      },
      {
        title: "Spine & Posture Rehabilitation",
        description:
          "Non-invasive disc pain therapies, spinal alignment assessment, and targeted physio exercises.",
        icon: "layers",
      },
      {
        title: "Fracture Fixation & Trauma Care",
        description:
          "Precision plaster casting, closed reduction, and surgical internal fixation for acute bone fractures.",
        icon: "shield",
      },
    ],
    diagnosticPricing: [
      { testName: "Digital Bone X-Ray (Single View)", price: 400, duration: "15 mins" },
      { testName: "DEXA Bone Mineral Density Scan", price: 1500, duration: "30 mins" },
      { testName: "Musculoskeletal Ultrasound Screening", price: 1200, duration: "30 mins" },
    ],
  },
  {
    name: "Pediatrics",
    slug: "pediatrics",
    shortDescription:
      "Compassionate healthcare for infants, children, and teens, including vaccinations and growth tracking.",
    fullDescription:
      "Our Pediatrics department provides child-centered compassionate clinical care in a warm, friendly environment. From newborn neonatal health assessments to comprehensive immunization schedules and developmental milestone tracking, our pediatric physicians safeguard your child's growth and health at every stage.",
    heroImage:
      "https://res.cloudinary.com/udzftzug/image/upload/f_auto,q_auto/images_11_bodtks",
    overviewImage:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Pediatric Immunization & Vaccines",
        description:
          "Complete WHO-compliant vaccination scheduling protecting against viral and bacterial childhood infections.",
        icon: "heart",
      },
      {
        title: "Growth & Nutritional Screening",
        description:
          "Comprehensive height/weight percentile tracking and pediatric dietitian nutritional counseling.",
        icon: "user",
      },
      {
        title: "Childhood Allergy & Asthma Management",
        description:
          "Specialized pediatric respiratory evaluation for asthma prevention and allergen defense.",
        icon: "sun",
      },
    ],
    diagnosticPricing: [
      { testName: "Pediatric Growth & Wellness Consultation", price: 600, duration: "30 mins" },
      { testName: "Comprehensive Pediatric Blood Panel", price: 1100, duration: "1 hr" },
      { testName: "Pediatric Allergy Screening", price: 1600, duration: "45 mins" },
    ],
  },
  {
    name: "Dental Care",
    slug: "dental",
    shortDescription:
      "Complete dental health care, teeth cleaning, root canals, implants, and cosmetic smile alignment.",
    fullDescription:
      "Saviours Clinic Dental department offers gentle, pain-free dental treatments utilizing advanced digital dentistry tools. Our dental team provides preventative teeth cleanings, root canal treatments, porcelain crowns, dental implants, and cosmetic smile makeovers.",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Ultrasonic Scaling & Polish",
        description:
          "Deep plaque removal, tartar cleaning, and teeth polishing to maintain healthy gums.",
        icon: "smile",
      },
      {
        title: "Single-Visit Root Canal Treatment",
        description:
          "Modern painless rotary endodontic root canal procedure restoring infected tooth pulp.",
        icon: "zap",
      },
      {
        title: "Cosmetic Veneers & Teeth Whitening",
        description:
          "Laser teeth whitening and custom ceramic porcelain veneers for radiant smile enhancement.",
        icon: "star",
      },
    ],
    diagnosticPricing: [
      { testName: "Digital Dental OPG Intraoral X-Ray", price: 350, duration: "15 mins" },
      { testName: "Ultrasonic Scaling & Polishing", price: 1200, duration: "45 mins" },
      { testName: "Painless Root Canal Therapy (RCT)", price: 3500, duration: "60 mins" },
    ],
  },
  {
    name: "Eye Care",
    slug: "eye-care",
    shortDescription:
      "Comprehensive eye exams, vision testing, glaucoma screening, and LASIK/cataract consultations.",
    fullDescription:
      "Our Ophthalmology and Eye Care department provides expert optical checkups, retinal examinations, and refractive disorder treatments. Equipped with computer-assisted diagnostic refractometers and tonometers, we ensure clear vision and long-term ocular health.",
    heroImage:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Computerized Refractive Vision Test",
        description:
          "Precise automated refraction testing for spectacle lens prescription and astigmatism diagnosis.",
        icon: "eye",
      },
      {
        title: "Glaucoma Screening & Intraocular Pressure",
        description:
          "Non-contact tonometer testing assessing optic nerve pressure and visual field loss prevention.",
        icon: "shield",
      },
      {
        title: "Cataract & Retinal Evaluation",
        description:
          "Comprehensive slit-lamp lens examination and dilated fundoscopy for retinal health.",
        icon: "sun",
      },
    ],
    diagnosticPricing: [
      { testName: "Complete Computerized Vision Checkup", price: 400, duration: "20 mins" },
      { testName: "Glaucoma Screening & Tonometer Pressure", price: 800, duration: "30 mins" },
      { testName: "Dilated Fundus Retinal Screening", price: 1000, duration: "30 mins" },
    ],
  },
  {
    name: "Pulmonology",
    slug: "pulmonology",
    shortDescription:
      "Expert respiratory care, pulmonary function testing (PFT), asthma, and allergy treatments.",
    fullDescription:
      "The Pulmonology department at Saviours Clinic provides clinical evaluation for lung conditions, bronchial asthma, COPD, and respiratory infections. Utilizing digital spirometry and chest diagnostics, our lung specialists help patients breathe easier.",
    heroImage:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1600&q=80&auto=format&fit=crop",
    overviewImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Digital Spirometry & Lung Capacity Test",
        description:
          "Computer-aided pulmonary function test measuring airway resistance and tidal volume capacity.",
        icon: "wind",
      },
      {
        title: "Asthma & COPD Care Management",
        description:
          "Inhaler technique instruction, long-term asthma action plans, and bronchospasm relief.",
        icon: "heart",
      },
      {
        title: "Sleep Apnea & Polysomnography",
        description:
          "Diagnostic sleep disorder evaluations for snoring, nocturnal oxygen desaturation, and CPAP titrations.",
        icon: "moon",
      },
    ],
    diagnosticPricing: [
      { testName: "Digital Spirometry Pulmonary Function Test", price: 1200, duration: "30 mins" },
      { testName: "Pulse Oximetry & Blood Gas Analysis (ABG)", price: 900, duration: "20 mins" },
      { testName: "Overnight Sleep Apnea Monitor", price: 4500, duration: "Overnight" },
    ],
  },
  {
    name: "General Medicine",
    slug: "general-medicine",
    shortDescription:
      "Comprehensive primary care, executive health checkups, diabetes control, and illness prevention.",
    fullDescription:
      "Saviours Clinic General Medicine department acts as your primary healthcare partner. Offering preventive health screenings, chronic disease management (diabetes, hypertension, thyroid), and prompt treatment for acute fever and infections.",
    heroImage:
      "https://res.cloudinary.com/udzftzug/image/upload/v1785430874/Gemini_Generated_Image_rxzd9drxzd9drxzd_tupkkn.png",
    overviewImage:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80&auto=format&fit=crop",
    ],
    keyTreatments: [
      {
        title: "Executive Master Health Checkup",
        description:
          "Full-body blood work, vital health screenings, ECG, chest diagnostic, and physician consultation.",
        icon: "clipboard",
      },
      {
        title: "Diabetes & Metabolic Disorder Care",
        description:
          "HbA1c monitoring, blood glucose tracking, diabetic dietetics, and metabolic wellness plans.",
        icon: "activity",
      },
      {
        title: "Fever & Acute Infection Clinic",
        description:
          "Fast-track diagnostic evaluation for viral fevers, respiratory infections, and gastrointestinal illness.",
        icon: "thermometer",
      },
    ],
    diagnosticPricing: [
      { testName: "Complete Blood Count (CBC) & ESR", price: 350, duration: "15 mins" },
      { testName: "HbA1c Glycated Hemoglobin Test", price: 500, duration: "15 mins" },
      { testName: "Executive Full Body Master Health Checkup", price: 2999, duration: "2 hrs" },
    ],
  },
];

export const ensureServicesSeeded = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      console.log("Seeding default clinic services...");
      await Service.insertMany(DEFAULT_SERVICES);
      console.log("Clinic services seeded successfully!");
    }
  } catch (error) {
    console.error("Error seeding clinic services:", error);
  }
};
