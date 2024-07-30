import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import banner from "../../assets/banner-stella.jpg";
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { useHomeStyles } from './HomePageStyles';
import { getProducts } from '../../services/index.js';
import { NaturaApiServices } from '../../services/NaturaApiServices.js';
import GlobalStateContext from '../../contex/GlobalStateContext.js';

const Home = () => {
    const classes = useHomeStyles();
    const [products, setProducts] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const api = new NaturaApiServices();
    const { requests } = useContext(GlobalStateContext);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            const response = await getProducts({ page: page + 1, perPage: 4 });
            setProducts((prevProducts) => [
                ...prevProducts,
                ...response,
            ]);
            setHasMore(response.length === 4);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Erro ao carregar mais produtos:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        const initialLoad = async () => {
            const authData = api.getAuthData();
            if (!authData?.token) {
                await requests.registerNewUser({
                    isGuest: true,
                    profile: "user"
                })
            }

            setLoadingMore(true);
            try {
                const response = await getProducts({ page: 1, perPage: 4 });
                setProducts(response);
                setHasMore(response.length === 4);
                setPage(1);
            } catch (error) {
                console.error('Erro ao carregar produtos iniciais:', error);
            } finally {
                setLoadingMore(false);
            }
        };
        initialLoad();
    }, []);

    return <>
        <Box component="img" src={banner} alt="Banner desconto progressivo" className={classes.banner} />
        <Box className={classes.titleBox}>
            <Typography variant="h4" color="textPrimary" className={classes.title}>
                Descubra as fragrâncias que combinam com você
            </Typography>
        </Box>
        <Box className={classes.productContainer}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            <Box className={classes.loadMoreBox}>
                {loadingMore ? (
                    <CircularProgress />
                ) : (
                    hasMore && (
                        <Button
                            variant="contained"
                            onClick={() => handleLoadMore()}
                            className={classes.loadMoreButton}
                        >
                            Carregar outros
                        </Button>
                    )
                )}
            </Box>
        </Box>
    </>
};

export default Home;