export type Booking = {
    id: string;
    institutionId: string;
    userId: string;
    resourceId: string | null;
    resourceName: string | null;
    date: number;
    startTime: string;
    endTime: string;
}

