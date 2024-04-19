import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Camera from '../../Components/assets/camera.jpg'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';

import '../New/New.scss'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const New = ({inputs,title}) => {

const[file,setFile] = useState('')
console.log(file)




  return (
    <div className='new' style={{display:'flex'}}>
      <Sidebar/>
      <div className="newContainer" style={{flex:'6'}}>
        <Navbar/>
        <div className="top">
          <h1 style={{color:'lightgrey',fontSize:'20px'}}>{title}</h1>
        </div>
        <div className="bottom" >
       <div className="left">
        <img src={file ? URL.createObjectURL(file):{Camera}} alt="" style={{width:'100px',height:'100px', borderRadius:'50%',objectFit:'cover'}} />
       </div>
       <div className="right">
        <form >



        <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{backgroundColor:'teal'}}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={e=>setFile(e.target.files[0])} />
    </Button>

   



{inputs.map((input=>(
   <div className="formInput" key={input.id}>
            <label>{input.label}</label>
        <TextField type={input.type} id="outlined-basic" label={input.label} variant="outlined"  />
        </div>

)))}
       
        
        <Button variant="contained" endIcon={<SendIcon />} 
        sx={{marginTop:'10px',width:'150px',padding:'10px',border:'none',
        backgroundColor:'teal',color:'white',cursor:'pointer',alignItems:'center',
        }}>SEND</Button>
        </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default New