const sampleListings = [
  {
    title: 'Cozy Cabin in the Woods',
    description: 'A peaceful retreat surrounded by nature.',
    image: {
      filename: 'cabin1.jpg',
      url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 120,
    location: 'Aspen, Colorado',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-106.8175, 39.1911], // Longitude, Latitude
    },
  },
  {
    title: 'Modern Apartment Downtown',
    description: 'A stylish apartment in the heart of the city.',
    image: {
      filename: 'apartment1.jpg',
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 150,
    location: 'New York City, New York',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-74.006, 40.7128],
    },
  },
  {
    title: 'Beachfront Bungalow',
    description: 'Wake up to the sound of waves.',
    image: {
      filename: 'beach1.jpg',
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    price: 200,
    location: 'Malibu, California',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-118.7798, 34.0259],
    },
  },
  {
    title: 'Rustic Mountain Lodge',
    description: 'Perfect for winter getaways and skiing.',
    image: {
      filename: 'lodge1.jpg',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    price: 180,
    location: 'Banff, Alberta',
    country: 'Canada',
    geometry: {
      type: 'Point',
      coordinates: [-115.5708, 51.1784],
    },
  },
  {
    title: 'Charming Parisian Studio',
    description: 'A romantic stay in the City of Lights.',
    image: {
      filename: 'paris1.jpg',
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 170,
    location: 'Paris',
    country: 'France',
    geometry: {
      type: 'Point',
      coordinates: [2.3522, 48.8566],
    },
  },
  {
    title: 'Santorini Cliffside Villa',
    description: 'Enjoy breathtaking sunset views.',
    image: {
      filename: 'santorini1.jpg',
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 250,
    location: 'Santorini',
    country: 'Greece',
    geometry: {
      type: 'Point',
      coordinates: [25.4313, 36.3932],
    },
  },
  {
    title: 'Japanese Ryokan Experience',
    description: 'A traditional stay with onsen baths.',
    image: {
      filename: 'japan1.jpg',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    price: 190,
    location: 'Kyoto',
    country: 'Japan',
    geometry: {
      type: 'Point',
      coordinates: [135.7681, 35.0116],
    },
  },
  {
    title: 'Overwater Bungalow in Maldives',
    description: 'Stay above crystal-clear waters.',
    image: {
      filename: 'maldives1.jpg',
      url: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 500,
    location: 'Malé',
    country: 'Maldives',
    geometry: {
      type: 'Point',
      coordinates: [73.5089, 4.1755],
    },
  },
  {
    title: 'Desert Dome Home',
    description: 'Experience the magic of the desert.',
    image: {
      filename: 'desert1.jpg',
      url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    price: 130,
    location: 'Joshua Tree, California',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-116.3131, 34.1347],
    },
  },
  {
    title: 'Floating House in Amsterdam',
    description: 'A unique stay on the canal.',
    image: {
      filename: 'amsterdam1.jpg',
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    price: 220,
    location: 'Amsterdam',
    country: 'Netherlands',
    geometry: {
      type: 'Point',
      coordinates: [4.9041, 52.3676],
    },
  },
  {
    title: 'Luxury Loft in London',
    description: 'Stay in style in the heart of London.',
    image: {
      filename: 'london1.jpg',
      url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 280,
    location: 'London',
    country: 'United Kingdom',
    geometry: {
      type: 'Point',
      coordinates: [-0.1276, 51.5074],
    },
  },
  {
    title: 'Secluded Treehouse in Costa Rica',
    description: 'Stay in a treehouse surrounded by nature.',
    image: {
      filename: 'treehouse1.jpg',
      url: 'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 175,
    location: 'Monteverde',
    country: 'Costa Rica',
    geometry: {
      type: 'Point',
      coordinates: [-84.8254, 10.3083],
    },
  },
  {
    title: 'Historic Villa in Rome',
    description: 'Experience the charm of an old Roman villa.',
    image: {
      filename: 'rome1.jpg',
      url: 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    price: 300,
    location: 'Rome',
    country: 'Italy',
    geometry: {
      type: 'Point',
      coordinates: [12.4964, 41.9028],
    },
  },
];

module.exports = { data: sampleListings };
