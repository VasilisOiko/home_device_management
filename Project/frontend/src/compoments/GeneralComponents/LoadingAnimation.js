import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingAnimation(props)
{
  return (
    <Box sx={{ display: 'flex' }} className={props.className}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingAnimation