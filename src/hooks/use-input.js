import { useState } from "react";
const useInput = (validateValueFunc) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [wasInputTouched, setWasInputTouched] = useState(false);
  
    const isValueValid = validateValueFunc(enteredValue);
    const isInputInvalid = !isValueValid && wasInputTouched;

    const inputChangeHandler = (event) => {
        setEnteredValue(event.target.value);
      };

      const inputLostChangeHandler = (event) => {
        setWasInputTouched(true);
      }

    const resetValues = () => {
        setEnteredValue("");
        setWasInputTouched(false);
    }
 
    return {
        value: enteredValue,
        hasError: isInputInvalid,
        isValid: isValueValid,
        inputChangeHandler,
        inputLostChangeHandler,
        resetValues
    }
}

export default useInput;