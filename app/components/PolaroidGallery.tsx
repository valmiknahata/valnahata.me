"use client";

import React from "react";
import { LightboxImage } from "./ImageLightbox";

interface PolaroidGalleryProps {
  photos: LightboxImage[];
  startIndex?: number;
  onPhotoClick?: (globalIndex: number) => void;
  rotations?: number[];
}

export default function PolaroidGallery({
  photos,
}: PolaroidGalleryProps) {
  return (
    <div className="polaroid-gallery-wrapper">
      <div className={`polaroid-row polaroid-row-${photos.length}`}>
        {photos.map((photo) => (
          <div key={photo.src} className="polaroid-card">
            <div className="polaroid-photo">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            {photo.caption ? (
              <div className="polaroid-caption">
                <p>{photo.caption}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
