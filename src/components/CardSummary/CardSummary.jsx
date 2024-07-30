import { ArrowForward as ArrowForwardIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './CardSummaryStyles';
import { getVoucher } from '../../services';

const CardSummary = ({ subtotal, discount, shipping, total, onCheckout, setDiscount }) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleApplyCoupon = async () => {
    setLoading(true);
    try {
      const res = await getVoucher(text);
      const valueDiscount = res?.type === "fixed​" ? res?.price : (res?.price / 100)
      setDiscount(valueDiscount);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box className={classes.summary}>
      <Typography variant="h6">Resumo do Pedido</Typography>
      <Box className={classes.summaryItem}>
        <Typography>Subtotal</Typography>
        <Typography>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(subtotal)}</Typography>
      </Box>
      <Box className={classes.summaryItem}>
        <Typography>Descontos</Typography>
        <Typography>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(discount)}</Typography>
      </Box>
      <Box className={classes.summaryItem}>
        <Typography>Frete</Typography>
        <Typography>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(shipping)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box className={classes.summaryItem}>
        <Typography>Total</Typography>
        <Typography>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(total)}</Typography>
      </Box>
      <Box className={classes.couponContainer}>
        <TextField
          placeholder="Cupom de Desconto"
          variant="outlined"
          value={text}
          onChange={(event) => setText(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalOfferIcon />
              </InputAdornment>
            ),
          }}
          className={classes.couponInput}
        />
        <Button variant="contained" color="primary" disabled={loading} onClick={() => handleApplyCoupon()}>{loading ? "Carregando..." : "Aplicar"}</Button>
      </Box>
      <Button
        className={classes.checkoutButton}
        variant="contained"
        color="primary"
        onClick={onCheckout}
        endIcon={<ArrowForwardIcon />}
      >
        Finalizar Compra
      </Button>
    </Box>
  )
}

export default CardSummary;