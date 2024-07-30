import { InputBase, Select, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#8a8484',
  zIndex: 1
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  backgroundColor: '#f0f0f0',
  borderRadius: '30px',
  width: '200%',
  [theme.breakpoints.down('md')]: {
    width: '105%',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '80%',
  },
  display:'flex',
  justifyContent: 'space-between'
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-outlined': {
    border: 'none',
    boxShadow: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const ClearButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -199,
  top: 0,
  height: '100%',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    right: 0,
},
}));