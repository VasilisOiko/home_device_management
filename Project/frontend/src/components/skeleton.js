import Skeleton from '@mui/material/Skeleton';

function skeletonLoading(params)
{
  return(
    <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width={210}
      height={118}
    />
  )  
}