import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PageScrollAnimator({ activeTab }) {
  useEffect(() => {
    if (activeTab === 'shopping-list') return undefined;
    // Instant execution using requestAnimationFrame for zero-lag rendering
    const frameId = requestAnimationFrame(() => {
      const mainContainer = document.querySelector('main');
      if (!mainContainer) return;

      let animationRoot = mainContainer;
      while (animationRoot.children.length === 1 && animationRoot.firstElementChild) {
        animationRoot = animationRoot.firstElementChild;
      }
      const children = animationRoot.children;
      const context = gsap.context(() => {
        Array.from(children).forEach((el, index) => {
        let fromVars = { opacity: 0, y: 30 };
        
        if (activeTab === 'home') {
          fromVars = { opacity: 0, y: 40, rotationX: index % 2 === 0 ? 15 : -15 };
        } else if (activeTab === 'recipes' || activeTab === 'favourites') {
          fromVars = { opacity: 0, x: index % 2 === 0 ? -30 : 30 };
        }

        gsap.fromTo(el, fromVars, {
          opacity: 1,
          y: 0,
          x: 0,
          rotationX: 0,
          duration: 0.65,
          delay: index * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
          },
        });
        });
      }, mainContainer);
      window._pageAnimationContext = context;
    });

    return () => {
      cancelAnimationFrame(frameId);
      window._pageAnimationContext?.revert();
      window._pageAnimationContext = null;
    };
  }, [activeTab]);

  return null;
}