// Butterfly.tsx
"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Butterfly.module.css";

interface ButterflyProps {
  children?: React.ReactNode;
}

const Butterfly: React.FC<ButterflyProps> = ({ children }) => {
  const leftAntennaRef = useRef<HTMLDivElement>(null);
  const rightAntennaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const leftAntenna = leftAntennaRef.current;
    const rightAntenna = rightAntennaRef.current;
    if (!leftAntenna || !rightAntenna) return;

    const applyRotation = (
      element: HTMLDivElement,
      mouseX: number,
      mouseY: number
    ) => {
      const rect = element.getBoundingClientRect();
      const distance = Math.sqrt(
        (rect.left + rect.width / 2 - mouseX) ** 2 +
          (rect.top + rect.height / 2 - mouseY) ** 2
      );

      const maxRotation = 30; // Maximum rotation in degrees
      const maxDistance = 100; // Distance at which max rotation applies
      let rotation = (1 - Math.min(distance / maxDistance, 1)) * maxRotation;

      element.style.transform = `rotate(${rotation}deg)`;
    };

    applyRotation(leftAntenna, event.clientX, event.clientY);
    applyRotation(rightAntenna, event.clientX, event.clientY);
  };

  return (
    <div className={styles.butterfly} onMouseMove={handleMouseMove}>
      <div className={styles.body}></div>
      <div className={styles.head}></div>

      {/* Antennae */}
      <div
        className={styles.antenna + " " + styles.leftAntenna}
        ref={leftAntennaRef}
      >
        <div className={styles.antennaBall}></div>
      </div>
      <div
        className={styles.antenna + " " + styles.rightAntenna}
        ref={rightAntennaRef}
      >
        <div className={styles.antennaBall}></div>
      </div>

      {children}
    </div>
  );
};

export default Butterfly;
