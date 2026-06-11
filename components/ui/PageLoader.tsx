"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';

export const navigateWithLoader = (path: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('page-navigate', { detail: path }));
  }
};

export const PageLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => { });

    // Function to animate the text in
    const animateTextIn = () => {
      return gsap.to('.word-animate', {
        y: "0%",
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.1
      });
    };

    // Function to animate the text out
    const animateTextOut = () => {
      return gsap.to('.word-animate', {
        y: "-120%",
        duration: 0.6,
        ease: "power4.in",
      });
    };

    // --- INITIAL LOAD SEQUENCE ---
    // Make sure we start with opacity 1 since tailwind won't hide it, 
    // it's covering the screen by default: style={{height: "100%", top: 0}}
    const initialTl = gsap.timeline({
      onComplete: () => {
        // Slide up
        gsap.set(containerRef.current, { top: 0, bottom: "auto" });
        gsap.to(containerRef.current, {
          height: "0%",
          duration: 0.8,
          ease: "power4.inOut",
        });
      }
    });

    // Wait a tiny bit then start entry
    initialTl.add(animateTextIn(), 0.2);

    let initialObj = { value: 0 };
    initialTl.to(initialObj, {
      value: 100,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.round(initialObj.value)),
    }, 0.2);

    initialTl.add(animateTextOut(), ">0.3");

    // --- NAVIGATION SEQUENCE ---
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const path = customEvent.detail;

      setProgress(0);
      // Reset text position to bottom
      gsap.set('.word-animate', { y: "120%" });

      // Loader enters from bottom (height: 0 -> 100%)
      gsap.set(containerRef.current, { bottom: 0, top: "auto", height: "0%" });

      const tl = gsap.timeline({
        onComplete: () => {
          // Push route once loader covers screen
          router.push(path);

          // Run fake progress 0 to 100 %
          let progressObj = { value: 0 };
          gsap.to(progressObj, {
            value: 100,
            duration: 1, // Mock loading duration
            ease: "power2.inOut",
            onUpdate: () => setProgress(Math.round(progressObj.value)),
            onComplete: () => {
              // Slide up
              const exitTl = gsap.timeline();
              exitTl.add(animateTextOut());
              exitTl.to(containerRef.current, {
                top: 0,
                bottom: "auto",
                height: "0%",
                duration: 0.8,
                ease: "power4.inOut",
              }, "+=0.1");
            }
          });
        }
      });

      tl.to(containerRef.current, {
        height: "100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
      tl.add(animateTextIn(), "-=0.2");
    };

    window.addEventListener('page-navigate', handleNavigate);
    return () => {
      window.removeEventListener('page-navigate', handleNavigate);
      ctx.revert();
    }
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed z-9999 bg-[#73A5CA] text-[#FEFDDF] w-full overflow-hidden pointer-events-none"
      style={{ height: "100%", top: 0, left: 0 }}
    >
      <div className="w-full h-full flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start w-full font-bold text-xl md:text-3xl tracking-tight uppercase">
          <div className="overflow-hidden pb-1">
            <span className="inline-block translate-y-[120%] word-animate">StartupAI</span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="inline-block translate-y-[120%] word-animate">{progress}%</span>
          </div>
        </div>

        <div className="grow flex items-center justify-center pointer-events-none">
          <div className="text-center overflow-hidden pb-4">
            <h1 className="text-5xl md:text-5xl tracking-tighter uppercase inline-block overflow-hidden relative">
              <span className="inline-block translate-y-[120%] word-animate">Loading</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
