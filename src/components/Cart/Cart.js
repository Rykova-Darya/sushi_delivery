import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = (props)=> {
  const [submitOrderAvailable, setSubmitOrserAvailable] = useState(false);
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
    
    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{totalAmount}</span>
            </div>
            {submitOrderAvailable && <SubmitOrder onCancel={props.onHideCart}/>}
            {!submitOrderAvailable && modalButtons}
        </Modal>
    )
}

export default Cart;