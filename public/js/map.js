mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12',
  center: listing.geometry.coordinates,
  zoom: 8,
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red' })
  .setLngLat(listing.geometry.coordinates) // listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${listing.title}</h3><p> Exact Location provided after booking</p>`
      )
      .setMaxWidth('300px')
  )

  .addTo(map);
