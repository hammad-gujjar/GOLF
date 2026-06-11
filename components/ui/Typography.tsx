"use client";

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'muted';
}

const splitTextToWords = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((word, i) => {
      if (word.trim() === '') {
        return <span key={i}>{word}</span>;
      }
      return (
        <span key={i} className="inline-flex overflow-hidden align-bottom">
          <span className="word-animate inline-block translate-y-[120%] opacity-0" style={{ transformOrigin: "bottom left" }}>{word}</span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return React.Children.map(node, (child) => splitTextToWords(child));
  }
  return node;
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = 'p', variant = 'body', children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLElement);
    const variants = {
      h1: 'scroll-m-20 font-thin text-[33px]! leading-13 font-h1 lg:text-[51px]! uppercase',
      h2: 'scroll-m-20 font-thin font-h1 text-[23px]! lg:text-[38px]! first:mt-0',
      h3: 'scroll-m-20 text-2xl! lg:text-3xl!',
      h4: 'scroll-m-20 text-xl! lg:text-2xl!',
      small: 'text-[16px]! leading-none',
      body: 'text-[14px]! leading-none',
      muted: 'text-[10px] tracking-[0.4em] text-[#73A5CA] uppercase font-bold',
    };

    const finalComponent = variant.startsWith('h') ? (variant as any) : Component;

    useGSAP(() => {
      if (!internalRef.current) return;
      const words = internalRef.current.querySelectorAll('.word-animate');
      if (words.length > 0) {
        gsap.to(words, {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power4.inOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: internalRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        });
      } else {
         gsap.fromTo(internalRef.current, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: "power4.inOut",
            scrollTrigger: { trigger: internalRef.current, start: "top 75%", toggleActions: "play none none reverse" }
         });
      }
    }, { scope: internalRef });

    return (
      <Tag
        ref={internalRef}
        as={finalComponent}
        className={cn(variants[variant], className)}
        {...props}
      >
        {splitTextToWords(children)}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';

const Tag = React.forwardRef(({ as: Component, children, ...props }: any, ref) => (
  <Component ref={ref} {...props}>{children}</Component>
));
Tag.displayName = 'Tag';