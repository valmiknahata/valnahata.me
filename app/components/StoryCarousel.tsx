'use client';

import { useState } from 'react';

export interface CarouselSlide {
  src?: string;
  alt: string;
  caption: string;
  tag?: string;
}

interface StoryCarouselProps {
  slides: CarouselSlide[];
}

export default function StoryCarousel({ slides }: StoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentIndex];

  return (
    <div style={{ margin: '1.6em 0 2.4em 0', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          maxHeight: '440px',
          background: '#f8f8f8',
          border: '1px solid rgba(0, 0, 0, 0.09)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 3px 14px rgba(0, 0, 0, 0.03)',
        }}
      >
        {current.src ? (
          <img
            src={current.src}
            alt={current.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, #fbfbfb 0%, #eeeeee 100%)',
              color: '#444',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                color: '#666',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: '19px',
                color: '#1a1a1a',
                lineHeight: 1.4,
                maxWidth: '460px',
              }}
            >
              {current.alt}
            </div>
            {current.tag && (
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#777',
                  marginTop: '6px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
              >
                {current.tag}
              </div>
            )}
          </div>
        )}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontSize: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'background 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          &larr;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            fontSize: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'background 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          &rarr;
        </button>
      </div>

      {/* Caption & Dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: '10px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontStyle: 'italic',
            fontFamily: "'Crimson Text', serif",
            fontSize: '16px',
            color: '#444',
            flex: '1 1 auto',
          }}
        >
          {current.caption}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#888' }}>
            {currentIndex + 1} / {slides.length}
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: idx === currentIndex ? '#1f4e8c' : 'rgba(0, 0, 0, 0.18)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
