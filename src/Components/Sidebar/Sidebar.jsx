import '../Sidebar/sidebar.scss'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { Link } from'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to='/' style={{textDecoration:'none'}}><span className="logo"></span><FitbitIcon />Dash_Admin </Link>
        
        </div>
      <hr />
      <div className="center">
        <ul className='list'>
        <p className='title'>Main</p>
         <li>
          <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>LISTS</p>
          <Link to='/users' style={{textDecoration:'none'}}>
          <li>
          <PersonIcon className='icon'/>
          <span>Users</span>
          </li>
          </Link>
          <Link to='/products' style={{textDecoration:'none'}}>
          <li>
             <InventoryIcon className='icon'/>
            <span>Products</span>
          </li>
          </Link>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <BorderColorIcon className='icon' />
            <span>Orders</span>
          </li>
          </Link>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <LocalShippingIcon className='icon'/>
            <span>Delivery</span>
          </li> 
          </Link>
          <p className='title'>USEFUL</p>  
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
           <QueryStatsIcon className='icon'/>
            <span>Stats</span>
          </li>
          </Link>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
           <CircleNotificationsIcon className='icon'/>
            <span>Notification</span>
          </li>
          </Link>
          <p className='title'>SERVICE</p>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <SettingsSystemDaydreamIcon className='icon'/>
            <span>System Health</span>
          </li>
          </Link>
          <li>
            <span>Logs</span>
          </li>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <SettingsApplicationsIcon className='icon'/>
            <span>Settings</span>
          </li>
          </Link>
          <p className='title'>USER</p>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <AccountCircleIcon className='icon'/>

            <span>Profile</span>
          </li>
          </Link>
          <Link to='/' style={{textDecoration:'none'}}>
          <li>
          <LogoutIcon className='icon'/>
            <span>Logout</span>
          </li></Link>

        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      
      </div>
      </div>
  )
}

export default Sidebar