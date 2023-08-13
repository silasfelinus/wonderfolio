"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Butterfly.module.css";
import {
  randomColor,
  complementaryColor,
  analogousColor,
} from "@utils/colorHelpers";
export const Butterfly: React.FC = () => {
  // Refs
  const leftAntennaRef = useRef(null);
  const rightAntennaRef = useRef(null);
  const idleAnimRef = useRef<gsap.core.Tween | null>(null);

  // Colors for Wings
  const primaryColor = randomColor();
  const color2 = complementaryColor(primaryColor);
  const color3 = analogousColor(primaryColor);
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const leftRotationBase = -35 + (offsetX + offsetY) / 20;
    const rightRotationBase = 35 + (-offsetX + offsetY) / 20;

    gsap.to(leftAntennaRef.current, {
      rotation: leftRotationBase,
      transformOrigin: "bottom",
      ease: "sine.out",
      duration: 0.5,
      overwrite: "auto",
    });

    gsap.to(rightAntennaRef.current, {
      rotation: rightRotationBase,
      transformOrigin: "bottom",
      ease: "sine.out",
      duration: 0.5,
      overwrite: "auto",
    });

    if (idleAnimRef.current) {
      idleAnimRef.current.kill();
      idleAnimRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    gsap.to([leftAntennaRef.current, rightAntennaRef.current], {
      rotation: 0, // Revert back to a neutral position, feel free to adjust this value if needed.
      transformOrigin: "bottom",
      ease: "sine.out",
      duration: 0.5,
      overwrite: "auto",
    });

    // No need for a delayedCall, we can simply recreate the idle animation.
    if (!idleAnimRef.current) {
      const idleAnim = gsap.to(
        [leftAntennaRef.current, rightAntennaRef.current],
        {
          rotation: "+=5",
          yoyo: true,
          repeat: -1,
          duration: 0.8,
          ease: "power1.inOut",
        }
      );
      idleAnimRef.current = idleAnim;
    }
  };

  useEffect(() => {
    const idleAnim = gsap.to(
      [leftAntennaRef.current, rightAntennaRef.current],
      {
        rotation: "+=5",
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: "power1.inOut",
      }
    );
    idleAnimRef.current = idleAnim;
  }, []);

  return (
    <div
      className={styles.butterfly}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.body}>
        {/* Head */}
        <div className={styles.head}>
          {[leftAntennaRef, rightAntennaRef].map((antennaRef, index) => (
            <div
              key={index}
              ref={antennaRef}
              className={`${styles.antenna} ${
                index === 0 ? styles.leftAntenna : styles.rightAntenna
              }`}
            >
              <div className={styles.antennaBall} />
            </div>
          ))}
        </div>

        {/* Wings */}
        <div
          className={styles.leftWing}
          style={{ backgroundColor: primaryColor }}
        >
          <div className={styles.top} style={{ backgroundColor: color2 }}></div>
          <div
            className={styles.bottom}
            style={{ backgroundColor: color3 }}
          ></div>
        </div>
        <div
          className={styles.rightWing}
          style={{ backgroundColor: primaryColor }}
        >
          <div className={styles.top} style={{ backgroundColor: color2 }}></div>
          <div
            className={styles.bottom}
            style={{ backgroundColor: color3 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Butterfly;
