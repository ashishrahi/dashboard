import '../Datatable/datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns,userRows } from '../../datatablesource';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import {GridDeleteForeverIcon } from '@mui/x-data-grid';



const Datatable = () => {

const actionColoumn = [
     {field:'action',header:'Action',width:'200',renderCell:()=>{
        return(
            <div className='cellAction'>
              <Link to='/users/test' style={{textDecoration:'none'}}><div className="viewButton">View</div></Link>  
                <div className="deleteButton"><GridDeleteForeverIcon sx={{marginTop:'2px'}}/>Delete</div>
            </div>
        )
     }}
]

    return (
        <div className='datatable' style={{ height: 400, width: '100%' }}>
<div className="datatableTitle" style={{width:'95%',fontSize:'24px',color:'grey',marginBottom:'10px',
display:'flex',alignItems:'center',justifyContent:'space-between'}}>
  Add New User
  <Link to='/users/new' style={{textDecoration:'none',color:'green'}}><Button  variant="contained" startIcon={<GridAddIcon/>}>
Add New
</Button></Link>
</div>

          <DataGrid
            rows={userRows}
            columns={userColumns.concat(actionColoumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      );
}

export default Datatable