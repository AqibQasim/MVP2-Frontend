import styles from "@/styles/Assessment.module.css";
import Average from "@/components/Average";

const Assessment = ({ heading, para, score }) => {
  return (
    <>
      <div className={styles.assessmentContainer}>
        <div className={styles.header}>
          <h2>{heading} Assessment</h2>
          <Average numbers={[score]} outOf={10} />
        </div>

        <div className={styles.summary}>
          <h4>{heading} Summary</h4>
          <p>{para}</p>
        </div>
      </div>
    </>
  );
};

export default Assessment;
