import styles from "@/styles/Average.module.css";

function Average({ numbers = [6, 7], outOf = 10 }) {
  function getTheRoundedNumber() {
    // Filter out non-numeric values and convert all elements to numbers
    const numericNumbers = numbers
      .map((num) => Number(num))
      .filter((num) => !isNaN(num));

    // Calculate the sum of all numeric numbers
    const sum = numericNumbers.reduce((acc, curr) => acc + curr, 0);

    // Calculate the average
    const average = sum / numericNumbers.length;

    // Round the average to the nearest integer
    const roundedAverage = Math.round(average);

    return roundedAverage;
  }

  const roundedAverage = getTheRoundedNumber();

  let backgroundColor = "";
  if (roundedAverage < 5) {
    backgroundColor = "#FFE6E6";
  } else if (roundedAverage >= 5 && roundedAverage < 7) {
    backgroundColor = "#F0F3FF";
  } else if (roundedAverage >= 7 && roundedAverage <= 10) {
    backgroundColor = "#E7FFE0";
  }

  return (
    <span className={styles.roundedAverage} style={{ backgroundColor }}>
      {roundedAverage}/{outOf}
    </span>
  );
}

export default Average;
