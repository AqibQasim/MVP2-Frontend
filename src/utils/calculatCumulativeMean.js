export const calculateCumulativeMean = (val1, val2, val3) => {
    let total = 0;
    let count = 0;

    if (val1) {
        total += parseFloat(val1);
        count += 1;
    }

    if (val2) {
        total += parseFloat(val2);
        count += 1;
    }

    if (val3) {
        total += parseFloat(val3);
        count += 1;
    }

    if (count === 0) return 0;
    console.log(total / count)
    return (total / count)?.toFixed(1); // Round the final result to one decimal place
};