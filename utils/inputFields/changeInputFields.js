import { residentFieldsNames } from "./residentInputFields";
import { applyCEPMask, applyCPFMask, applyPhoneMask, applyRGMask } from "./inputFieldsMask";
import { cleanErrorMessage } from "./cleanErrorMessage";

const changesInputFields = (
      event,
      data,
      setData,
      setErrorData
) => {
      const { name, value } = event.target;
      let maskedValue = value;

      if (name === residentFieldsNames[3]) {
            maskedValue = applyCPFMask(value);
      } else if (name === residentFieldsNames[2]) {
            maskedValue = applyRGMask(value);
      } else if (name === residentFieldsNames[6]) {
            maskedValue = applyPhoneMask(value);
      } else if (name === residentFieldsNames[10]) {
            maskedValue = applyCEPMask(value);
      }

      setData({
            ...data,
            [name]: maskedValue
      });

      cleanErrorMessage(name, setErrorData);
};

export default changesInputFields;