import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import GlobalStateContext from '../../contex/GlobalStateContext';
import { getProducts } from '../../services';
import { Container, LoadingContainer, LoadMoreButtonContainer, NoResultsContainer, NoResultsIcon } from './ListPageStyles';
import Swal from "sweetalert2";

const List = () => {
  const { states, setters } = useContext(GlobalStateContext);
  console.log("🚀 ~ List ~ state:", states.products)
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

  const getItems = async () => {
    try {
      const response = await getProducts({ page: 1, perPage: 4 });
      setters.setProducts(response);
      setHasMore(response?.length === 4);
      setPage(1);
    } catch (error) {
      console.error('Erro ao carregar produtos iniciais:', error);
      const message = error?.response?.data?.message ?? "Falha ao buscar produtos"
      Swal.fire({
        title: "Erro",
        text: message,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Ok",
      })
    } finally {
      setters.setLoading(false);
    }
  }

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const response = await getProducts({ page: page + 1, perPage: 4 });
      setters.setProducts((prevProducts) => [
        ...prevProducts,
        ...response,
      ]);
      setHasMore(response?.length === 4);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Erro ao carregar mais produtos:', error);
      const message = error?.response?.data?.message ?? "Falha ao buscar produtos";
      Swal.fire({
        title: "Erro",
        text: message,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Ok",
      })
    } finally {
      setLoadingMore(false);
    }
  };


  useEffect(() => {
    async function fetchData() {
      if (!states?.products?.length) {
        setters.setLoading(true);
        await getItems();
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setProducts(states?.products);
  }, [states?.products])


  return <>
    <Container>
      <Typography variant="h5" component="div" gutterBottom align="center" sx={{ mt: 4, mb: 3 }}>
        Nossos Produtos
      </Typography>
      {
        states.loading ?
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
          :
          <>
            {states?.products?.length ?
              <>
                <Grid container spacing={2} direction="column" alignItems="center">
                  {products?.map((product, index) => {
                    const oldPrice = product.value / (1 - (product.discount_percentage / 100));
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ProductList
                          image={product.url_image}
                          title={product.name}
                          description={product.short_description}
                          price={product.value}
                          id={product.id}
                          discount={product.discount}
                          oldPrice={oldPrice}
                          discountPercentage={product.discount_percentage}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
                {hasMore &&
                  <LoadMoreButtonContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleLoadMore()}
                      disabled={loadingMore}
                    >
                      {loadingMore ? 'Carregando...' : 'Carregar Mais'}
                    </Button>
                  </LoadMoreButtonContainer>
                }
              </>
              :
              <NoResultsContainer>
                <NoResultsIcon />
                <Typography variant="h5" component="div" gutterBottom align="center" sx={{ mt: 4, mb: 3 }}>
                  Ops... Essa busca não trouxe resultados
                </Typography>
              </NoResultsContainer>
            }
          </>
      }
    </Container>
  </>
};

export default List;