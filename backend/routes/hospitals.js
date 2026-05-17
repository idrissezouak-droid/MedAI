const express = require('express');
const router = express.Router();

const hospitals = [
  {
    id: 1,
    name: 'Hôpital Ibn Sina',
    city: 'Rabat',
    distance: '1.2km',
    phone: '+212537672828',
    rating: 4.2,
  },
  {
    id: 2,
    name: 'Clinique Agdal',
    city: 'Rabat',
    distance: '2.5km',
    phone: '+212537778899',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'CHU Ibn Rochd',
    city: 'Casablanca',
    distance: '3.8km',
    phone: '+212522224141',
    rating: 4.0,
  },
  {
    id: 4,
    name: 'Hôpital Cheikh Khalifa',
    city: 'Casablanca',
    distance: '5.1km',
    phone: '+212522909090',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Clinique Al Farabi',
    city: 'Rabat',
    distance: '6.3km',
    phone: '+212537123456',
    rating: 3.9,
  },
];

router.get('/nearby', (req, res) => {
  return res.status(200).json({
    success: true,
    count: hospitals.length,
    data: hospitals,
  });
});

module.exports = router;
