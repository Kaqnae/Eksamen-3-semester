import { Institution } from "../model/Institution";
import InstitutionService from "../service/InstitutionService";
import { generateTimeIntervals } from "./timeUtils";

export const fetchInstitutionWithIntervals = async (
    instituionId: string
): Promise<{ institution: Institution; intervals: string[]}> => {
    const institution = await InstitutionService.fetchInstitution(instituionId);
    const {openTime, closeTime, bookingInterval} = institution;
    const intervals = generateTimeIntervals(openTime, closeTime, bookingInterval);
    return{institution, intervals};
};