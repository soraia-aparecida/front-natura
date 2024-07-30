import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    summary: {
        flex: 1,
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginTop: 0,
            marginLeft: theme.spacing(2),
        },
    },
    itemCard: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
        padding: theme.spacing(2),
    },
    media: {
        width: '100%',
        height: 150,
        objectFit: 'cover',
        [theme.breakpoints.up('sm')]: {
            width: 150,
            height: 150,
        },
        borderRadius: '10px'
    },
    itemContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(2),
        position: 'relative',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControl: {
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        justifyContent: 'space-between',
    },
    buttonQuantity: {
        display: 'flex',
        alignItems: 'center'
    },
    deleteIcon: {
        cursor: 'pointer',
        color: theme.palette.error.main,
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
    },
    couponContainer: {
        display: 'flex',
        marginTop: theme.spacing(2),
        padding: theme.spacing(0),
    },
    couponInput: {
        flex: 1,
        marginRight: theme.spacing(1),
    },
    checkoutButton: {
        marginTop: theme.spacing(2),
        width: '100%',
        padding: theme.spacing(1),
    },
}));

export default useStyles;