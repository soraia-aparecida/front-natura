import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import logo from "../../assets/logo.png";
import React, { useState, useContext, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

import FormControl from '@mui/material/FormControl';

import { Clear as ClearIcon } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { CustomSelect, Search, SearchIconWrapper, StyledInputBase, ClearButton } from './HeaderStyles';
import GlobalStateContext from '../../contex/GlobalStateContext';
import { getProducts } from '../../services';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

import { useLocation } from 'react-router-dom';

const Header = () => {
  const { states, setters } = useContext(GlobalStateContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [itemsInCart, setItemsInCart] = useState(0);
  const [text, setText] = useState('');
  const location = useLocation();
  console.log("🚀 ~ Header ~ location:", location)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const handleImageClick = () => {
    localStorage.setItem('lastVisitedPage', '/');
    navigate('/');
  };

  const handleCartClick = () => {
    localStorage.setItem('lastVisitedPage', '/carrinho');
    navigate('/carrinho');
  };

  const handleProfileMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
    console.log("Clicou no menu de perfil")
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleSelectChange = (event) => {
  //  setSelectedOption(event.target.value); 
  // };

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setSelectedOption(value);

    try {
      setters.setLoading(true);

      const url = `/produtos?${name}`
      localStorage.setItem('lastVisitedPage', url);
      navigate(url);

      const page = 1;
      const perPage = 4;

      if (value) {
        const categoryId = value;
        const response = await getProducts({ page, perPage, categoryId });
        setters.setProducts(response);
      } else {
        const response = await getProducts({ page, perPage });
        setters.setProducts(response);
      }

    } catch (error) {
      setters.setLoading(false);
      console.error('Erro ao buscar cupom:', error);
    } finally {
      setters.setLoading(false);
    }
    // }
  };

  const handlerClear = async () => {
    setters.setLoading(true);
    try {
      setText('');

      const url = `/produtos`;
      localStorage.setItem('lastVisitedPage', url);
      navigate(url);

      const response = await getProducts({ page: 1, perPage: 4 });
      console.log("🚀 ~ handlerClear ~ response:", response)
      setters.setProducts(response);
    } catch (error) {
      setters.setLoading(false);
      console.error('Erro ao buscar cupom:', error);
    } finally {
      setters.setLoading(false);
    }
  }

  const fetchTextData = useCallback(
    debounce(async (query) => {
      setters.setLoading(true);
      try {

        const url = `/produtos`
        localStorage.setItem('lastVisitedPage', url);
        navigate(url);

        const response = await getProducts({ page: 1, perPage: 4, text: query });
        setters.setProducts(response);

      } catch (error) {
        setters.setLoading(false);
        console.error('Erro ao buscar cupom:', error);
      } finally {
        setters.setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (text) {
      fetchTextData(text);
    }
  }, [text, fetchTextData]);

  useEffect(() => {
    if (!location.pathname.includes('/produtos')) {
      setSelectedOption('');
    }
  }, [location]);

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleCartClick}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={itemsInCart} color="error">
            <LocalGroceryStoreIcon />
          </Badge>
        </IconButton>
        <p>Carrinho</p>
      </MenuItem>
      <MenuItem onClick={() => console.log("clicou no perfil")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    const items = states?.cart?.items ?? [];
    const quantity = items.reduce((total, item) => total + item?.quantity ?? 0, 0)
    setItemsInCart(quantity)
  }, [states?.cart?.items])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="Logo Cosmétivos&CO"
            sx={{
              height: { xs: 40, sm: 80 },
              width: 'auto',
              marginRight: 1,
              cursor: 'pointer'
            }}
            onClick={handleImageClick}
          />
          <Box sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <CustomSelect
                value={selectedOption}
                onChange={(event) => handleSelectChange(event)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value=""><em>Produtos</em> </MenuItem>
                {states?.category?.map((c) => (
                  <MenuItem value={c.id} key={c.id} name={c.name}>{capitalizeFirstLetter(c.name)}</MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="O que está buscando hoje?"
              inputProps={{ 'aria-label': 'search' }}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            {text && (
              <ClearButton
                onClick={() => handlerClear()}
              >
                <ClearIcon />
              </ClearButton>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={itemsInCart} color="error">
                <LocalGroceryStoreIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

export default Header;