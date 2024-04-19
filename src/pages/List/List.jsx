import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import '../List/list.scss'
import Datatable from '../../Components/Datatable/Datatable'
const Lists = () => {
  return (
    <div className='list' style={{display:'flex'}}>
    <Sidebar />
    <div className="listContainer" style={{flex:'6'}}>
      <Navbar/>
     <Datatable/>
        </div>
      </div>
  )
}

export default Lists