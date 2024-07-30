import { alpha } from '@mui/material/styles';

const ProductCardStyles = (theme) => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 300,
        margin: theme.spacing(1),
        position: 'relative',
        border: 'none',
        boxShadow: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)', // Pequeno zoom no contêiner
        },
        borderRadius: '16px'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        overflow: 'hidden',
        borderRadius: '16px',
        [theme.breakpoints.down('sm')]: {
            height: 200,
        },
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '16px',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)', // Ajusta o zoom da imagem
        },
    },
    cartButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },
    },
    infoContainer: {
        padding: theme.spacing(2),
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    ratingContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    price: {
        marginTop: theme.spacing(1),
    },
    discountBadge: {
        marginTop: theme.spacing(1),
    },
});

export default ProductCardStyles;