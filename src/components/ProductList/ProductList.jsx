import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import ProductListStyles from './ProductListStyles'; // Ajuste o caminho conforme necessário
import { useTheme } from '@mui/material/styles';
import GlobalStateContext from '../../contex/GlobalStateContext';

const ProductList = (data) => {
    const { image, title, description, price, id, discount, discountPercentage, oldPrice } = data;
    const { states, requests } = useContext(GlobalStateContext);

    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const styles = ProductListStyles(theme);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            const existItem = states?.cart?.items?.filter((i) => i?.product?.id === id);

            if (existItem?.length) {
                const quantity = existItem[0]?.quantity + 1;
                await requests.updateItem(existItem[0]?.id, quantity);
            } else {
                await requests.addItem(id, 1);
            }
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                sx={styles.media}
                image={image}
                alt={title}
            />
            <CardContent sx={styles.content} >
                <Typography variant="h6" component="div" gutterBottom sx={{ wordBreak: 'break-word' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ wordBreak: 'break-word' }}>
                    {description}
                </Typography>
                {discount ? (
                    <>
                        <Typography variant="body2" color="text.secondary" sx={styles.originalPrice}>
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(oldPrice)}
                        </Typography>
                        <Box sx={styles.discountedPriceContainer}>
                            <Typography variant="h6" component="div" sx={styles.discountedPrice}>
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(price)}
                            </Typography>
                            <Typography variant="body2" sx={styles.discountPercentage}>
                                -{discountPercentage}%
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6" component="div" sx={styles.price}>
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(price)}
                    </Typography>
                )}
                <Box sx={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ShoppingCartIcon />}
                        onClick={() => handleAddToCart()}
                        sx={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductList;