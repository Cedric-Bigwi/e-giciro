import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RWANDA_CENTER } from '../../utils/constants';
import { formatRWF } from '../../utils/helpers';

// Default Leaflet marker icons reference image files that don't resolve
// correctly under Vite's bundling, so we rebuild the icon from CDN URLs.
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function OfferMap({ offers }) {
  const geolocated = offers.filter((o) => o.latitude && o.longitude);

  return (
    <div className="card overflow-hidden">
      <MapContainer center={RWANDA_CENTER} zoom={8} scrollWheelZoom={false} style={{ height: '480px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geolocated.map((offer) => (
          <Marker key={offer.id} position={[offer.latitude, offer.longitude]} icon={markerIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{offer.product_name}</p>
                <p className="text-primary-700 font-semibold">{formatRWF(offer.price)}</p>
                <p className="text-ink/60">
                  {offer.type === 'sell' ? 'Selling' : 'Buying'} in {offer.district}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
