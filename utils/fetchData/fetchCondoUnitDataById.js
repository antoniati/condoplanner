import axios from "axios";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export const fetchCondoUnitDataById = async (condoUnitId) => {
      try {
            const response = await axios.get(`/api/details/condoUnitDetails/${condoUnitId}`);

            if (response.status === 200) {
                  const condoUnitData = response.data.data;
                  return condoUnitData;
            };

      } catch (error) {
            if (error.response?.status === 404) {
                  throw new Error(` 
                        ${defaultErrorMessage.dataNotFound}, 
                        ${error.message}
                  `);
            } else if (error.response?.status === 405) {
                  throw new Error(`
                        ${defaultErrorMessage.methodNotAllowed}, 
                        ${error.response?.status}
                  `);
            } else if (error.response?.status === 400) {
                  throw new Error(` 
                        ${defaultErrorMessage.invalidData}, 
                        ${error.message} 
                  `);
            };

            throw new Error(` 
                  ${defaultErrorMessage.internalServerError}, 
                  ${error.message} 
            `);
      };
};
