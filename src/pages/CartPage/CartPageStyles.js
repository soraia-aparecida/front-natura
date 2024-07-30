import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
        padding: theme.spacing(5)
    },
    items: {
        flex: 2,
        padding: theme.spacing(2),
    }
}));

export default useStyles;