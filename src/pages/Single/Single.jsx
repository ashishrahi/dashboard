import './single.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Logo from '../../Components/assets/logo.jpg'
import Chart from '../../Components/Chart/Chart'
import Table from '../../Components/Table/Table'
const Single = () => {
  return (
    <div className='single' style={{display:'flex'}}>
      <Sidebar/>
      <div className="singleContainer" style={{flex:'6'}}>
        <Navbar/>
          <div className="top"> 
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={Logo} alt="" className='itemImg'    />
              <div className="details">
                <h1 className='itemTitle'>John Doe</h1>
                <div className="detailItem">
                  <span className='itemKey'>Email:</span>
                  <span className='itemValue'>JohnDoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className='itemKey'>Phone:</span>
                  <span className='itemValue'>+123-234-55-33</span>
                </div>
                <div className="detailItem">
                  <span className='itemKey'>Address:</span>
                  <span className='itemValue'>33 road Area</span>
                </div>
                <div className="detailItem">
                  <span className='itemKey'>Country:</span>
                  <span className='itemValue'>Spain</span>
                </div>


              </div>
            </div>
          </div>
          <div className="right">
          <Chart aspect={3/1} title='User Spending (Last 6 Months)'/>
          </div>
          </div>
          <div className="bottom">
            <Table/>
          </div>
      </div>
      </div>
  )
}

export default Single