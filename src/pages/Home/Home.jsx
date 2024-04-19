import '../Home/home.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Widgets from '../../Components/Widgets/Widgets'
import Featured from '../../Components/Featured/Featured'
import Chart from '../../Components/Chart/Chart'
import Table from '../../Components/Table/Table'
const Home = () => {
  return (
    <div className='home'>
     <Sidebar/>
    <div className="homeContainer">
     <Navbar/>
     <div className="widgets">
     <Widgets type="user"/>
     <Widgets type='order'/>
     <Widgets type='earning'/>
     <Widgets type='balance'/>
     </div>
     <div className="charts">
      <Featured/>
      <Chart title='Last 6 Months (Revenue)' aspect={2/1} />
     </div>
     <div className='listContainer'>
      <div className='listTitle'>Latest Transactions  </div>
     <Table/>
     </div>
     </div>
      </div>
  )
}

export default Home