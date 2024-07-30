const ProductListStyles = (theme) => ({
    card: {
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: 700,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }       
    },
    media: {
        width: { xs: '100%', sm: 200 },
        height: { xs: 200, sm: 200 },
        objectFit: 'cover',
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('sm')]: {
            height: 250,
        },
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: { sm: theme.spacing(2) },
    },
    originalPrice: {
        textDecoration: 'line-through',
    },
    discountedPriceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    discountedPrice: {
        fontWeight: 'bold',
    },
    discountPercentage: {
        fontWeight: 'bold',
        marginLeft: theme.spacing(2),
        color: theme.palette.error.main,
    },
    price: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: theme.spacing(2),
    },
    button: {
        width: '100%',
    },
});

export default ProductListStyles;