export const generateTimeIntervals = (
    openTime: string,
    closeTime: string,
    interval: number
  ) => {
    const intervals: string[] = [];
    const today = new Date().toISOString().split("T")[0];
    let current = new Date(`${today}T${openTime}:00`);
    const end = new Date(`${today}T${closeTime}:00`);

    while (current <= end) {
      intervals.push(current.toTimeString().slice(0, 5));
      current = new Date(current.getTime() + interval * 60000);
    }

    return intervals;
  };


export const isOverlapping = (
    start: string,
    end: string,
    bookings: any[]
  ): boolean => {
    return bookings.some((booking) => {
      return (
        (start >= booking.startTime && start < booking.endTime) ||
        (end > booking.startTime && end <= booking.endTime) ||
        (start <= booking.startTime && end >= booking.endTime)
      );
    });
  };

  
export const generateDateOptions = () => {
    const dateOptions = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const dates = new Date(today);
      dates.setDate(today.getDate() + i);
      dateOptions.push(dates.toISOString().split("T")[0]);
    }
    return dateOptions;
  };
