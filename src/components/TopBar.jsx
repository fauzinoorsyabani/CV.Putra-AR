import React from 'react';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="top-notice-bar">
      <div className="top-notice-left">
        <div className="top-notice-item">
          <MapPin />
          <span>Pabrik: Sukahurip, Kabupaten Ciamis, Jawa Barat 46262</span>
        </div>
        <div className="top-notice-item">
          <Clock />
          <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
        </div>
      </div>
      <div className="top-notice-right">
        <div className="top-notice-item">
          <Phone />
          <span>(0265) 5401232</span>
        </div>
        <div className="top-notice-item">
          <MessageCircle />
          <span>WA: +62 813-1064-1534</span>
        </div>
      </div>
    </div>
  );
};
