"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Butterfly.module.css";
import { randomColor, complementaryColor } from "@utils/colorHelpers";

// eslint-disable-next-line react/display-name
const Antenna = React.forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => (
    <div ref={ref} className={className}>
      <div className={styles.antennaBall} />
    </div>
  )
);

const Wing: React.FC<{
  side: "left" | "right";
  color: string;
  complementaryColor: string;
}> = ({ side, color, complementaryColor }) => (
  <div
    className={side === "left" ? styles.leftWing : styles.rightWing}
    style={{ backgroundColor: color }}
  >
    <div
      className={styles.top}
      style={{ backgroundColor: complementaryColor }}
    ></div>
    <div
      className={styles.bottom}
      style={{ backgroundColor: complementaryColor }}
    ></div>
  </div>
);

const moveAntennae = (
  leftRef: HTMLDivElement | null,
  rightRef: HTMLDivElement | null,
  offsetX: number,
  offsetY: number
) => {
  const leftRotationBase = -35 + (offsetX + offsetY) / 20;
  const rightRotationBase = 35 + (-offsetX + offsetY) / 20;

  gsap.to(leftRef, {
    rotation: leftRotationBase,
    transformOrigin: "bottom",
    ease: "sine.out",
    duration: 0.5,
    overwrite: "auto",
  });

  gsap.to(rightRef, {
    rotation: rightRotationBase,
    transformOrigin: "bottom",
    ease: "sine.out",
    duration: 0.5,
    overwrite: "auto",
  });
};

const resetAntennae = (
  leftRef: HTMLDivElement | null,
  rightRef: HTMLDivElement | null,
  animRef: React.MutableRefObject<gsap.core.Tween | null>
) => {
  gsap.to([leftRef, rightRef], {
    rotation: 0,
    transformOrigin: "bottom",
    ease: "sine.out",
    duration: 0.5,
    overwrite: "auto",
  });

  if (!animRef.current) {
    const idleAnim = gsap.to([leftRef, rightRef], {
      rotation: "+=5",
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "power1.inOut",
    });
    animRef.current = idleAnim;
  }
};

export const Butterfly2: React.FC = () => {
  // Refs
  const leftAntennaRef = useRef<HTMLDivElement>(null);
  const rightAntennaRef = useRef<HTMLDivElement>(null);
  const idleAnimRef = useRef<gsap.core.Tween | null>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);

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
    moveAntennae(
      leftAntennaRef.current,
      rightAntennaRef.current,
      offsetX,
      offsetY
    );
    if (idleAnimRef.current) {
      idleAnimRef.current.kill();
      idleAnimRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    resetAntennae(leftAntennaRef.current, rightAntennaRef.current, idleAnimRef);
    if (idleAnimRef.current) {
      idleAnimRef.current.restart();
    }
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
          <div className={styles.head}>
            <Antenna ref={leftAntennaRef} className={styles.leftAntenna} />
            <Antenna ref={rightAntennaRef} className={styles.rightAntenna} />

            <Wing
              side="left"
              color={primaryColor}
              complementaryColor={color2}
            />
            <Wing
              side="right"
              color={primaryColor}
              complementaryColor={color2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Butterfly2;
