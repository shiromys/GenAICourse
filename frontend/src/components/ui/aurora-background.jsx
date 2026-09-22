"use client";
import React from "react";

// Simple, calm section background: a plain base color plus one soft, static
// blue glow in the corner. No animation, no multi-color blending - keeps the
// app to its blue / charcoal / off-white palette instead of the old
// mix-blend "aurora" effect, which produced shifting rainbow tones.
export const AuroraBackground = ({
  className = "",
  children,
  showRadialGradient = true,
  dark = false,
  beige = false,
  showBottomFade = false,
  ...props
}) => {
  const baseBg = beige
    ? 'bg-[var(--bg-main)] text-[var(--text-main)]'
    : dark
      ? 'bg-[#0F172A] text-slate-100'
      : 'bg-white text-slate-900';

  const glowColor = dark ? 'rgba(37,99,235,0.25)' : 'rgba(37,99,235,0.10)';

  return (
    <div
      className={`relative flex flex-col transition-bg ${baseBg} ${className}`}
      {...props}
    >
      {showRadialGradient && (
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 100% 0%, ${glowColor} 0%, transparent 60%)`,
          }}
        ></div>
      )}
      {showBottomFade && (
        <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t pointer-events-none ${beige ? 'from-[var(--bg-main)] via-[var(--bg-main)]/80' : dark ? 'from-[#0F172A] via-[#0F172A]/80' : 'from-white via-white/80'} to-transparent z-10`} />
      )}
      {children}
    </div>
  );
};
