const express = require('express');
const router = express.Router();

const analyzeSymptoms = (symptoms) => {
  const s = symptoms.toLowerCase();
  
  let result = {
    possibleCause: "Symptômes nécessitant une évaluation médicale détaillée.",
    urgencyLevel: "medium",
    recommendation: "Veuillez consulter un médecin pour obtenir un diagnostic précis et des examens complémentaires.",
    specialistNeeded: "Généraliste",
    doctors: [
      { name: "Dr. Fatima Alaoui", specialty: "Généraliste", rating: 4.6, address: "Avenue Hassan II, Rabat", phone: "+212537234567", distance: "0.8 km" }
    ]
  };

  if (s.includes('poitrine') || s.includes('coeur') || s.includes('respir')) {
    result = {
      possibleCause: "Douleur thoracique potentiellement grave, nécessitant un électrocardiogramme urgent.",
      urgencyLevel: "emergency",
      recommendation: "Arrêtez toute activité, asseyez-vous, ne conduisez pas et appelez le 15 immédiatement.",
      specialistNeeded: "Cardiologue",
      doctors: [
        { name: "Dr. Youssef Tahiri", specialty: "Cardiologue", rating: 4.9, address: "Boulevard Zerktouni, Casablanca", phone: "+212522345678", distance: "2.1 km" }
      ]
    };
  } else if (s.includes('tete') || s.includes('tête') || s.includes('migraine') || s.includes('headache')) {
    result = {
      possibleCause: "Céphalée aiguë, potentiellement une migraine ou céphalée de tension sévère.",
      urgencyLevel: "medium",
      recommendation: "Isolez-vous dans une pièce sombre et silencieuse. Consultez si la douleur résiste aux antalgiques.",
      specialistNeeded: "Neurologue",
      doctors: [
        { name: "Dr. Hassan Bennani", specialty: "Neurologue", rating: 4.8, address: "Rue Mohammed V, Rabat", phone: "+212537123456", distance: "1.2 km" }
      ]
    };
  } else if (s.includes('ventre') || s.includes('estomac') || s.includes('nausee')) {
    result = {
      possibleCause: "Troubles gastro-intestinaux, suspicion d'intoxication alimentaire ou de gastrite.",
      urgencyLevel: "medium",
      recommendation: "Privilégiez une alimentation légère, hydratez-vous par petites gorgées régulières.",
      specialistNeeded: "Gastro-entérologue",
      doctors: [
        { name: "Dr. Amina Chakir", specialty: "Gastro-entérologue", rating: 4.7, address: "Quartier Agdal, Rabat", phone: "+212537345678", distance: "3.4 km" }
      ]
    };
  } else if (s.includes('fievre') || s.includes('grippe') || s.includes('infection')) {
    result = {
      possibleCause: "Syndrome grippal ou infection systémique nécessitant une évaluation.",
      urgencyLevel: "medium",
      recommendation: "Prenez du paracétamol en respectant les doses. Consultez si la fièvre persiste plus de 48h.",
      specialistNeeded: "Généraliste",
      doctors: [
        { name: "Dr. Fatima Alaoui", specialty: "Généraliste", rating: 4.6, address: "Avenue Hassan II, Rabat", phone: "+212537234567", distance: "0.8 km" }
      ]
    };
  } else if (s.includes('dos') || s.includes('colonne') || s.includes('lombaire')) {
    result = {
      possibleCause: "Lombalgie aiguë, lumbago ou tension musculaire importante du dos.",
      urgencyLevel: "low",
      recommendation: "Évitez les efforts physiques, appliquez de la chaleur sur la zone et gardez une bonne posture.",
      specialistNeeded: "Rhumatologue",
      doctors: [
        { name: "Dr. Karim Tazi", specialty: "Rhumatologue", rating: 4.5, address: "Maârif, Casablanca", phone: "+212522456789", distance: "4.5 km" }
      ]
    };
  } else if (s.includes('yeux') || s.includes('vision') || s.includes('oeil')) {
    result = {
      possibleCause: "Trouble oculaire, risque de conjonctivite, glaucome ou fatigue visuelle.",
      urgencyLevel: "medium",
      recommendation: "Évitez l'exposition aux écrans, ne vous frottez pas les yeux et rincez au sérum physiologique.",
      specialistNeeded: "Ophtalmologue",
      doctors: [
        { name: "Dr. Salma Idrissi", specialty: "Ophtalmologue", rating: 4.8, address: "Centre Ville, Rabat", phone: "+212537567890", distance: "1.5 km" }
      ]
    };
  } else if (s.includes('peau') || s.includes('rash') || s.includes('allergie')) {
    result = {
      possibleCause: "Réaction allergique, urticaire ou éruption cutanée type dermatite.",
      urgencyLevel: "low",
      recommendation: "Évitez de gratter la zone, identifiez l'allergène potentiel et prenez un antihistaminique si prescrit.",
      specialistNeeded: "Dermatologue",
      doctors: [
        { name: "Dr. Omar Berrada", specialty: "Dermatologue", rating: 4.7, address: "Bourgogne, Casablanca", phone: "+212522678901", distance: "5.0 km" }
      ]
    };
  }

  return result;
};

router.post('/analyze', (req, res) => {
  const { symptoms, userId, language } = req.body;
  if (!symptoms || symptoms.trim().length < 3) {
    return res.status(400).json({ success: false, message: "Symptoms required" });
  }
  const data = analyzeSymptoms(symptoms);
  return res.json({ success: true, data, requestId: 'REQ-' + Date.now() });
});

module.exports = router;
