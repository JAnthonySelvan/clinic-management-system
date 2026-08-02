import { SERVICE_DETAIL_IMAGES, HERO_IMAGES, FEATURE_IMAGES } from "./images";

export const LOCAL_SERVICES = [
  {
    name: "Cardiology",
    slug: "cardiology",
    aliases: ["cardiology", "cardio"],
    shortDescription:
      "Advanced cardiovascular care, diagnostic ECG, echocardiograms, and preventive heart treatments.",
    fullDescription:
      "Our Cardiology department provides comprehensive cardiovascular health services ranging from routine preventive screenings to advanced interventional cardiology procedures. Managed by senior cardiologists and equipped with state-of-the-art diagnostic imaging, we focus on early detection, lifestyle rehabilitation, and evidence-based treatment plans tailored to each patient.",
    heroImage: SERVICE_DETAIL_IMAGES.cardiology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.cardiology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.cardiology.gallery,
    features: SERVICE_DETAIL_IMAGES.cardiology.features,
    keyTreatments: [
      {
        title: "Comprehensive ECG & Holter Monitoring",
        description:
          "24-hour continuous cardiac rhythm monitoring and digital electrocardiograms for precise arrhythmia tracking.",
        icon: "heartbeat",
        image: SERVICE_DETAIL_IMAGES.cardiology.features[0],
      },
      {
        title: "2D & Color Doppler Echocardiography",
        description:
          "High-definition ultrasound imaging of heart valves, chamber thickness, and real-time blood flow dynamics.",
        icon: "activity",
        image: SERVICE_DETAIL_IMAGES.cardiology.features[1],
      },
      {
        title: "Coronary Risk Assessment & Lipid Rehab",
        description:
          "Personalized preventive cardiovascular programs focusing on hypertension control and arterial health.",
        icon: "shield",
        image: SERVICE_DETAIL_IMAGES.cardiology.features[2],
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
    aliases: ["neurology", "neuro"],
    shortDescription:
      "Expert diagnosis and treatment for brain disorders, stroke care, migraines, and nerve illnesses.",
    fullDescription:
      "Saviours Clinic Neurology department specializes in diagnosing and treating complex neurological conditions affecting the brain, spinal cord, and peripheral nerve pathways. Utilizing high-resolution neuro-imaging and nerve conduction studies, our neurology team offers personalized clinical care for chronic headache, epilepsy, movement disorders, and neuro-rehabilitation.",
    heroImage: SERVICE_DETAIL_IMAGES.neurology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.neurology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.neurology.gallery,
    features: SERVICE_DETAIL_IMAGES.neurology.features,
    keyTreatments: [
      {
        title: "EEG Brain Wave Mapping",
        description:
          "Digital electroencephalography to record bioelectric brain signals for seizure and sleep evaluation.",
        icon: "brain",
        image: SERVICE_DETAIL_IMAGES.neurology.features[0],
      },
      {
        title: "EMG & Nerve Conduction Studies",
        description:
          "Diagnostic assessment of peripheral neuropathies, carpal tunnel syndrome, and muscular dystrophies.",
        icon: "zap",
        image: SERVICE_DETAIL_IMAGES.neurology.features[1],
      },
      {
        title: "Migraine & Neuropathic Pain Clinic",
        description:
          "Advanced therapeutic options for chronic tension headaches, trigeminal neuralgia, and nerve discomfort.",
        icon: "alert-circle",
        image: SERVICE_DETAIL_IMAGES.neurology.features[2],
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
    aliases: ["orthopedics", "ortho"],
    shortDescription:
      "Advanced joint replacement, fracture management, spine care, and sports physical therapy.",
    fullDescription:
      "The Orthopedics department at Saviours Clinic delivers comprehensive musculoskeletal care for bone, joint, ligament, and tendon health. From minimally invasive arthroscopic surgeries to non-surgical joint preservation therapies, our orthopedic specialists help restore mobility and relieve joint pain.",
    heroImage: SERVICE_DETAIL_IMAGES.orthopedics.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.orthopedics.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.orthopedics.gallery,
    features: SERVICE_DETAIL_IMAGES.orthopedics.features,
    keyTreatments: [
      {
        title: "Arthroscopic Joint Surgery",
        description:
          "Keyhole arthroscopy for knee ligament ACL reconstruction, shoulder rotator cuff repair, and cartilage restoration.",
        icon: "bone",
        image: SERVICE_DETAIL_IMAGES.orthopedics.features[0],
      },
      {
        title: "Spine & Posture Rehabilitation",
        description:
          "Non-invasive disc pain therapies, spinal alignment assessment, and targeted physio exercises.",
        icon: "layers",
        image: SERVICE_DETAIL_IMAGES.orthopedics.features[1],
      },
      {
        title: "Fracture Fixation & Trauma Care",
        description:
          "Precision plaster casting, closed reduction, and surgical internal fixation for acute bone fractures.",
        icon: "shield",
        image: SERVICE_DETAIL_IMAGES.orthopedics.features[2],
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
    aliases: ["pediatrics", "pediatric", "childcare"],
    shortDescription:
      "Compassionate healthcare for infants, children, and teens, including vaccinations and growth tracking.",
    fullDescription:
      "Our Pediatrics department provides child-centered compassionate clinical care in a warm, friendly environment. From newborn neonatal health assessments to comprehensive immunization schedules and developmental milestone tracking, our pediatric physicians safeguard your child's growth and health at every stage.",
    heroImage: SERVICE_DETAIL_IMAGES.pediatrics.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.pediatrics.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.pediatrics.gallery,
    features: SERVICE_DETAIL_IMAGES.pediatrics.features,
    keyTreatments: [
      {
        title: "Pediatric Immunization & Vaccines",
        description:
          "Complete WHO-compliant vaccination scheduling protecting against viral and bacterial childhood infections.",
        icon: "heart",
        image: SERVICE_DETAIL_IMAGES.pediatrics.features[0],
      },
      {
        title: "Growth & Nutritional Screening",
        description:
          "Comprehensive height/weight percentile tracking and pediatric dietitian nutritional counseling.",
        icon: "user",
        image: SERVICE_DETAIL_IMAGES.pediatrics.features[1],
      },
      {
        title: "Childhood Allergy & Asthma Management",
        description:
          "Specialized pediatric respiratory evaluation for asthma prevention and allergen defense.",
        icon: "sun",
        image: SERVICE_DETAIL_IMAGES.pediatrics.features[2],
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
    aliases: ["dental", "dental-care", "dentalcare"],
    shortDescription:
      "Complete dental health care, teeth cleaning, root canals, implants, and cosmetic smile alignment.",
    fullDescription:
      "Saviours Clinic Dental department offers gentle, pain-free dental treatments utilizing advanced digital dentistry tools. Our dental team provides preventative teeth cleanings, root canal treatments, porcelain crowns, dental implants, and cosmetic smile makeovers.",
    heroImage: SERVICE_DETAIL_IMAGES.dental.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.dental.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.dental.gallery,
    features: SERVICE_DETAIL_IMAGES.dental.features,
    keyTreatments: [
      {
        title: "Ultrasonic Scaling & Polish",
        description:
          "Deep plaque removal, tartar cleaning, and teeth polishing to maintain healthy gums.",
        icon: "smile",
        image: SERVICE_DETAIL_IMAGES.dental.features[0],
      },
      {
        title: "Single-Visit Root Canal Treatment",
        description:
          "Modern painless rotary endodontic root canal procedure restoring infected tooth pulp.",
        icon: "zap",
        image: SERVICE_DETAIL_IMAGES.dental.features[1],
      },
      {
        title: "Cosmetic Veneers & Teeth Whitening",
        description:
          "Laser teeth whitening and custom ceramic porcelain veneers for radiant smile enhancement.",
        icon: "star",
        image: SERVICE_DETAIL_IMAGES.dental.features[2],
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
    aliases: ["eye-care", "eyecare", "eyeCare", "ophthalmology"],
    shortDescription:
      "Comprehensive eye exams, vision testing, glaucoma screening, and LASIK/cataract consultations.",
    fullDescription:
      "Our Ophthalmology and Eye Care department provides expert optical checkups, retinal examinations, and refractive disorder treatments. Equipped with computer-assisted diagnostic refractometers and tonometers, we ensure clear vision and long-term ocular health.",
    heroImage: SERVICE_DETAIL_IMAGES.eyeCare.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.eyeCare.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.eyeCare.gallery,
    features: SERVICE_DETAIL_IMAGES.eyeCare.features,
    keyTreatments: [
      {
        title: "Computerized Refractive Vision Test",
        description:
          "Precise automated refraction testing for spectacle lens prescription and astigmatism diagnosis.",
        icon: "eye",
        image: SERVICE_DETAIL_IMAGES.eyeCare.features[0],
      },
      {
        title: "Glaucoma Screening & Intraocular Pressure",
        description:
          "Non-contact tonometer testing assessing optic nerve pressure and visual field loss prevention.",
        icon: "shield",
        image: SERVICE_DETAIL_IMAGES.eyeCare.features[1],
      },
      {
        title: "Cataract & Retinal Evaluation",
        description:
          "Comprehensive slit-lamp lens examination and dilated fundoscopy for retinal health.",
        icon: "sun",
        image: SERVICE_DETAIL_IMAGES.eyeCare.features[2],
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
    aliases: ["pulmonology", "lungcare"],
    shortDescription:
      "Expert respiratory care, pulmonary function testing (PFT), asthma, and allergy treatments.",
    fullDescription:
      "The Pulmonology department at Saviours Clinic provides clinical evaluation for lung conditions, bronchial asthma, COPD, and respiratory infections. Utilizing digital spirometry and chest diagnostics, our lung specialists help patients breathe easier.",
    heroImage: SERVICE_DETAIL_IMAGES.pulmonology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.pulmonology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.pulmonology.gallery,
    features: SERVICE_DETAIL_IMAGES.pulmonology.features,
    keyTreatments: [
      {
        title: "Digital Spirometry & Lung Capacity Test",
        description:
          "Computer-aided pulmonary function test measuring airway resistance and tidal volume capacity.",
        icon: "wind",
        image: SERVICE_DETAIL_IMAGES.pulmonology.features[0],
      },
      {
        title: "Asthma & COPD Care Management",
        description:
          "Inhaler technique instruction, long-term asthma action plans, and bronchospasm relief.",
        icon: "heart",
        image: SERVICE_DETAIL_IMAGES.pulmonology.features[1],
      },
      {
        title: "Sleep Apnea & Polysomnography",
        description:
          "Diagnostic sleep disorder evaluations for snoring, nocturnal oxygen desaturation, and CPAP titrations.",
        icon: "moon",
        image: SERVICE_DETAIL_IMAGES.pulmonology.features[2],
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
    aliases: ["general-medicine", "generalmedicine", "generalMedicine"],
    shortDescription:
      "Comprehensive primary care, executive health checkups, diabetes control, and illness prevention.",
    fullDescription:
      "Saviours Clinic General Medicine department acts as your primary healthcare partner. Offering preventive health screenings, chronic disease management (diabetes, hypertension, thyroid), and prompt treatment for acute fever and infections.",
    heroImage: SERVICE_DETAIL_IMAGES.generalMedicine.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.generalMedicine.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.generalMedicine.gallery,
    features: SERVICE_DETAIL_IMAGES.generalMedicine.features,
    keyTreatments: [
      {
        title: "Executive Master Health Checkup",
        description:
          "Full-body blood work, vital health screenings, ECG, chest diagnostic, and physician consultation.",
        icon: "clipboard",
        image: SERVICE_DETAIL_IMAGES.generalMedicine.features[0],
      },
      {
        title: "Diabetes & Metabolic Disorder Care",
        description:
          "HbA1c monitoring, blood glucose tracking, diabetic dietetics, and metabolic wellness plans.",
        icon: "activity",
        image: SERVICE_DETAIL_IMAGES.generalMedicine.features[1],
      },
      {
        title: "Fever & Acute Infection Clinic",
        description:
          "Fast-track diagnostic evaluation for viral fevers, respiratory infections, and gastrointestinal illness.",
        icon: "thermometer",
        image: SERVICE_DETAIL_IMAGES.generalMedicine.features[2],
      },
    ],
    diagnosticPricing: [
      { testName: "Complete Blood Count (CBC) & ESR", price: 350, duration: "15 mins" },
      { testName: "HbA1c Glycated Hemoglobin Test", price: 500, duration: "15 mins" },
      { testName: "Executive Full Body Master Health Checkup", price: 2999, duration: "2 hrs" },
    ],
  },
  {
    name: "Dermatology",
    slug: "dermatology",
    aliases: ["dermatology", "skin-care", "skincare"],
    shortDescription:
      "Advanced skin care treatments, acne therapy, laser rejuvenation, and dermatological surgery.",
    fullDescription:
      "Our Dermatology department provides clinical care for skin, hair, and nail conditions. From acne treatment and eczema management to anti-aging therapies, skin biopsy, and laser procedures, our certified dermatologists ensure healthy skin.",
    heroImage: SERVICE_DETAIL_IMAGES.dermatology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.dermatology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.dermatology.gallery,
    features: SERVICE_DETAIL_IMAGES.dermatology.features,
    keyTreatments: [
      {
        title: "Clinical Dermatology & Acne Therapy",
        description: "Targeted prescription therapies and medical facials for acne, rosacea, and skin inflammation.",
        icon: "sun",
        image: SERVICE_DETAIL_IMAGES.dermatology.features[0],
      },
      {
        title: "Laser Skin Rejuvenation & Pigmentation",
        description: "Advanced laser treatments for scar reduction, hyperpigmentation, and skin texture renewal.",
        icon: "zap",
        image: SERVICE_DETAIL_IMAGES.dermatology.features[1],
      },
    ],
    diagnosticPricing: [
      { testName: "Comprehensive Skin & Hair Consultation", price: 600, duration: "30 mins" },
      { testName: "Dermoscopy Mole & Lesion Analysis", price: 1200, duration: "20 mins" },
    ],
  },
  {
    name: "Oncology",
    slug: "oncology",
    aliases: ["oncology", "cancer-care"],
    shortDescription:
      "Comprehensive cancer screening, chemotherapy guidance, and multidisciplinary tumor board care.",
    fullDescription:
      "Saviours Clinic Oncology department delivers compassionate cancer care, early diagnostic screening, tumor biomarker evaluations, and post-chemotherapy supportive care led by experienced oncologists.",
    heroImage: SERVICE_DETAIL_IMAGES.oncology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.oncology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.oncology.gallery,
    features: SERVICE_DETAIL_IMAGES.oncology.features,
    keyTreatments: [
      {
        title: "Cancer Biomarker & Screening Panels",
        description: "Early detection screening tests for tumor markers and genetic risk assessments.",
        icon: "shield",
        image: SERVICE_DETAIL_IMAGES.oncology.features[0],
      },
    ],
    diagnosticPricing: [
      { testName: "Comprehensive Tumor Biomarker Screening", price: 3200, duration: "1 hr" },
    ],
  },
  {
    name: "Gynaecology",
    slug: "gynaecology",
    aliases: ["gynaecology", "gynecology", "womens-health"],
    shortDescription:
      "Comprehensive women's healthcare, prenatal care, PCOS management, and routine checkups.",
    fullDescription:
      "Our Gynaecology department offers compassionate medical services for women at every stage of life. From preventive Pap smears and pelvic ultrasounds to hormonal balance and maternal wellness.",
    heroImage: SERVICE_DETAIL_IMAGES.gynaecology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.gynaecology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.gynaecology.gallery,
    features: SERVICE_DETAIL_IMAGES.gynaecology.features,
    keyTreatments: [
      {
        title: "Prenatal & Maternal Health Care",
        description: "Routine maternal checkups, fetal doppler monitoring, and prenatal nutritional support.",
        icon: "heart",
        image: SERVICE_DETAIL_IMAGES.gynaecology.features[0],
      },
    ],
    diagnosticPricing: [
      { testName: "Pelvic Ultrasound & Pap Smear Checkup", price: 1500, duration: "30 mins" },
    ],
  },
  {
    name: "Radiology",
    slug: "radiology",
    aliases: ["radiology", "imaging"],
    shortDescription:
      "State-of-the-art diagnostic imaging, high-resolution X-rays, MRI, CT scans, and ultrasounds.",
    fullDescription:
      "Equipped with advanced imaging technology, our Radiology department delivers quick, accurate, digital diagnostic reports supporting all medical departments.",
    heroImage: SERVICE_DETAIL_IMAGES.radiology.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.radiology.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.radiology.gallery,
    features: SERVICE_DETAIL_IMAGES.radiology.features,
    keyTreatments: [
      {
        title: "Digital High-Definition Radiography",
        description: "Low-radiation high-resolution digital X-rays with immediate radiologist reporting.",
        icon: "xray",
        image: SERVICE_DETAIL_IMAGES.radiology.features[0],
      },
    ],
    diagnosticPricing: [
      { testName: "High-Resolution Chest Digital X-Ray", price: 450, duration: "15 mins" },
      { testName: "Abdominal & Pelvic Ultrasound Scan", price: 1400, duration: "30 mins" },
    ],
  },
  {
    name: "Psychiatry",
    slug: "psychiatry",
    aliases: ["psychiatry", "mental-health"],
    shortDescription:
      "Compassionate mental health services, anxiety & depression therapy, and stress management.",
    fullDescription:
      "Saviours Clinic Psychiatry department provides confidential, evidence-based mental healthcare. Our psychiatrists and clinical psychologists specialize in anxiety, mood disorders, depression, and cognitive behavioral therapy.",
    heroImage: SERVICE_DETAIL_IMAGES.psychiatry.hero,
    overviewImage: SERVICE_DETAIL_IMAGES.psychiatry.overview,
    galleryImages: SERVICE_DETAIL_IMAGES.psychiatry.gallery,
    features: SERVICE_DETAIL_IMAGES.psychiatry.features,
    keyTreatments: [
      {
        title: "Cognitive Behavioral Therapy (CBT)",
        description: "Structured psychotherapeutic sessions helping manage stress, panic, and emotional wellness.",
        icon: "user",
        image: SERVICE_DETAIL_IMAGES.psychiatry.features[0],
      },
    ],
    diagnosticPricing: [
      { testName: "Initial Psychiatric Clinical Assessment", price: 1000, duration: "45 mins" },
    ],
  },
];

export const getLocalServiceBySlug = (slug) => {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase().trim();

  const found = LOCAL_SERVICES.find((s) => {
    if (s.slug.toLowerCase() === normalizedSlug) return true;
    if (s.aliases && s.aliases.some((a) => a.toLowerCase() === normalizedSlug)) return true;
    return false;
  });

  return found || null;
};
