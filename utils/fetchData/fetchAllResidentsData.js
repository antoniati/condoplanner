import axios from "axios";
import { defaultErrorMessage } from "../constantsData/defaultErrorMessages";

export const fetchAllResidentsData = async () => {
      try {
            const response = await axios.get("/api/fetch/allResidents");

            if (response.status === 200) {
                  const listOfAllResidents = response.data.data;
                  return listOfAllResidents;

            } else if (response.status === 404) {
                  console.log(`${defaultErrorMessage.dataNotFound}`);
            }
      } catch (error) {
            console.log(`${defaultErrorMessage.internalServerError}, ${error.message}`);
      };
};
