import { makeStyles } from '@mui/styles';

export const useHomeStyles = makeStyles((theme) => ({
    banner: {
        width: '100%',
        height: 'auto',
    },
    titleBox: {
        textAlign: 'center',
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
    },
    title: {
        fontSize: '18px',
        [theme.breakpoints.up('lg')]: {
            fontSize: '30px',
        },
    },
    productContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: theme.spacing(3),
    },
    loadMoreBox: {
        width: '100%',
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    loadMoreButton: {
        marginTop: theme.spacing(2),
        borderRadius: '20px',
        padding: '1.1rem',
        paddingLeft: '2.3rem',
        paddingRight: '2.3rem',
    },
}));
