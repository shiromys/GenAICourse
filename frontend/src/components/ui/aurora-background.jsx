"use client";
import React from "react";

export const AuroraBackground = ({
  className = "",
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col min-h-screen items-center justify-center bg-white text-slate-900 transition-bg ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
          [--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]
          [--aurora:repeating-linear-gradient(100deg,#4f46e5_10%,#818cf8_15%,#8b5cf6_20%,#a78bfa_25%,#6366f1_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px]
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
          after:[background-size:200%,_100%] 
          after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
          absolute -inset-[10px] opacity-40 will-change-transform ${
            showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]' : ''
          }`}
        ></div>
      </div>
      {children}
    </div>
  );
};
