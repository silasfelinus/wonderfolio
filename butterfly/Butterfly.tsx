"use client"
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Butterfly.module.css";
import { randomColor, complementaryColor } from "@utils/colorHelpers";

export const Butterfly: React.FC = () => {
  // Refs
  const leftAntennaRef = useRef(null);
  const rightAntennaRef = useRef(null);
  const idleAnimRef = useRef<gsap.core.Tween | null>(null);
  const butterflyRef = useRef(null);

  const [isHovering, setIsHovering] = useState(true);

  // Colors for Wings
  const primaryColor = randomColor();
  const color2 = complementaryColor(primaryColor);

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
      rotation: 0,
      transformOrigin: "bottom",
      ease: "sine.out",
      duration: 0.5,
      overwrite: "auto",
    });

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
  const hoverButterfly = () => {
    if (!isHovering) return;

    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;

    gsap.to(butterflyRef.current, {
      x: randomX,
      y: randomY,
      duration: 0.6,
      ease: "sine.inOut",
      onComplete: hoverButterfly,
    });
  };

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  setIsHovering(false);

  const rect = event.currentTarget.getBoundingClientRect();
  const targetX = event.clientX;
  const targetY = event.clientY;
  const deltaX = targetX - rect.left;
  const deltaY = targetY - rect.top;

  const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  console.log("Rotation value:", rotation);
  console.log(butterflyRef.current);

  gsap.to(butterflyRef.current, {
    left: targetX,
    top: targetY,
    rotation: rotation,
    overwrite: "auto",
    duration: 1.5,
    ease: "sine.inOut",
    onComplete: () => {
      setIsHovering(true);
      hoverButterfly();
    },
  });
};
  return (
    <div className={styles.butterflyContainer} onClick={handleClick}>
      <div
        className={styles.butterfly}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={butterflyRef}
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
            <div
              className={styles.top}
              style={{ backgroundColor: color2 }}
            ></div>
            <div
              className={styles.bottom}
              style={{ backgroundColor: color2 }}
            ></div>
          </div>
          <div
            className={styles.rightWing}
            style={{ backgroundColor: primaryColor }}
          >
            <div
              className={styles.top}
              style={{ backgroundColor: color2 }}
            ></div>
            <div
              className={styles.bottom}
              style={{ backgroundColor: color2 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Butterfly;
