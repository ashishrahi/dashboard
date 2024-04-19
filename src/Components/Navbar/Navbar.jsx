import '../Navbar/navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; 
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'; 
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import {Box} from '@mui/material'
import Logo from '../assets/logo.jpg'
const Navbar = () => {
  return (
    <Box className='navbar'>
      <Box className="wrapper">
   <Box className="search">
   <input type='text' placeholder='Search....'/>
  <Tooltip title='Search'><SearchIcon className='icon'/></Tooltip> 
  </Box>
  <Box className="items">
    <Box className="item">
    <Tooltip title='Language'><LanguageIcon className='icon'/> English</Tooltip></div>
    <Box className="item">
    <Tooltip title='DarkMode'><IconButton><DarkModeIcon className='icon'/></IconButton></Tooltip> 
    </Box>
    <Box className="item">
    <Tooltip title='Enlarge'><FullscreenIcon className='icon'/></Tooltip>
    </Box>
    <Box className="item">
    <Tooltip title='Notification'><NotificationsIcon className='icon'/></Tooltip>
    <Box className="counter">1</Box>
    </Box>
    <Box className="item">
    <Tooltip title='Chat'><ChatBubbleOutlineIcon className='icon'/></Tooltip>
    <Box className="counter">1</Box>

    </Box>
    <Box className="item">
    <Tooltip title='List'><FormatListBulletedIcon className='icon'/></Tooltip>
    </Box>
    <Box className="item">
    <Tooltip title ='User'><img src={Logo} alt="" className='avator' /></Tooltip>
    </Box>
  </Box>
   </Box>
  </Box>
  )
}

export default Navbar