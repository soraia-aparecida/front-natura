// ProductListStyles.js
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}));

export const NoResultsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
}));

export const NoResultsIcon = styled(SentimentDissatisfiedIcon)(({ theme }) => ({
    fontSize: 70,
    color: theme.palette.grey[500],
}));

export const LoadMoreButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    textAlign: 'center',
}));