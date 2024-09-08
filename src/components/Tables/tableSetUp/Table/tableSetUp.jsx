import Sidebar from '../../../Sidebar/Sidebar'
import Navbar from '../../../Navbar/Navbar'
import Datatable from './dataTable'
import { Box } from '@mui/material'
const Users = () => {
  return (
    <Box className='list' sx={{display:'flex'}}>
    <Sidebar />
    <Box className="listContainer" sx={{flex:'6'}}>
      <Navbar/>
     <Datatable/>
        </Box>
      </Box>
  )
}

export default Users