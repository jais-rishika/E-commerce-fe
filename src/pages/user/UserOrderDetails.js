import { loadScript } from "@paypal/paypal-js";
import axios from "axios";
import { useSelector } from "react-redux";
import UserOrderDetailsComponent from "./component/userOrderDetailComponent";
const getOrder = async (orderID) => {
  const { data } = await axios.get("/api/v1/orders/user/" + orderID);
  return data;
};

const loadPayPalScript = (
  cartSubtotal,
  cartItems,
  id,
  updateStateAfterOrder
) => {
  loadScript({
    clientID:
      "AeiQKK4yLCCsuEqmIZA6zYJaDpYghM1THDNPLbQOX7Usxgg5I6-V_4-iO4A0qHqgBUxJIaa6iVcGWh-V",
  })
    .then((paypal) => {
      paypal
        .Buttons(buttons(cartSubtotal, cartItems, id, updateStateAfterOrder))
        .render("#paypal-button-container");
    })
    .catch((err) =>
      console.log("failed to load the PayPal JS SDK script", err)
    );
};

const buttons = (cartSubtotal, cartItems, id, updateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.capture[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          console.log("update in database");
          updateOrder(id)
            .then((data) => {
              if (data.isPaid) {
                updateStateAfterOrder(data.paidAt);
              }
            })
            .catch((err) =>
              console.log("failed to load the PayPal JS SDK script", err)
            );
        }
      });
    },
    onError: onErrorHandler,
  };
};
const onCancelHandler = () => {
  console.log("cancel");
};

const onErrorHandler = () => {
  console.log("error");
};

const updateOrder = async (orderID) => {
  const { data } = await axios.put("api/v1/orders/paid/" + orderID);
  return data;
};

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/v1/users/profile/" + userInfo._id);
    return data;
  };

  return (
    <UserOrderDetailsComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailsPage;
