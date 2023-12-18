import axios from "axios";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export const fetchResidentDataByRg = async (residentRgNumber, errorMessage) => {
      try {
            const response = await axios.get(`/api/fetch/residentData/${residentRgNumber}`);

            if (response.status === 200) {
                  const residentData = response.data.data;
                  return residentData;
            };

      } catch (error) {
            if (error.response?.status === 404) {
                  errorMessage(defaultErrorMessage.dataNotFound);
            } else if (error.response?.status === 405) {
                  errorMessage(defaultErrorMessage.methodNotAllowed);
            } else if (error.response?.status === 400) {
                  errorMessage(defaultErrorMessage.invalidData);
            } else {
                  errorMessage(defaultErrorMessage.internalServerError);
            }
      };
};
