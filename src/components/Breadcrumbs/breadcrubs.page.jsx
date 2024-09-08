import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import TableViewIcon from '@mui/icons-material/TableView';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  return (
    <Box role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        
        {/* Dashboard */}
        <Link to={`/`}
          underline="hover"
          style={{ display: 'flex', alignItems: 'center',textDecoration:'none' }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 ,color:'black'}} fontSize="inherit" />
         <span style={{color:'black'}}>Dashboard</span> 
        </Link>
        {/* new */}
        <Link
          underline="hover"
          style={{ display: 'flex', alignItems: 'center',textDecoration:'none' }}
          color="inherit"
        >
          <TableViewIcon sx={{ mr: 0.5,color:'blue' }} fontSize="inherit" />
          <span style={{color:'blue'}}>Weight</span> 
         
        </Link>
        
      </Breadcrumbs>
    </Box>
  );
}