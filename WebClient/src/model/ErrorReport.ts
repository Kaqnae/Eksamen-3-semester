export interface ErrorReport {
  id?: string;
  institutionId: string;
  createdDate: string;
  resourceId: string;
  description: string;
  userId: string;
  resolved: boolean;
}

export interface ErrorReportProps {
  resourceId: string;
  institutionId: string;
  onClose: () => void;
}
