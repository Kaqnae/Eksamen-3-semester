import { isOverlapping } from "./timeUtils";

export const calculateAvailableStartTimes = (
    intervals: string[],
    bookings: any[],
    date: string
  ): string[] => {
    return intervals.filter((interval) =>
      bookings.every((booking) => {
        if (booking.date !== date) {
          return true; 
        }
        return !isOverlapping(interval, interval, bookings); 
      })
    );
  };
export const calculateAvailableEndTimes = (
    intervals: string[],
    selectedStartTime: string,
    bookings: any[],
    date: string
  ): string[] => {
    if (!selectedStartTime) return [];
  
    return intervals.filter((interval) =>
      bookings.every((booking) => {
        if (booking.date !== date) {
          return true; 
        }
        return !isOverlapping(selectedStartTime, interval, bookings);
      })
    );
  };