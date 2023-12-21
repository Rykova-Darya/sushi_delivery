import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';
import React from 'react';

const Cart = (props)=> {
  const [submitOrderAvailable, setSubmitOrserAvailable] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] = useState(false);
  const [isErrorSubmitting, setIsErrorSubmitting] = useState(false);

  const cartContext = useContext(CartContext);
  const totalAmount = `₽ ${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  
  const removeCartItemhandler = (id) => {
    cartContext.removeItem(id);
  }

  const addCartItemHandler = (item) => {
    cartContext.addItem({...item, amount: 1})
  }

  const orderHandler = () => {
    setSubmitOrserAvailable(true);
  }

  const submitOrderHandler = async (userData) => {

    try {
      setIsDataSubmitting(true);
      const responce = await fetch('https://react-course-http-5f79e-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items}),
      })
  
      if (!responce.ok) {
        throw new Error("Что-то пошло не так...");
      }
    } catch (err) {
      setIsErrorSubmitting(err.message);
      console.error(err);
    }
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    cartContext.clearCart();
  };

    const cartItems = (
      <ul className={styles["cart-items"]}>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addCartItemHandler.bind(null, item)}
            onRemove={removeCartItemhandler.bind(null, item.id)}
          />
        ))}{" "}
      </ul>
    );
  
  const modalButtons = (
    <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>Заказать</button>}
</div>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
          <span>Итого</span>
          <span>{totalAmount}</span>
      </div>
      {submitOrderAvailable && <SubmitOrder onSubmit={submitOrderHandler} onCancel={props.onHideCart}/>}
      {!submitOrderAvailable && modalButtons}
    </React.Fragment>
  )
    
  const dataSubmittingCartModalContent = <p>Отправка данных заказа...</p>
  const dataWasSubmittedCartModalContent = 
  <React.Fragment>
    <p>Ваш заказ успешно отправлен!</p>
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
    </div>
  </React.Fragment> 
  const errorSubmittingText = 
  <React.Fragment>
   <p>{isErrorSubmitting}</p>
  <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onHideCart}>Закрыть</button>
  </div>
</React.Fragment> 
    return (
        <Modal onHideCart={props.onHideCart}>
            {isErrorSubmitting && errorSubmittingText}
            {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
            {isDataSubmitting && dataSubmittingCartModalContent}
            {wasDataSendingSuccessful && !isErrorSubmitting  && dataWasSubmittedCartModalContent}
        </Modal>
    )
}

export default Cart;