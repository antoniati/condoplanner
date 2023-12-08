export const cleanErrorMessage = (fieldName, setError) => {
      setError((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
      }));
};