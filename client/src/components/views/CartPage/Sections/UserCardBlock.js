import React, {useState} from "react";
import Axios from "axios";
import { Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import MinusOutlined from "@ant-design/icons/MinusOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

function UserCardBlock(props) {
  const [state, setState] = React.useState({
    quantity: 1,
    price: "",
    deleteData: false,
  });
  
  const onIncrement = () => {
    setState({ ...state, quantity: state.quantity + 1 });
  };
  const onDecrement = () => {
    setState({ ...state, quantity: state.quantity - 1 });
  };
  const deleteData = () => {
    setState({ ...state, deleteData: true });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>
          {/* {renderItems()} */}
          {props.productData === undefined || state.deleteData === true ? (
            ""
          ) : (
            <tr>
              <td>
                {" "}
                <img
                  src={props.productData.images}
                  width="70px"
                  height="70px"
                  className="cartAvatar"
                />
              </td>
              <td>
                <Button
                  type="primary"
                  disabled={state.quantity <= 1}
                  onClick={onDecrement}
                  shape="circle"
                >
                  <MinusOutlined />
                </Button>
                <span className="quantity">{state.quantity}</span>
                <Button type="primary" onClick={onIncrement} shape="circle">
                  <PlusOutlined />
                </Button>
              </td>
              <td className= "20"> {props.productData.price * state.quantity}$</td>
              <td>
                <Button type="primary" onClick={deleteData} shape="circle">
                  <DeleteOutlined />
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
