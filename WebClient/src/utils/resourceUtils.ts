import ResourceService from "../service/ResourceService";

export const fetchResourceDesc = async (resourceId: string): Promise<string> => {
    return await new ResourceService().fetchResourceDescription(resourceId);
};