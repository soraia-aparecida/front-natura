import React, { useState, useContext } from 'react';
import { Box, Typography, IconButton, CircularProgress, Badge, Rating } from '@mui/material';
import { Star as StarIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import ProductCardStyles from './ProductCardStyles';
import { useTheme } from '@mui/material/styles';
import GlobalStateContext from '../../contex/GlobalStateContext';
import Swal from "sweetalert2";


const ProductCard = ({ product }) => {
    const theme = useTheme();
    const styles = ProductCardStyles(theme);

    const [loading, setLoading] = useState(false);
    const { url_image, name, rating, value, discount, id } = product;

    const { requests, states } = useContext(GlobalStateContext);

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
            const message = error?.response?.data?.message ?? "Falha adicionar produto ao carrinho"
            Swal.fire({
              title: "Erro",
              text: message,
              icon: "error",
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={styles.cardContainer}>
            <Box sx={styles.imageContainer}>
                <Box
                    component="img"
                    src={url_image}
                    alt={name}
                    sx={styles.image}
                />
                <IconButton
                    onClick={() => handleAddToCart()}
                    sx={styles.cartButton}
                    aria-label="add to cart"
                >
                    {loading ? (
                        <CircularProgress size={24} color='secondary' />
                    ) : (
                        <AddShoppingCartIcon />
                    )}
                </IconButton>
            </Box>
            <Box sx={styles.infoContainer}>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                <Box sx={styles.ratingContainer}>
                    <Rating
                        name="read-only"
                        value={rating}
                        readOnly
                        precision={0.5}
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                    />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={styles.value}>
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(value)}
                </Typography>
                {discount && (
                    <Badge
                        badgeContent="Desconto"
                        color="error"
                        sx={styles.discountBadge}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ProductCard;