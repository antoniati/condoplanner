import axios from "axios";
import { defaultErrorMessage } from "../constantsData/defaultErrorMessages";

export const fetchAllAccessLogsData = async () => {
      try {
            const response = await axios.get("/api/fetch/allAccessLogs");

            if (response.status === 200) {
                  const listOfAllAccessLogs = response.data.data;
                  return listOfAllAccessLogs;

            } else if (response.status === 404) {
                  console.log(`${defaultErrorMessage.dataNotFound}`);
            }
      } catch (error) {
            console.log(`${defaultErrorMessage.internalServerError}, ${error.message}`);
      };
};
