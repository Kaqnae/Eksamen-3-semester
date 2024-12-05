class MachineService {
  async fetchMachines(): Promise<any[]> {
    try {
      const response = await fetch("", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get any machines");
      }
      const data = await response.json();
      return data.token;
    } catch (error) {
      throw new Error("An unexpected error occured. Please try again later");
    }
  }
}

export default new MachineService();
