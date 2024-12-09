export interface Booking {
    id: string;
    institutionId: string;
    userId: string;
    resourceId: string;
    date: string;
    startTime: string;
    endTime: string;
    active: boolean;
}