import { Box, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import CardItem from '../../components/CardItem/CardItem.jsx';
import CardSummary from '../../components/CardSummary/CardSummary.jsx';
import useStyles from './CartPageStyles';
import GlobalStateContext from '../../contex/GlobalStateContext.js';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const { states, setters, requests } = useContext(GlobalStateContext);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const carts = states?.cart?.items ?? []
    setCart(carts)
  }, [states?.cart?.items])

  const subtotal = cart.reduce((acc, item) => acc + item?.product?.value * item.quantity, 0);
  const shipping = 10;
  const total = subtotal - discount + shipping;

  const onCheckout = () => {
    Swal.fire({
      title: "Sucesso",
      text: "A compra foi finaliza com sucesso!",
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "Ok",
      confirmButtonColor: "#f48646"
    }).then(async () => {
      navigate("/");
      localStorage.removeItem('cart');
      localStorage.removeItem('lastVisitedPage');
      await requests.createNewCart();

      return;
    });
  }

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom align="center" sx={{ mt: 4 }}>
        Seu carrinho
      </Typography>
      {
        cart?.length ?
          <Box className={classes.root} >
            <Box className={classes.items}>
              {cart.map((item) => (
                <CardItem
                  key={item.id}
                  item={item}
                  state={cart}
                  setState={setCart}
                />
              ))}
            </Box>
            <CardSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              setDiscount={setDiscount}
              onCheckout={onCheckout}
            />
          </Box >
          : <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
            <ShoppingBagOutlinedIcon style={{ fontSize: 100, color: 'gray' }} />
            <Typography variant="h5" component="div" gutterBottom align="center" sx={{ mt: 4 }}>
              Você não possui nenhum produto no carrinho
            </Typography>
          </Box>
      }
    </>


  );
};

export default CartPage;