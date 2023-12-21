import styles from "./SubmitOrder.module.css";
import useInput from "../../hooks/use-input";

const SubmitOrder = (props) => {
  const isInputValid = (val) => val.trim() !== "";
  const {
    value: valueName,
    hasError: inputNameError,
    isValid: isNameValid,
    inputChangeHandler: nameInputChangeHandler,
    inputLostChangeHandler: nameInputLostChangeHandler,
    resetValues: resetNameInputValues,
  } = useInput(isInputValid);

  const {
    value: valueCity,
    hasError: inputCityError,
    isValid: isCityValid,
    inputChangeHandler: cityInputChangeHandler,
    inputLostChangeHandler: cityInputLostChangeHandler,
    resetValues: resetCityInputValues,
  } = useInput(isInputValid);

  const {
    value: valueAddress,
    hasError: inputAddressError,
    isValid: isAddressValid,
    inputChangeHandler: addressInputChangeHandler,
    inputLostChangeHandler: addressInputLostChangeHandler,
    resetValues: resetAddressInputValues,
  } = useInput(isInputValid);

  let isFormValid = false;

  if (isNameValid && isCityValid && isAddressValid) {
    isFormValid = true;
  }

  const confirmOrderHandler = (event) => {
    event.preventDefault();

    if (!isNameValid && !isCityValid && !isAddressValid) {
      return;
    }

    console.log(valueName);
    console.log(valueCity);
    console.log(valueAddress);

    resetNameInputValues();
    resetCityInputValues();
    resetAddressInputValues();
  };

  const nameInputClasses = inputNameError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;
  const cityInputClasses = inputCityError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;
  const addressInputClasses = inputAddressError
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  return (
    <form className={styles.form} onSubmit={confirmOrderHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Введите имя</label>
        <input
        type="text"
        id="name"
        onBlur={nameInputLostChangeHandler}
        onChange={nameInputChangeHandler}
        value={valueName} />
        {inputNameError && <p className={styles['input-error']}>Нужно указать имя</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">Введите город</label>
        <input 
        type="text" 
        id="city"
        onBlur={cityInputLostChangeHandler}
        onChange={cityInputChangeHandler}
        value={valueCity} />
        {inputCityError && <p className={styles['input-error']}>Нужно указать город</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Введите адрес</label>
        <input 
        type="text" 
        id="address" 
        onBlur={addressInputLostChangeHandler}
        onChange={addressInputChangeHandler}
        value={valueAddress}
        />
        {inputCityError && <p className={styles['input-error']}>Нужно указать адрес</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit} disabled={!isFormValid}>Подтвердите заказ</button>
        <button type="button" onClick={props.onCancel}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
