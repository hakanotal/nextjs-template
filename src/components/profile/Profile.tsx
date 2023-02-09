import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import styles from "./Profile.module.css";

const options = {
  glare: true,
  maxGlare: 0.15,
  perspective: 600,
  speed: 500,
  maxTilt: 40,
  scale: 1.2,
};

export default function Profile() {
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, []);

  return (
    <>
      <div ref={tilt} className={styles.cube}>
        <div className={`${styles.face} ${styles.top}`}></div>
        <div className={`${styles.face} ${styles.bottom}`}></div>
        <div className={`${styles.face} ${styles.left}`}></div>
        <div className={`${styles.face} ${styles.right}`}></div>
        <div className={`${styles.face} ${styles.front}`}></div>
        <div
          className={`${styles.face} ${styles.back}`}
          style={{
            backgroundImage: `url("https://i.pinimg.com/originals/47/13/21/471321e4c3270ca41173593e84acd1bc.jpg")`,
          }}
        ></div>
        <div className={`${styles.face} ${styles.middle}`}></div>
      </div>
    </>
  );
}
