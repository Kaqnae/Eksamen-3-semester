import { ErrorReport } from "../model/ErrorReport";

class ErrorReportService{
    private authToken: string | null;
    private userId: string | null;
  
    constructor() {
      this.authToken = localStorage.getItem("authToken");
      this.userId = localStorage.getItem("userId");
    }

    async createErrorReport(errorReport: ErrorReport): Promise<ErrorReport>{
        try{
            const response = await fetch(
                `http://localhost:5000/api/error-reports`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.authToken}`,
                    },
                    body: JSON.stringify(errorReport),
                }
            );
            if(!response.ok){
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Couldn't create error reports");
            }

            const data = await response.json();
            return data;
        }catch(error){
            console.error('Error creating error report:', error);
            throw new Error('An unexpected error occurred. Please try again later.');
        }
    }
}



export default ErrorReportService;