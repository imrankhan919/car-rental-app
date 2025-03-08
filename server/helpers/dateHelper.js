const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
        throw new Error("Invalid date format");
    }

    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
};

module.exports = { calculateDaysBetweenDates };