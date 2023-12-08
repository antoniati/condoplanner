import axios from "axios";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export const fetchResidentDataById = async (residentId) => {
      try {
            const response = await axios.get(`/api/details/residentDetails/${residentId}`);

            if (response.status === 200) {
                  const residentData = response.data.data;
                  return residentData;
            };

      } catch (error) {
            if (error.response?.status === 404) {
                  throw new Error(` ${defaultErrorMessage.dataNotFound}, ${error.message}`);
            } else if (error.response?.status === 405) {
                  throw new Error(
                        defaultErrorMessage.methodNotAllowed,
                        error.response?.status
                  );
            } else if (error.response?.status === 400) {
                  throw new Error(` ${defaultErrorMessage.invalidData}, ${error.message} `);
            }
            throw new Error(` ${defaultErrorMessage.internalServerError}, ${error.message} `);
      };
};