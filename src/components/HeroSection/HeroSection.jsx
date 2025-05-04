import { ArrowDown } from "lucide-react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const scrollToInternships = () => {
    document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          Find Your <span className={styles.heroHighlight}>Dream Internship!</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Browse through exciting opportunities and kick-start your career with hands-on experience.
        </p>
        <button className={styles.heroButton} onClick={scrollToInternships}>
          Explore Internships <ArrowDown size={18} className={styles.icon} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
