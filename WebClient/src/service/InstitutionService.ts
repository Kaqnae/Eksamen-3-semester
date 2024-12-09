import { Institution } from "../model/Institution";

class InsitutionService{
    async fetchInstitution(institutionId: string): Promise<Institution>{
        const authToken = localStorage.getItem("authToken");

        try{
            const response = await fetch(
                `http://localhost:5000/api/institutions/${institutionId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if(!response.ok){
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Couldn't fetch institution data.");
            }

            const data: Institution = await response.json();
            return data;
        }catch(error){
            throw new Error("An unexpected error occurred. Please try again later")
        }
    }
}

export default new InsitutionService();