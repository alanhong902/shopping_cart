import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    removeCartItem,
    onSuccessBuy
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty, Button } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(true)
    const [ShowSuccess, setShowSuccess] = useState(false)

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            }
        
    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            cartDetail: props.user.cartDetail,
            paymentData: data
        }))
            .then(response => {
                
                    setShowSuccess(true)
                    setShowTotal(false)
                }
            )
    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    productData={props.location.state.data}
                    removeItem={removeFromCart}
                >

                </UserCardBlock>
 {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amounrrrrrrrrrrt: ${20} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In The Cart</p>
          </div>
        )}
      </div>

            {/* Paypal Button */}

            {ShowTotal &&
                <Paypal
                    toPay={20}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}
                    transactionCanceled={transactionCanceled}
                />
            }
        </div>
    )
}

export default CartPage
