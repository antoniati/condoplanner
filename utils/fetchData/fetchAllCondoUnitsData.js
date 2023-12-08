export async function fetchCondoUnitsData() {
      try {
            const response = await fetch("http://localhost:3000/api/fetch/allCondoUnits");
            const condoUnitsData = await response.json();
            return condoUnitsData || [];
            
      } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
      }
}
