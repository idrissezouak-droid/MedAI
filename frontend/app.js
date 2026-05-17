/* ============================================================
   app.js — IA Doctor Frontend Logic
   Handles: API calls, symptom analysis, toast notifications
   ============================================================ */

const API_BASE = 'http://localhost:3001';
const AUTH_TOKEN = 'Bearer test-token-123';
const DEFAULT_USER_ID = 'demo-user-001';
let DEFAULT_LANGUAGE = 'fr';

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const translations = {
  fr: {
    navDashboard: "🏠 Tableau de bord",
    navEmergency: "🆘 Urgence",
    navLogout: "← Déconnexion",
    pageTitle: "Analyse des symptômes",
    pageSubtitle: "Décrivez vos symptômes en détail pour une orientation médicale précise.",
    symptomsLabel: "Vos symptômes",
    symptomsPlaceholder: "Ex: J'ai des douleurs thoraciques depuis 2 heures, accompagnées d'essoufflement et de sueurs froides...",
    analyzeBtnText: "🔍 Analyser avec l'IA",
    clearBtnText: "🗑️ Effacer",
    micBtnText: "Dictée vocale",
    statPrecision: "Précision IA",
    statTime: "Temps d'analyse",
    statAvailability: "Disponibilité",
    symptomSectionTitle: "🔬 Décrire vos symptômes",
    symptomSectionSubtitle: "Soyez précis : durée, intensité, localisation de la douleur.",
    resultTitle: "Résultat de l'analyse IA",
    copyDiagnosticBtn: "📋 Copier le diagnostic",
    downloadDiagnosticBtn: "📄 Télécharger le diagnostic",
    resultRecommendationLabel: "💊 Recommandation",
    resultSpecialistLabel: "🩺 Spécialiste conseillé",
    requestIdLabel: "🆔 ID de requête",
    recommendedDoctorsLabel: "👨‍⚕️ Médecins recommandés",
    emergencyAlertTitle: "URGENCE MÉDICALE DÉTECTÉE",
    emergencyAlertSubtitle: "Appelez le 15 (SAMU) ou rendez-vous immédiatement aux urgences les plus proches.",
    emergencyAlertBtn: "🆘 Urgences",
    hospitalsTitle: "🏥 Hôpitaux à proximité",
    hospitalsSubtitle: "5 établissements médicaux proches de votre position",
    viewHospitalsBtn: "Voir les hôpitaux →",
    historyTitle: "📋 Historique médical",
    historySubtitle: "Vos dernières analyses de symptômes enregistrées",
    clearHistoryBtn: "🗑️ Tout effacer",
    emptyHistory: "Aucune analyse enregistrée pour le moment.",
    riskCriticalTitle: "⚠️ Risque critique détecté",
    riskCriticalSubtitle: "Vos symptômes indiquent une situation potentiellement urgente. Ne perdez pas de temps.",
    pdfHeaderSubtitle: "Rapport d'Orientation Médicale Assistée par IA",
    pdfSymptomTitle: "1. Description des symptômes déclarés",
    pdfAnalysisTitle: "2. Synthèse et Orientation Clinique",
    pdfOrientationLabel: "Orientation Principale :",
    pdfUrgencyLabel: "Niveau d'Urgence :",
    pdfSpecialistLabel: "Spécialité recommandée :",
    pdfRecTitle: "3. Recommandations & Prochaines étapes",
    pdfDocsTitle: "4. Établissements médicaux recommandés",
    pdfDisclaimer: "Clause de non-responsabilité: Ce document est généré par un système d'orientation assisté par intelligence artificielle. Il ne constitue pas un diagnostic médical formalisé et ne remplace aucunement l'avis d'un professionnel de santé.",
    emergencyCenterTitle: "🆘 Centre d'urgence",
    emergencyCenterSubtitle: "Accès rapide aux hôpitaux et numéros d'urgence",
    sosLabel: "URGENCE",
    sosDescription: "Appuyez pour appeler le SAMU (15)",
    sosSubdescription: "Votre position sera partagée automatiquement",
    emergencyBarText: "En cas d'urgence vitale — Composez le 15 (SAMU), le 150 (Maroc) ou le 112 (Europe) immédiatement.",
    backDashboard: "← Retour au tableau de bord"
  },
  en: {
    navDashboard: "🏠 Dashboard",
    navEmergency: "🆘 Emergency",
    navLogout: "← Logout",
    pageTitle: "Symptom Analysis",
    pageSubtitle: "Describe your symptoms in detail for accurate medical guidance.",
    symptomsLabel: "Your symptoms",
    symptomsPlaceholder: "Ex: I've had chest pain for 2 hours, accompanied by shortness of breath and cold sweats...",
    analyzeBtnText: "🔍 Analyze with AI",
    clearBtnText: "🗑️ Clear",
    micBtnText: "Voice Dictation",
    statPrecision: "AI Precision",
    statTime: "Analysis Time",
    statAvailability: "Availability",
    symptomSectionTitle: "🔬 Describe Your Symptoms",
    symptomSectionSubtitle: "Be precise: duration, intensity, and location of the pain.",
    resultTitle: "AI Analysis Result",
    copyDiagnosticBtn: "📋 Copy Diagnostic",
    downloadDiagnosticBtn: "📄 Download Report",
    resultRecommendationLabel: "💊 Recommendation",
    resultSpecialistLabel: "🩺 Recommended Specialist",
    requestIdLabel: "🆔 Request ID",
    recommendedDoctorsLabel: "👨‍⚕️ Recommended Doctors",
    emergencyAlertTitle: "MEDICAL EMERGENCY DETECTED",
    emergencyAlertSubtitle: "Call emergency services immediately or head to the nearest emergency room.",
    emergencyAlertBtn: "🆘 Emergencies",
    hospitalsTitle: "🏥 Nearby Hospitals",
    hospitalsSubtitle: "5 medical establishments near your location",
    viewHospitalsBtn: "View Hospitals →",
    historyTitle: "📋 Medical History",
    historySubtitle: "Your last recorded symptom analyses",
    clearHistoryBtn: "🗑️ Clear All",
    emptyHistory: "No analyses recorded yet.",
    riskCriticalTitle: "⚠️ Critical Risk Detected",
    riskCriticalSubtitle: "Your symptoms indicate a potentially urgent situation. Do not waste time.",
    pdfHeaderSubtitle: "AI-Assisted Medical Orientation Report",
    pdfSymptomTitle: "1. Description of declared symptoms",
    pdfAnalysisTitle: "2. Clinical Synthesis & Orientation",
    pdfOrientationLabel: "Primary Orientation:",
    pdfUrgencyLabel: "Urgency Level:",
    pdfSpecialistLabel: "Recommended Specialty:",
    pdfRecTitle: "3. Recommendations & Next Steps",
    pdfDocsTitle: "4. Recommended Medical Establishments",
    pdfDisclaimer: "Disclaimer: This document is generated by an AI-assisted guidance system. It does not constitute a formal medical diagnosis and in no way replaces the advice of a healthcare professional.",
    emergencyCenterTitle: "🆘 Emergency Center",
    emergencyCenterSubtitle: "Quick access to hospitals and emergency numbers",
    sosLabel: "EMERGENCY",
    sosDescription: "Press to call emergency services (15)",
    sosSubdescription: "Your location will be shared automatically",
    emergencyBarText: "In case of vital emergency — Dial 15 (SAMU), 150 (Morocco) or 112 (Europe) immediately.",
    backDashboard: "← Back to Dashboard"
  },
  ar: {
    navDashboard: "🏠 لوحة القيادة",
    navEmergency: "🆘 طوارئ",
    navLogout: "← تسجيل الخروج",
    pageTitle: "تحليل الأعراض",
    pageSubtitle: "صِف الأعراض بالتفصيل للحصول على توجيه طبي دقيق.",
    symptomsLabel: "أعراضك",
    symptomsPlaceholder: "مثال: أعاني من آلام في الصدر منذ ساعتين، مصحوبة بضيق في التنفس وتعرق بارد...",
    analyzeBtnText: "🔍 تحليل بواسطة الذكاء الاصطناعي",
    clearBtnText: "🗑️ مسح",
    micBtnText: "إملاء صوتي",
    statPrecision: "دقة الذكاء الاصطناعي",
    statTime: "وقت التحليل",
    statAvailability: "متاح على مدار الساعة",
    symptomSectionTitle: "🔬 وصف أعراضك",
    symptomSectionSubtitle: "كن دقيقًا: المدة، الكثافة وموقع الألم.",
    resultTitle: "نتيجة تحليل الذكاء الاصطناعي",
    copyDiagnosticBtn: "📋 نسخ التشخيص",
    downloadDiagnosticBtn: "📄 تحميل التقرير",
    resultRecommendationLabel: "💊 التوصية الطبية",
    resultSpecialistLabel: "🩺 الأخصائي الموصى به",
    requestIdLabel: "🆔 معرف الطلب",
    recommendedDoctorsLabel: "👨‍⚕️ الأطباء الموصى بهم",
    emergencyAlertTitle: "تم اكتشاف حالة طوارئ طبية",
    emergencyAlertSubtitle: "اتصل بخدمات الطوارئ فورًا أو توجه إلى أقرب مستشفى.",
    emergencyAlertBtn: "🆘 الطوارئ",
    hospitalsTitle: "🏥 المستشفيات القريبة",
    hospitalsSubtitle: "٥ مؤسسات طبية قريبة من موقعك الحالي",
    viewHospitalsBtn: "عرض المستشفيات ←",
    historyTitle: "📋 التاريخ الطبي",
    historySubtitle: "آخر تحليلات الأعراض المسجلة الخاصة بك",
    clearHistoryBtn: "🗑️ مسح الكل",
    emptyHistory: "لا توجد تحليلات مسجلة بعد.",
    riskCriticalTitle: "⚠️ تم اكتشاف خطر حرج",
    riskCriticalSubtitle: "تشير أعراضك إلى حالة طارئة محتملة. لا تضيع الوقت.",
    pdfHeaderSubtitle: "تقرير التوجيه الطبي بمساعدة الذكاء الاصطناعي",
    pdfSymptomTitle: "١. وصف الأعراض المصرح بها",
    pdfAnalysisTitle: "٢. التوليف والتوجيه السريري",
    pdfOrientationLabel: "التوجيه الرئيسي:",
    pdfUrgencyLabel: "مستوى الطوارئ:",
    pdfSpecialistLabel: "التخصص الموصى به:",
    pdfRecTitle: "٣. التوصيات والخطوات التالية",
    pdfDocsTitle: "٤. المؤسسات الطبية الموصى بها",
    pdfDisclaimer: "إخلاء المسؤولية: تم إنشاء هذه الوثيقة بواسطة نظام توجيه بمساعدة الذكاء الاصطناعي. ولا يشكل تشخيصًا طبيًا رسميًا ولا يحل بأي حال من الأحوال محل مشورة أخصائي الرعاية الصحية.",
    emergencyCenterTitle: "🆘 مركز الطوارئ",
    emergencyCenterSubtitle: "وصول سريع إلى المستشفيات وأرقام الطوارئ",
    sosLabel: "طوارئ",
    sosDescription: "اضغط للاتصال بالإسعاف (١٥)",
    sosSubdescription: "سيتم مشاركة موقعك تلقائيًا",
    emergencyBarText: "في حالة الطوارئ الحيوية — اتصل بالرقم ١٥ (SAMU) أو ١٥٠ (المغرب) أو ١١٢ (أوروبا) فورًا.",
    backDashboard: "← العودة إلى لوحة القيادة"
  }
};

function applyTranslations(lang) {
  const t = translations[lang] || translations['fr'];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });
  
  // RTL support for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
  }
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'success', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '❌'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ============================================================
   URGENCY BADGE RENDERER
   ============================================================ */
function renderUrgencyBadge(level) {
  const config = {
    low: { label: '🟢 Faible', cls: 'badge-low' },
    medium: { label: '🟡 Modéré', cls: 'badge-medium' },
    high: { label: '🟠 Élevé', cls: 'badge-high' },
    emergency: { label: '🔴 URGENCE', cls: 'badge-emergency' },
  };
  const { label, cls } = config[level] || config['medium'];
  return `<span class="badge ${cls}">${label}</span>`;
}

/* ============================================================
   SYMPTOMS ANALYSIS — API CALL
   ============================================================ */
async function analyzeSymptoms(symptomsText) {
  const response = await fetch(`${API_BASE}/api/symptoms/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
    body: JSON.stringify({
      symptoms: symptomsText,
      userId: DEFAULT_USER_ID,
      language: DEFAULT_LANGUAGE,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Erreur serveur (${response.status})`);
  }

  return await response.json();
}

/* ============================================================
   RENDER ANALYSIS RESULT
   ============================================================ */
function renderResult(data, requestId) {
  const resultCard = document.getElementById('resultCard');
  if (!resultCard) return;

  // Store globally for PDF exporter
  window.lastAnalysisResult = data;

  // Populate fields
  const causeEl = document.getElementById('resultCause');
  if (causeEl) causeEl.textContent = data.possibleCause || '—';
  
  const recEl = document.getElementById('resultRecommendation');
  if (recEl) recEl.textContent = data.recommendation || '—';
  
  const specEl = document.getElementById('resultSpecialist');
  if (specEl) specEl.textContent = data.specialistNeeded || '—';
  
  const reqEl = document.getElementById('resultRequestId');
  if (reqEl) reqEl.textContent = requestId || '—';

  // Urgency badge & Risk Gauge
  const badgeContainer = document.getElementById('urgencyBadge');
  if (badgeContainer) {
    badgeContainer.innerHTML = renderUrgencyBadge(data.urgencyLevel);
    
    // Dynamic Risk Gauge Insertion (Next to the Urgency Badge)
    let gaugeWrapper = document.getElementById('riskGaugeWrapper');
    if (!gaugeWrapper) {
      gaugeWrapper = document.createElement('div');
      gaugeWrapper.id = 'riskGaugeWrapper';
      gaugeWrapper.className = 'gauge-wrapper';
      gaugeWrapper.innerHTML = `
        <svg class="gauge-svg" viewBox="0 0 36 36">
          <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="gauge-fill" id="riskGaugeFill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div class="gauge-text" id="riskGaugeText">0%</div>
      `;
      badgeContainer.parentNode.insertBefore(gaugeWrapper, badgeContainer);
    }
    
    // Determine risk percentage based on urgency level
    let targetPercentage = 55;
    let strokeColor = '#FBBF24'; // Yellow (Medium)
    if (data.urgencyLevel === 'low') {
      targetPercentage = 20;
      strokeColor = '#10B981'; // Green
    } else if (data.urgencyLevel === 'high' || data.urgencyLevel === 'emergency') {
      targetPercentage = 90;
      strokeColor = '#EF4444'; // Red
    }
    
    // Animate risk circle and counter text
    const gaugeFill = document.getElementById('riskGaugeFill');
    const gaugeText = document.getElementById('riskGaugeText');
    if (gaugeFill && gaugeText) {
      gaugeFill.style.strokeDasharray = '0, 100'; // Reset state
      
      setTimeout(() => {
        gaugeFill.style.stroke = strokeColor;
        gaugeFill.style.strokeDasharray = `${targetPercentage}, 100`;
        
        let currentPercent = 0;
        const duration = 800; // Total ms
        const stepTime = Math.max(Math.floor(duration / targetPercentage), 10);
        const timer = setInterval(() => {
          currentPercent++;
          if (gaugeText) gaugeText.textContent = `${currentPercent}%`;
          if (currentPercent >= targetPercentage) clearInterval(timer);
        }, stepTime);
      }, 50);
    }
  }

  // Doctors list
  const doctorsContainer = document.getElementById('recommendedDoctorsContainer');
  const doctorsList = document.getElementById('doctorsList');
  if (doctorsContainer && doctorsList) {
    if (data.doctors && data.doctors.length > 0) {
      doctorsContainer.style.display = 'block';
      doctorsList.innerHTML = data.doctors.map(doc => `
        <div style="background:var(--bg-glass); border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-weight:600; font-size:15px; margin-bottom:4px;">${doc.name}</div>
            <div style="font-size:13px; color:var(--text-secondary); display:flex; gap:12px; margin-bottom:6px; flex-wrap:wrap;">
              <span style="background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:100px;">${doc.specialty}</span>
              <span style="color:#FBBF24;">⭐ ${doc.rating}</span>
              <span style="color:var(--primary-light);">📍 ${doc.distance}</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted);">${doc.address}</div>
          </div>
          <a href="tel:${doc.phone}" class="btn btn-ghost" style="padding:8px 16px; font-size:13px; border-color:var(--border-active);">📞 Appeler</a>
        </div>
      `).join('');
    } else {
      doctorsContainer.style.display = 'none';
      doctorsList.innerHTML = '';
    }
  }

  // Emergency alert
  const emergencyAlert = document.getElementById('emergencyAlertContainer');
  if (emergencyAlert) {
    emergencyAlert.style.display = data.urgencyLevel === 'emergency' ? 'block' : 'none';
  }

  // Show card with animation
  resultCard.classList.add('visible');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================================================
   CLEAR RESULTS
   ============================================================ */
window.clearResults = function() {
  const textarea = document.getElementById('symptomsInput');
  if (textarea) {
    textarea.value = '';
    textarea.dispatchEvent(new Event('input'));
  }

  const resultCard = document.getElementById('resultCard');
  if (resultCard) {
    resultCard.classList.remove('visible');
    resultCard.style.animation = 'none';
  }
};

/* ============================================================
   SYMPTOM FORM — SUBMIT HANDLER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const symptomForm = document.getElementById('symptomForm');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const symptomsInput = document.getElementById('symptomsInput');

  // Live intelligent emergency symptoms detection
  if (symptomsInput) {
    symptomsInput.addEventListener('input', () => {
      const text = symptomsInput.value.toLowerCase();
      const dangerousWords = [
        'douleur thoracique',
        'difficulté respiratoire',
        'sang',
        'perte de conscience',
        'crise cardiaque',
        'avc'
      ];
      
      const containsDangerous = dangerousWords.some(word => text.includes(word));
      let liveAlert = document.getElementById('liveEmergencyAlert');
      
      if (containsDangerous) {
        symptomsInput.classList.add('emergency-glow');
        const t = translations[DEFAULT_LANGUAGE] || translations['fr'];
        
        if (!liveAlert) {
          liveAlert = document.createElement('div');
          liveAlert.id = 'liveEmergencyAlert';
          liveAlert.className = 'emergency-alert-live';
          liveAlert.style.marginTop = '16px';
          liveAlert.style.marginBottom = '8px';
          symptomsInput.parentNode.insertBefore(liveAlert, symptomsInput.nextSibling);
        }
        
        liveAlert.innerHTML = `
          <span style="font-size:28px;">🚨</span>
          <div style="flex-grow: 1;">
            <div style="font-weight:700; color:var(--emergency-light); font-size:15px; margin-bottom:4px;">${t.riskCriticalTitle}</div>
            <div style="font-size:13px; color:#FECACA; line-height: 1.4;">${t.riskCriticalSubtitle}</div>
          </div>
          <a href="emergency.html" class="btn btn-danger" style="flex-shrink:0;">${t.emergencyAlertBtn}</a>
        `;
      } else {
        symptomsInput.classList.remove('emergency-glow');
        if (liveAlert) {
          liveAlert.remove();
        }
      }
    });
  }

  const handleAnalysis = async function (e) {
    if (e) e.preventDefault();
    console.log("Analyze process started...");

    const symptomsInput = document.getElementById('symptomsInput');
    const analyzeBtnText = document.getElementById('analyzeBtnText');
    const analyzeSpinner = document.getElementById('analyzeSpinner');

    const symptomsText = symptomsInput ? symptomsInput.value.trim() : '';

    if (!symptomsText || symptomsText.length < 5) {
      const minCharMsg = DEFAULT_LANGUAGE === 'en' ? 'Please describe your symptoms (minimum 5 characters).' :
                         (DEFAULT_LANGUAGE === 'ar' ? 'يرجى وصف أعراضك (٥ أحرف كحد أدنى).' : 'Veuillez décrire vos symptômes (minimum 5 caractères).');
      showToast(minCharMsg, 'error');
      if (symptomsInput) symptomsInput.focus();
      return;
    }

    // Set loading state
    if (analyzeBtn) analyzeBtn.disabled = true;
    const loaderText = DEFAULT_LANGUAGE === 'en' ? 'Analyzing...' :
                       (DEFAULT_LANGUAGE === 'ar' ? 'جاري التحليل...' : 'Analyse en cours...');
    if (analyzeBtnText) analyzeBtnText.textContent = loaderText;
    if (analyzeSpinner) analyzeSpinner.style.display = 'inline-block';

    // Hide old results
    const resultCard = document.getElementById('resultCard');
    if (resultCard) resultCard.classList.remove('visible');

    try {
      const response = await analyzeSymptoms(symptomsText);

      if (response.success && response.data) {
        renderResult(response.data, response.requestId);

        // Save to history
        saveToHistory(symptomsText, response.data);

        // Toast based on urgency
        const urgency = response.data.urgencyLevel;
        if (urgency === 'emergency') {
          const msg = DEFAULT_LANGUAGE === 'en' ? '🚨 Emergency detected! Seek immediate care.' :
                      (DEFAULT_LANGUAGE === 'ar' ? '🚨 تم الكشف عن حالة طوارئ! اطلب الرعاية فورًا.' : '🚨 Urgence détectée ! Consultez immédiatement.');
          showToast(msg, 'error');
        } else if (urgency === 'high') {
          const msg = DEFAULT_LANGUAGE === 'en' ? '⚠️ High level — Quick consultation recommended.' :
                      (DEFAULT_LANGUAGE === 'ar' ? '⚠️ مستوى مرتفع — يوصى باستشارة سريعة.' : '⚠️ Niveau élevé — Consultation recommandée rapidement.');
          showToast(msg, 'error');
        } else {
          const msg = DEFAULT_LANGUAGE === 'en' ? '✅ Analysis completed successfully.' :
                      (DEFAULT_LANGUAGE === 'ar' ? '✅ تم التحليل بنجاح.' : '✅ Analyse terminée avec succès.');
          showToast(msg, 'success');
        }
      } else {
        const invalidApiMsg = DEFAULT_LANGUAGE === 'en' ? 'Invalid API response.' :
                              (DEFAULT_LANGUAGE === 'ar' ? 'استجابة غير صالحة من واجهة برمجة التطبيقات.' : "Réponse invalide de l'API.");
        throw new Error(invalidApiMsg);
      }
    } catch (err) {
      console.error("[analyzeSymptoms] Error caught:", err);
      // Friendly error: show mock result if backend is offline
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        let demoTitle = "⚠️ Backend hors ligne — affichage d'un résultat de démonstration.";
        let causeText = "Connexion au serveur impossible (mode démo)";
        let recText = "Veuillez démarrer le serveur backend avec `node server.js` et réessayer.";
        let specText = "Médecin généraliste";

        if (DEFAULT_LANGUAGE === 'en') {
          demoTitle = "⚠️ Server offline — displaying demonstration result.";
          causeText = "Could not connect to server (demo mode)";
          recText = "Please start the backend server with `node server.js` and try again.";
          specText = "General Practitioner";
        } else if (DEFAULT_LANGUAGE === 'ar') {
          demoTitle = "⚠️ الخادم غير متصل — عرض نتيجة تجريبية.";
          causeText = "تعذر الاتصال بالخادم (الوضع التجريبي)";
          recText = "يرجى تشغيل خادم الخلفية باستخدام `node server.js` وإعادة المحاولة.";
          specText = "طبيب عام";
        }

        showToast(demoTitle, 'error');
        renderResult({
          possibleCause: causeText,
          urgencyLevel: 'medium',
          recommendation: recText,
          specialistNeeded: specText,
        }, 'DEMO-' + Math.random().toString(36).substr(2, 8).toUpperCase());
      } else {
        const errorMsg = DEFAULT_LANGUAGE === 'en' ? `Error: ${err.message}` :
                         (DEFAULT_LANGUAGE === 'ar' ? `خطأ: ${err.message}` : `Erreur : ${err.message}`);
        showToast(errorMsg, 'error');
      }
    } finally {
      // Restore button state
      if (analyzeBtn) analyzeBtn.disabled = false;
      if (analyzeBtnText) {
        analyzeBtnText.textContent = DEFAULT_LANGUAGE === 'en' ? '🔍 Analyze with AI' :
                                     (DEFAULT_LANGUAGE === 'ar' ? '🔍 تحليل بواسطة الذكاء الاصطناعي' : "🔍 Analyser avec l'IA");
      }
      if (analyzeSpinner) analyzeSpinner.style.display = 'none';
    }
  };

  if (symptomForm) {
    symptomForm.addEventListener('submit', handleAnalysis);
  }
  
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalysis);
  }
});

/* ============================================================
   HOSPITALS — LOAD FROM API (optional, with static fallback)
   ============================================================ */
const ALL_HOSPITALS = [
  // Casablanca
  { name: "CHU Ibn Rochd", lat: 33.5898, lng: -7.6087, phone: "+212522224141", rating: 4.0, address: "Casablanca" },
  { name: "Hôpital Cheikh Khalifa", lat: 33.5601, lng: -7.6358, phone: "+212529004488", rating: 4.6, address: "Casablanca" },
  { name: "Clinique CNSS Sidi Maarouf", lat: 33.5358, lng: -7.6433, phone: "+212522580555", rating: 4.1, address: "Casablanca" },
  { name: "Hôpital Militaire de Casablanca", lat: 33.5432, lng: -7.6322, phone: "+212522858585", rating: 4.5, address: "Casablanca" },
  // Rabat
  { name: "Hôpital Ibn Sina", lat: 33.9822, lng: -6.8436, phone: "+212537672828", rating: 4.2, address: "Rabat" },
  { name: "Clinique Agdal", lat: 33.9989, lng: -6.8521, phone: "+212537778899", rating: 4.5, address: "Rabat" },
  { name: "Hôpital Militaire d'Instruction Mohammed V", lat: 33.9625, lng: -6.8488, phone: "+212537714400", rating: 4.7, address: "Rabat" },
  { name: "Hôpital Universitaire International Cheikh Zaid", lat: 33.9788, lng: -6.8688, phone: "+212537686868", rating: 4.6, address: "Rabat" },
  // Agadir
  { name: "Hôpital Hassan II", lat: 30.4222, lng: -9.5836, phone: "+212528841477", rating: 4.1, address: "Agadir" },
  { name: "Clinique Tilila", lat: 30.4055, lng: -9.5322, phone: "+212528211515", rating: 4.4, address: "Agadir" },
  { name: "Clinique les Spécialistes", lat: 30.4188, lng: -9.5933, phone: "+212528846868", rating: 4.3, address: "Agadir" },
  { name: "Clinique Paul Cézanne Agadir", lat: 30.4155, lng: -9.5755, phone: "+212528828282", rating: 4.2, address: "Agadir" },
  // Marrakech
  { name: "CHU Mohammed VI", lat: 31.6225, lng: -8.0128, phone: "+212524300700", rating: 4.0, address: "Marrakech" },
  { name: "Clinique Internationale de Marrakech", lat: 31.6422, lng: -8.0236, phone: "+212524368080", rating: 4.6, address: "Marrakech" },
  { name: "Hôpital Ibn Tofail", lat: 31.6355, lng: -8.0155, phone: "+212524438715", rating: 4.2, address: "Marrakech" },
  { name: "Clinique du Sud Marrakech", lat: 31.6288, lng: -8.0199, phone: "+212524447619", rating: 4.3, address: "Marrakech" },
  // Tanger
  { name: "Hôpital Mohammed V", lat: 35.7725, lng: -5.8122, phone: "+212539940156", rating: 3.9, address: "Tanger" },
  { name: "Clinique Al-Amal", lat: 35.7655, lng: -5.7955, phone: "+212539322232", rating: 4.3, address: "Tanger" },
  { name: "Hôpital Duc de Tovar", lat: 35.7855, lng: -5.8233, phone: "+212539932395", rating: 4.1, address: "Tanger" },
  { name: "Clinique Tangier-Med", lat: 35.7799, lng: -5.7988, phone: "+212539393939", rating: 4.4, address: "Tanger" }
];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

async function loadHospitals() {
  const list = document.getElementById('hospitalsList');
  if (!list) return; // Not on the emergency page

  const mapIframe = document.querySelector('iframe[aria-label="Carte des hôpitaux"]');

  // Loading state
  list.innerHTML = `
    <div style="text-align:center; padding: 24px; color:var(--text-muted);" id="geoLoadingState">
      <span class="spinner" style="display:inline-block; margin-bottom:8px;"></span>
      <div>Recherche de votre localisation pour trouver les hôpitaux les plus proches...</div>
    </div>
  `;

  if (!navigator.geolocation) {
    showToast("⚠️ Geolocation non supportée par votre navigateur.", "error");
    renderStaticHospitals();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`User coordinates: ${latitude}, ${longitude}`);

      // Dynamically update Google Map
      if (mapIframe) {
        mapIframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&t=m&z=13&output=embed&iwloc=near`;
      }

      // Calculate distances
      const hospitalsWithDistance = ALL_HOSPITALS.map(hosp => {
        const dist = getDistance(latitude, longitude, hosp.lat, hosp.lng);
        return { ...hosp, distance: dist.toFixed(1) };
      }).sort((a, b) => a.distance - b.distance);

      // Grab top 4 nearest
      const nearestHospitals = hospitalsWithDistance.slice(0, 4);

      // Render cards
      list.innerHTML = nearestHospitals.map((hosp, idx) => `
        <div class="hospital-card animate-fade-up" style="animation-delay:${idx * 0.05}s;">
          <div class="hospital-info">
            <h3>${hosp.name}</h3>
            <div class="hospital-meta">
              <span class="hospital-distance">📍 ${hosp.distance} km</span>
              <span class="stars">⭐ ${hosp.rating}</span>
              <span>${hosp.address}</span>
            </div>
          </div>
          <div class="hospital-actions">
            <a href="tel:${hosp.phone}" class="btn btn-danger" aria-label="Appeler ${hosp.name}">📞 Appeler</a>
            <a href="https://maps.google.com/?q=${encodeURIComponent(hosp.name + ' ' + hosp.address)}" target="_blank" class="btn btn-ghost" aria-label="Itinéraire ${hosp.name}">🗺️ Itinéraire</a>
          </div>
        </div>
      `).join('');

      showToast("📍 Position détectée — Hôpitaux les plus proches chargés.", "success", 2500);
    },
    (error) => {
      console.warn("Geolocation failure:", error);
      showToast("⚠️ Impossible de vous localiser. Affichage des hôpitaux par défaut.", "error", 4000);
      renderStaticHospitals();
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

function renderStaticHospitals() {
  const list = document.getElementById('hospitalsList');
  if (!list) return;

  list.innerHTML = `
    <div class="hospital-card animate-fade-up">
      <div class="hospital-info">
        <h3>Hôpital Ibn Sina</h3>
        <div class="hospital-meta">
          <span class="hospital-distance">📍 1.2 km</span>
          <span class="stars">⭐ 4.2</span>
          <span>Rabat</span>
        </div>
      </div>
      <div class="hospital-actions">
        <a href="tel:+212537672828" class="btn btn-danger" aria-label="Appeler Hôpital Ibn Sina">📞 Appeler</a>
        <a href="https://maps.google.com/?q=Hôpital+Ibn+Sina+Rabat" target="_blank" class="btn btn-ghost" aria-label="Itinéraire Hôpital Ibn Sina">🗺️ Itinéraire</a>
      </div>
    </div>

    <div class="hospital-card animate-fade-up" style="animation-delay:0.05s;">
      <div class="hospital-info">
        <h3>Clinique Agdal</h3>
        <div class="hospital-meta">
          <span class="hospital-distance">📍 2.5 km</span>
          <span class="stars">⭐ 4.5</span>
          <span>Rabat</span>
        </div>
      </div>
      <div class="hospital-actions">
        <a href="tel:+212537778899" class="btn btn-danger" aria-label="Appeler Clinique Agdal">📞 Appeler</a>
        <a href="https://maps.google.com/?q=Clinique+Agdal+Rabat" target="_blank" class="btn btn-ghost" aria-label="Itinéraire Clinique Agdal">🗺️ Itinéraire</a>
      </div>
    </div>

    <div class="hospital-card animate-fade-up" style="animation-delay:0.1s;">
      <div class="hospital-info">
        <h3>Hôpital Universitaire International Cheikh Zaid</h3>
        <div class="hospital-meta">
          <span class="hospital-distance">📍 3.1 km</span>
          <span class="stars">⭐ 4.6</span>
          <span>Rabat</span>
        </div>
      </div>
      <div class="hospital-actions">
        <a href="tel:+212537686868" class="btn btn-danger" aria-label="Appeler Hôpital Cheikh Zaid">📞 Appeler</a>
        <a href="https://maps.google.com/?q=Hôpital+Cheikh+Zaid+Rabat" target="_blank" class="btn btn-ghost" aria-label="Itinéraire Hôpital Cheikh Zaid">🗺️ Itinéraire</a>
      </div>
    </div>

    <div class="hospital-card animate-fade-up" style="animation-delay:0.15s;">
      <div class="hospital-info">
        <h3>CHU Ibn Rochd</h3>
        <div class="hospital-meta">
          <span class="hospital-distance">📍 3.8 km</span>
          <span class="stars">⭐ 4.0</span>
          <span>Casablanca</span>
        </div>
      </div>
      <div class="hospital-actions">
        <a href="tel:+212522224141" class="btn btn-danger" aria-label="Appeler CHU Ibn Rochd">📞 Appeler</a>
        <a href="https://maps.google.com/?q=CHU+Ibn+Rochd+Casablanca" target="_blank" class="btn btn-ghost" aria-label="Itinéraire CHU Ibn Rochd">🗺️ Itinéraire</a>
      </div>
    </div>
  `;
}

/* ============================================================
   INIT — Run on every page load
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Load hospitals data if on emergency page
  loadHospitals();

  // Load medical history
  if (typeof renderHistory === 'function') {
    renderHistory();
  }

  // Setup language switcher
  const langSwitcher = document.getElementById('langSwitcher');
  if (langSwitcher) {
    const savedLang = localStorage.getItem('medai_selected_lang');
    if (savedLang) {
      DEFAULT_LANGUAGE = savedLang;
      langSwitcher.value = savedLang;
    }
    applyTranslations(DEFAULT_LANGUAGE);

    langSwitcher.addEventListener('change', (e) => {
      DEFAULT_LANGUAGE = e.target.value;
      localStorage.setItem('medai_selected_lang', DEFAULT_LANGUAGE);
      applyTranslations(DEFAULT_LANGUAGE);
      
      // Update dangerous symptoms warning if active
      const symptomsInput = document.getElementById('symptomsInput');
      if (symptomsInput) {
        symptomsInput.dispatchEvent(new Event('input'));
      }
      
      // Re-render history list to update dates / states
      if (typeof renderHistory === 'function') {
        renderHistory();
      }
    });
  } else {
    const savedLang = localStorage.getItem('medai_selected_lang');
    if (savedLang) {
      DEFAULT_LANGUAGE = savedLang;
    }
    applyTranslations(DEFAULT_LANGUAGE);
  }
});

/* ============================================================
   HISTORY AND COPY LOGIC
   ============================================================ */
function saveToHistory(symptoms, data) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('ia_doctor_history') || '[]');
  } catch (e) {
    history = [];
  }
  
  // Calculate risk percentage
  let riskPercent = 55;
  if (data.urgencyLevel === 'low') {
    riskPercent = 20;
  } else if (data.urgencyLevel === 'high' || data.urgencyLevel === 'emergency') {
    riskPercent = 90;
  }
  
  const entry = {
    id: Date.now().toString(),
    date: new Date().toLocaleString('fr-FR'),
    symptoms: symptoms,
    urgencyLevel: data.urgencyLevel,
    riskPercentage: riskPercent,
    possibleCause: data.possibleCause,
    specialistNeeded: data.specialistNeeded
  };
  
  history.unshift(entry);
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  localStorage.setItem('ia_doctor_history', JSON.stringify(history));
  
  // Update view immediately
  if (typeof renderHistory === 'function') {
    renderHistory();
  }
}

window.renderHistory = function() {
  const list = document.getElementById('historyList');
  if (!list) return; // Not on the dashboard page

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('ia_doctor_history') || '[]');
  } catch (e) {
    history = [];
  }

  const t = translations[DEFAULT_LANGUAGE] || translations['fr'];

  if (history.length === 0) {
    list.innerHTML = `
      <div style="text-align:center; padding:20px; color:var(--text-muted);">${t.emptyHistory}</div>
    `;
    return;
  }

  list.innerHTML = history.map(entry => {
    let riskColor = '#FBBF24'; // Yellow
    let riskBorder = 'rgba(251, 191, 36, 0.2)';
    if (entry.urgencyLevel === 'low') {
      riskColor = '#10B981'; // Green
      riskBorder = 'rgba(16, 185, 129, 0.2)';
    } else if (entry.urgencyLevel === 'high' || entry.urgencyLevel === 'emergency') {
      riskColor = '#EF4444'; // Red
      riskBorder = 'rgba(239, 68, 68, 0.2)';
    }

    const dateLocale = DEFAULT_LANGUAGE === 'en' ? 'en-US' : (DEFAULT_LANGUAGE === 'ar' ? 'ar-MA' : 'fr-FR');
    const entryTime = entry.timestamp || parseInt(entry.id) || Date.now();
    const formattedDate = new Date(entryTime).toLocaleString(dateLocale);

    const riskLabel = DEFAULT_LANGUAGE === 'en' ? 'Risk' : (DEFAULT_LANGUAGE === 'ar' ? 'خطر' : 'Risque');
    const deleteTooltip = DEFAULT_LANGUAGE === 'en' ? 'Delete from history' : (DEFAULT_LANGUAGE === 'ar' ? 'حذف من السجل' : "Supprimer de l'historique");
    const symptomsLabel = DEFAULT_LANGUAGE === 'en' ? 'Reported symptoms' : (DEFAULT_LANGUAGE === 'ar' ? 'الأعراض المصرح بها' : 'Symptômes déclarés');
    const causeLabel = DEFAULT_LANGUAGE === 'en' ? 'Suspected cause' : (DEFAULT_LANGUAGE === 'ar' ? 'السبب المحتمل' : 'Cause suspectée');
    const specialistLabel = DEFAULT_LANGUAGE === 'en' ? 'Specialist' : (DEFAULT_LANGUAGE === 'ar' ? 'الأخصائي' : 'Spécialiste');

    return `
      <div class="history-card animate-fade-up" style="background:var(--bg-glass); border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px; display:flex; flex-direction:column; gap:10px; position:relative; backdrop-filter: blur(10px);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
          <div style="font-size:12px; color:var(--text-muted); font-weight:500;">📅 ${formattedDate}</div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${renderUrgencyBadge(entry.urgencyLevel)}
            <span style="background:rgba(255,255,255,0.05); font-size:11px; padding:2px 8px; border-radius:100px; font-weight:700; color: ${riskColor}; border:1px solid ${riskBorder}">${entry.riskPercentage}% ${riskLabel}</span>
            <button onclick="deleteHistoryItem('${entry.id}')" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:14px; padding:2px; transition: color 0.2s;" onmouseover="this.style.color='#EF4444'" onmouseout="this.style.color='var(--text-muted)'" title="${deleteTooltip}">🗑️</button>
          </div>
        </div>
        
        <div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted); margin-bottom:4px;">${symptomsLabel}</div>
          <div style="font-size:13px; color:var(--text-secondary); line-height:1.4; word-break:break-word;">${entry.symptoms}</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; border-top:1px solid rgba(255,255,255,0.05); padding-top:10px; margin-top:4px;">
          <div>
            <div style="font-size:11px; color:var(--text-muted); margin-bottom:2px;">${causeLabel}</div>
            <div style="font-size:13px; font-weight:600; color:var(--text-primary);">${entry.possibleCause}</div>
          </div>
          <div>
            <div style="font-size:11px; color:var(--text-muted); margin-bottom:2px;">${specialistLabel}</div>
            <div style="font-size:13px; font-weight:600; color:var(--primary-light);">${entry.specialistNeeded}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.deleteHistoryItem = function(id) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('ia_doctor_history') || '[]');
  } catch (e) {
    history = [];
  }

  history = history.filter(item => item.id !== id);
  localStorage.setItem('ia_doctor_history', JSON.stringify(history));
  renderHistory();
  
  const toastMsg = DEFAULT_LANGUAGE === 'en' ? '✅ Analysis deleted from history.' :
                   (DEFAULT_LANGUAGE === 'ar' ? '✅ تم حذف التحليل من السجل.' : "✅ Analyse supprimée de l'historique.");
  showToast(toastMsg, 'success', 2000);
};

window.clearAllHistory = function() {
  const confirmMsg = DEFAULT_LANGUAGE === 'en' ? 'Do you really want to clear your entire medical history?' :
                     (DEFAULT_LANGUAGE === 'ar' ? 'هل تريد حقًا مسح سجلك الطبي بالكامل؟' : 'Voulez-vous vraiment effacer tout votre historique médical ?');
  const toastMsg = DEFAULT_LANGUAGE === 'en' ? '🗑️ Medical history fully cleared.' :
                   (DEFAULT_LANGUAGE === 'ar' ? '🗑️ تم مسح السجل بالكامل.' : '🗑️ Historique entièrement effacé.');

  if (confirm(confirmMsg)) {
    localStorage.removeItem('ia_doctor_history');
    renderHistory();
    showToast(toastMsg, 'success', 2000);
  }
};

window.copyDiagnostic = function() {
  const causeEl = document.getElementById('resultCause');
  const specEl = document.getElementById('resultSpecialist');
  const sympEl = document.getElementById('symptomsInput');
  
  const resultCause = causeEl ? causeEl.textContent : '';
  const resultSpecialist = specEl ? specEl.textContent : '';
  const symptomsInput = sympEl ? sympEl.value : '';
  
  const badgeContainer = document.getElementById('urgencyBadge');
  const urgencyText = badgeContainer ? badgeContainer.textContent.trim() : '';

  const symptomsLabel = DEFAULT_LANGUAGE === 'en' ? 'Symptoms' : (DEFAULT_LANGUAGE === 'ar' ? 'الأعراض' : 'Symptômes');
  const causeLabel = DEFAULT_LANGUAGE === 'en' ? 'Possible Cause' : (DEFAULT_LANGUAGE === 'ar' ? 'السبب المحتمل' : 'Cause possible');
  const urgencyLabel = DEFAULT_LANGUAGE === 'en' ? 'Urgency' : (DEFAULT_LANGUAGE === 'ar' ? 'مستوى الطوارئ' : 'Urgence');
  const specialistLabel = DEFAULT_LANGUAGE === 'en' ? 'Recommended Specialist' : (DEFAULT_LANGUAGE === 'ar' ? 'الأخصائي الموصى به' : 'Spécialiste conseillé');
  const generatedLabel = DEFAULT_LANGUAGE === 'en' ? 'Generated by IA Doctor' : (DEFAULT_LANGUAGE === 'ar' ? 'تم إنشاؤه بواسطة IA Doctor' : 'Généré par IA Doctor');
  const dateLocale = DEFAULT_LANGUAGE === 'en' ? 'en-US' : (DEFAULT_LANGUAGE === 'ar' ? 'ar-MA' : 'fr-FR');

  const textToCopy = `🩺 IA Doctor — ${new Date().toLocaleString(dateLocale)}
${symptomsLabel}: ${symptomsInput}
${causeLabel}: ${resultCause}
${urgencyLabel}: ${urgencyText}
${specialistLabel}: ${resultSpecialist}

${generatedLabel}`;

  const successCopy = DEFAULT_LANGUAGE === 'en' ? '✅ Diagnostic copied to clipboard!' : 
                      (DEFAULT_LANGUAGE === 'ar' ? '✅ تم نسخ التشخيص إلى الحافظة!' : '✅ Diagnostic copié dans le presse-papiers !');
  const errorCopy = DEFAULT_LANGUAGE === 'en' ? 'Error during copy' : 
                    (DEFAULT_LANGUAGE === 'ar' ? 'خطأ أثناء النسخ' : 'Erreur lors de la copie');

  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast(successCopy, 'success', 2000);
  }).catch(err => {
    showToast(errorCopy, 'error');
  });
};

/* ============================================================
   PDF DIAGNOSTIC EXPORT
   ============================================================ */
window.downloadPDF = function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const data = window.lastAnalysisResult;
  if (!data) {
    const errorMsg = DEFAULT_LANGUAGE === 'en' ? "⚠️ No diagnosis available to download." : 
                     (DEFAULT_LANGUAGE === 'ar' ? "⚠️ لا يوجد تشخيص متاح للتحميل." : "⚠️ Aucun diagnostic disponible à télécharger.");
    showToast(errorMsg, "error");
    return;
  }

  // Handle standard PDF font fallback for Arabic to prevent glyph rendering issues
  let pdfLang = DEFAULT_LANGUAGE;
  if (pdfLang === 'ar') {
    pdfLang = 'fr';
    showToast('📄 Rapport PDF généré en Français (police standard).', 'success', 3000);
  }
  
  const pt = translations[pdfLang] || translations['fr'];

  const symptomsText = document.getElementById('symptomsInput') ? document.getElementById('symptomsInput').value.trim() : '—';
  const causeText = data.possibleCause || '—';
  const recText = data.recommendation || '—';
  const specialistText = data.specialistNeeded || '—';
  
  let riskPercent = '55%';
  let riskColor = [245, 158, 11]; // Yellow
  let riskLabel = pdfLang === 'en' ? 'Moderate' : 'Modéré';
  
  if (data.urgencyLevel === 'low') {
    riskPercent = '20%';
    riskColor = [16, 185, 129]; // Green
    riskLabel = pdfLang === 'en' ? 'Low' : 'Faible';
  } else if (data.urgencyLevel === 'high' || data.urgencyLevel === 'emergency') {
    riskPercent = '90%';
    riskColor = [239, 68, 68]; // Red
    riskLabel = data.urgencyLevel === 'emergency' ? 
                (pdfLang === 'en' ? 'URGENT (CRITICAL)' : 'URGENT (CRITIQUE)') : 
                (pdfLang === 'en' ? 'High' : 'Élevé');
  }

  // --- HEADER & LOGO ---
  doc.setFillColor(15, 23, 42); // Deep slate
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("IA DOCTOR", 20, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text(pt.pdfHeaderSubtitle, 20, 28);

  // Date and Time (Top Right)
  const today = new Date().toLocaleString(pdfLang === 'en' ? 'en-US' : 'fr-FR');
  const emitLabel = pdfLang === 'en' ? 'Issued on' : 'Émis le';
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`${emitLabel}: ${today}`, 135, 20);

  // Decorative border under header
  doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.rect(0, 40, 210, 3, 'F');

  let y = 60;

  // --- SECTION: SYMPTOMES ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text(pt.pdfSymptomTitle, 20, y);
  
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);

  const splitSymptoms = doc.splitTextToSize(symptomsText, 170);
  doc.text(splitSymptoms, 20, y);
  
  y += (splitSymptoms.length * 6) + 12;

  // --- SECTION: IA ANALYSIS & RISK SCORE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text(pt.pdfAnalysisTitle, 20, y);

  y += 8;

  // Draw a beautiful shaded result card background
  doc.setFillColor(248, 250, 252);
  doc.rect(20, y, 170, 50, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(20, y, 170, 50, 'S');

  // Draw colored risk indicator bar
  doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.rect(25, y + 5, 5, 40, 'F');

  // Text details inside card
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(pt.pdfOrientationLabel, 35, y + 12);
  doc.setFont("helvetica", "normal");
  doc.text(causeText, 35, y + 18);

  doc.setFont("helvetica", "bold");
  doc.text(pt.pdfUrgencyLabel, 35, y + 28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  const estimatedLabel = pdfLang === 'en' ? 'estimated risk' : 'de risque estimé';
  doc.text(`${riskLabel} (${riskPercent} ${estimatedLabel})`, 35, y + 34);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text(pt.pdfSpecialistLabel, 35, y + 43);
  doc.setFont("helvetica", "normal");
  doc.text(specialistText, 95, y + 43);

  y += 62;

  // --- SECTION: RECOMMANDATIONS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text(pt.pdfRecTitle, 20, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);

  const splitRecs = doc.splitTextToSize(recText, 170);
  doc.text(splitRecs, 20, y);

  y += (splitRecs.length * 6) + 12;

  // --- SECTION: MEDICAL ESTABLISHMENTS ---
  if (data.doctors && data.doctors.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59);
    doc.text(pt.pdfDocsTitle, 20, y);

    y += 8;

    data.doctors.forEach((docItem, idx) => {
      if (y > 260) {
        doc.addPage();
        y = 30;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(`${idx + 1}. ${docItem.name} — ${docItem.specialty}`, 20, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      const addressLabel = pdfLang === 'en' ? 'Address' : 'Adresse';
      const telLabel = pdfLang === 'en' ? 'Tel' : 'Tél';
      doc.text(`${addressLabel}: ${docItem.address} | ${telLabel}: ${docItem.phone}`, 20, y + 5);

      y += 12;
    });
  }

  // --- FOOTER (DISCLAIMER) ---
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  
  const splitDisclaimer = doc.splitTextToSize(pt.pdfDisclaimer, 170);
  doc.text(splitDisclaimer, 20, 282);

  // Trigger automatic download
  const safeFileName = `IA_Doctor_Diagnostic_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(safeFileName);
  
  const successMsg = DEFAULT_LANGUAGE === 'en' ? '📄 Diagnostic report exported successfully!' : 
                     (DEFAULT_LANGUAGE === 'ar' ? '📄 تم تصدير تقرير التشخيص بنجاح!' : '📄 Diagnostic exporté avec succès !');
  showToast(successMsg, 'success', 2000);
};

/* ============================================================
   VOICE INPUT (SPEECH RECOGNITION)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const micBtn = document.getElementById('micBtn');
  const micBtnText = document.getElementById('micBtnText');
  const symptomsInput = document.getElementById('symptomsInput');

  if (!micBtn || !symptomsInput) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    micBtn.style.display = 'none'; // Hide if browser doesn't support it
    console.warn("Speech Recognition API not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false; // Disable interim to avoid text duplication/delay issues
  
  let isRecording = false;

  const updateLanguage = () => {
    if (DEFAULT_LANGUAGE === 'fr') recognition.lang = 'fr-FR';
    else if (DEFAULT_LANGUAGE === 'ar') recognition.lang = 'ar-MA';
    else recognition.lang = 'en-US';
  };

  micBtn.addEventListener('click', () => {
    if (isRecording) {
      recognition.stop();
    } else {
      updateLanguage();
      try {
        recognition.start();
      } catch (err) {
        console.error("Speech recognition start error:", err);
      }
    }
  });

  recognition.onstart = () => {
    isRecording = true;
    micBtn.classList.add('mic-recording');
    micBtnText.textContent = DEFAULT_LANGUAGE === 'en' ? 'Listening...' : 
                            (DEFAULT_LANGUAGE === 'ar' ? 'يستمع...' : 'Écoute...');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Speech transcript:", transcript);

    if (transcript && transcript.trim() !== '') {
      const currentValue = symptomsInput.value.trim();
      symptomsInput.value = currentValue ? currentValue + ' ' + transcript.trim() : transcript.trim();
      symptomsInput.dispatchEvent(new Event('input'));
    }
    
    recognition.stop();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    isRecording = false;
    micBtn.classList.remove('mic-recording');
    
    // Reset text
    micBtnText.textContent = DEFAULT_LANGUAGE === 'en' ? 'Voice Dictation' : 
                            (DEFAULT_LANGUAGE === 'ar' ? 'إملاء صوتي' : 'Dictée vocale');
    
    if (event.error === 'not-allowed') {
      showToast('⚠️ Accès au microphone refusé. Autorisez-le dans votre navigateur.', 'error');
    } else if (event.error === 'no-speech') {
      // Ignore silent timeouts without showing an error to the user
    } else {
      showToast('⚠️ Erreur de reconnaissance vocale.', 'error');
    }
  };

  recognition.onend = () => {
    isRecording = false;
    micBtn.classList.remove('mic-recording');
    micBtnText.textContent = DEFAULT_LANGUAGE === 'en' ? 'Voice Dictation' : 
                            (DEFAULT_LANGUAGE === 'ar' ? 'إملاء صوتي' : 'Dictée vocale');
  };
});
