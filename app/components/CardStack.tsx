"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 3,

  cardWidth = 420,
  cardHeight = 250,

  overlap = 0.68,
  spreadDeg = 0,

  perspectivePx = 1000,
  depthPx = 0,
  tiltXDeg = 0,

  activeLiftPx = 0,
  activeScale = 1,
  inactiveScale = 1,

  springStiffness = 300,
  springDamping = 30,

  loop = true,
  autoAdvance = false,
  intervalMs = 3200,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // keyboard navigation (when container focused)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: cardHeight + 20 }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Subtle ambient spotlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-2 mx-auto h-28 w-[50%] max-w-[340px] rounded-full bg-black/5 blur-2xl"
          aria-hidden="true"
        />

        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              // hide far-away cards cleanly
              if (!visible) return null;

              // geometry: strictly parallel on the same line plane
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = 0;
              const z = -abs * depthPx;

              const isActive = off === 0;

              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;

              // Active card always on top; closer cards above farther cards
              const zIndex = 50 - abs * 5;

              // drag only on the active card
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: any,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(140, cardWidth * 0.22);

                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute rounded-xl overflow-hidden border border-black/10 dark:border-white/10",
                    isActive
                      ? "cursor-grab active:cursor-grabbing shadow-2xl"
                      : "cursor-pointer shadow-md",
                    "will-change-transform select-none",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x,
                          y: y + lift,
                          scale: 0.96,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div className="h-full w-full">
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation: arrows + dots */}
      <div className="mt-3 flex items-center justify-center gap-4 select-none">
        <button
          onClick={prev}
          className="text-black/40 hover:text-black transition"
          aria-label="Previous image"
          style={{ cursor: "pointer", background: "none", border: "none", fontSize: "16px", lineHeight: 1, padding: "4px" }}
        >
          &larr;
        </button>

        {showDots ? (
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    on
                      ? "bg-black"
                      : "bg-black/20 hover:bg-black/40",
                  )}
                  style={{ cursor: "pointer", border: "none", padding: 0 }}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
        ) : null}

        <button
          onClick={next}
          className="text-black/40 hover:text-black transition"
          aria-label="Next image"
          style={{ cursor: "pointer", background: "none", border: "none", fontSize: "16px", lineHeight: 1, padding: "4px" }}
        >
          &rarr;
        </button>

        {activeItem.href ? (
          <Link
            href={activeItem.href}
            target="_blank"
            rel="noreferrer"
            className="text-black/40 hover:text-black transition"
            aria-label="Open link"
          >
            <SquareArrowOutUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Dim overlay on inactive cards */}
      {!active && (
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300" />
      )}

      {/* Subtle bottom gradient on active card for text readability */}
      {active && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      )}

      {/* Caption: cleanly presented on the active card */}
      {active && (
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <div className="truncate text-base font-semibold text-white drop-shadow-sm">
            {item.title}
          </div>
          {item.description ? (
            <div className="mt-1 line-clamp-2 text-xs text-white/85 leading-snug drop-shadow-sm">
              {item.description}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CardStack;
