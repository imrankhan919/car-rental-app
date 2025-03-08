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
mo