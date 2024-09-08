import '../Featured/Featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Card } from '@mui/material';
const Featured = () => {
  return (
    <Card className="featured" sx={{boxShadow:3}}>
        <div className='top'>
          <h1 className='title'>Total Revenue</h1>
          <MoreVertIcon fontSize='small'/>
        </div>
        <div className='bottom'>
          <div className='featuredChart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={1}  />
          </div>
          <p className='title'>Total sales made Today</p>
          <p className='amount'>$420</p>
          <p className='desc'>Previous transactions processing.
          Last payments may not be included</p>
          <div className='summary'>
            <div className='item'>
              <div className='itemTitle'>Target</div>
              <div className='itemResult'>
              <KeyboardArrowDownIcon fontsize='small'/>
                <div className='resultAmount'>$12.4k</div>
              </div>
            </div>
          </div>

        </div>
    </Card>
  )
}

export default Featured