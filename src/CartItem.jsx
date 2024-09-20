import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity, updateCost} from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((totalCost, item) => totalCost + item.costAsNumber * item.quantity, 0);  
    };

    const handleContinueShopping = (e) => {
        console.log('handleContinueShopping called in CartItem');
        if (onContinueShopping) {
            console.log('onContinueShopping is defined, calling it now');
            onContinueShopping(e);
        } else {
            console.error('onContinueShopping prop is not defined');
        }
    };

    const handleCheckoutShopping = (e) => {
        alert('Coming soon!');
      };

    const handleIncrement = (item) => {
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
        };
        dispatch(updateQuantity(updatedItem));

    };   

    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            dispatch(removeItem(item.name))
            console.log(item);
        } else {
            const updatedItem = {
                ...item,
                quantity: item.quantity - 1
            };
            dispatch(updateQuantity(updatedItem));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name))
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {        
       // return cart.reduce((itemCost, item) => itemCost + item.costAsNumber * item.quantity, 0); 
       const updatedItem = {
            ...item,
            cost: item.quantity * item.costAsNumber,
        };
        dispatch(updateCost(updatedItem));
        return item.cost;
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem; 