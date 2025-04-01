const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format");
    }

    if (end <= start) {
        throw new Error("Drop date must be after pickup date");
    }

    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    
    return Math.ceil(daysDifference); // Round up to nearest day
};
module.exports = calculateDaysBetweenDates


// const calculateDaysBetweenDates = (startDate, endDate) => {
//     // Validate date string format (YYYY-MM-DD)
//     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
//         throw new Error("Dates must be in YYYY-MM-DD format");
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//         throw new Error("Invalid date format");
//     }

//     if (end <= start) {
//         throw new Error("Drop date must be after pickup date");
//     }

//     const timeDifference = end - start;
//     const daysDifference = timeDifference / (1000 * 3600 * 24);
    
//     return Math.ceil(daysDifference); // Round up to nearest day
// };

// module.exports = calculateDaysBetweenDates;