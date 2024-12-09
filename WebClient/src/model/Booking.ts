export type Booking = {
    id: string;
    institutionId: string;
    userId: string;
    resourceId: string | null;
    date: number;
    startTime: string;
    endTime: string;
}

