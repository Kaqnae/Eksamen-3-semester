export type Resource = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  institutionId: string;
};

export interface ResourceDetails {
  imageUrl: string;
  description: string;
}
