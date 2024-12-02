import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </div>
  );
};
