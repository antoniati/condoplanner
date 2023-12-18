import axios from "axios";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export const fetchAccessLogDataById = async (accessLogId) => {
      try {
            const response = await axios.get(
                  `/api/details/accessLogDetails/${accessLogId}`
            );

            if (response.status === 200) {
                  const accessLogData = response.data.data;
                  return accessLogData;
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
