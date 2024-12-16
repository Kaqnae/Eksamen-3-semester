import BookingService from "../service/BookingService";
import { isOverlapping } from "./timeUtils";

export const FetchBookingResource = async (
    resourceId: string,
    date: string
): Promise<any[]> => {
    return await new BookingService().fetchBookingByResource(resourceId, date);
};

export const createBooking = async (
    resourceId: string,
    date: string,
    startTime: string,
    endTime: string,
    bookings: any[]
): Promise<void> => {
    if(isOverlapping(startTime, endTime, bookings)){
        throw new Error("The selected time overlaps with an existing booking. Please choose a different time");
    }
    await new BookingService().createBooking(resourceId, date, startTime, endTime);
};