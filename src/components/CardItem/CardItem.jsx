import { Add as AddIcon, Delete as DeleteIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Typography, Button, CircularProgress } from '@mui/material';
import React, { useState, useContext } from 'react';
import useStyles from './CardItemStyles';
import GlobalStateContext from '../../contex/GlobalStateContext';

const CardItem = ({ item }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { requests, states } = useContext(GlobalStateContext);
    const [quantity, setQuantity] = useState(item.quantity);
    const [typeCart, setTypeCart] = useState("add");

    const handleAddToCart = async () => {
        setLoading(true);
        setTypeCart("add");
        try {
            const existItem = states?.cart?.items?.filter((i) => i?.id === item.id);
            const quantity = existItem[0]?.quantity + 1;
            await requests.updateItem(existItem[0]?.id, quantity);
            setQuantity(quantity);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteToCart = async (remove) => {
        setLoading(true);
        setTypeCart("delete");
        try {
            const existItem = states?.cart?.items?.filter((i) => i?.id === item.id);

            if (existItem[0]?.quantity === 1 || remove) {
                await requests.removeItem(existItem[0]?.id);
            } else {
                const quantity = existItem[0]?.quantity - 1;
                await requests.updateItem(existItem[0]?.id, quantity);
                setQuantity(quantity);
            }


        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card key={item.id} className={classes.itemCard}>
            <CardMedia
                component="img"
                className={classes.media}
                image={item?.product?.url_image}
                alt={item?.product?.name}
            />
            <CardContent className={classes.itemContent}>
                <Box className={classes.titleContainer}>
                    <Typography variant="h6">{item?.product?.name}</Typography>
                    <IconButton className={classes.deleteIcon} onClick={() => handleDeleteToCart(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Box className={classes.quantityControl}>
                    <Typography variant="body">{new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(item?.product?.value)}</Typography>
                    {
                        loading ?
                            <Box sx={classes.buttonContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CircularProgress size={24} color="inherit" />}
                                    onClick={handleAddToCart}
                                    sx={classes.button}
                                    disabled={true}
                                >
                                    {typeCart === 'add' ? 'Adicionando...' : 'Deletando...'}
                                </Button>
                            </Box>
                            :
                            <Box className={classes.buttonQuantity}>
                                <IconButton onClick={() => handleDeleteToCart(false)}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography>{quantity}</Typography>
                                <IconButton onClick={() => handleAddToCart()}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                    }
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardItem;