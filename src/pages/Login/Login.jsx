import { Link } from 'react-router-dom';
import '../Register/Register.css'
import{ Button,Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

const[username,setUsername] = useState("");
const[password,setPassword] = useState("");
const[email,setEmail] = useState("");
const[error,setError] = useState(false);



const handleSubmit=async(e)=>{
e.preventDefault();
setError(false);

try {
  const res = await axios.post('http://localhost:5000/api/auth/Login',{
    username,
    password,
    email,})
    res.data && window.location.replace('/login')
} catch (error) {
setError(true)  
}
}

  return (
    <Box className='Login' >
      <span className='loginTitle'>Register</span>
      <form action="" className='loginForm' onSubmit={handleSubmit}>
        <Box className="input" style={{gap:'20px',display:'flex',flexDirection:'column'}}>
         <TextField type='text' id="outlined-basic"  onChange={e=>setUsername(e.target.value)} label="Username" variant="outlined" className='loginInput'/>
        <TextField type="text" label="Email" variant="outlined" className='loginInput' placeholder='Enter Your Email...' 
        onChange={e=>setPassword(e.target.value)}/>
        <TextField type="password" label="Password" variant="outlined" className='loginInput' placeholder='Enter Your Password...' 
        onChange={e=>setEmail(e.target.value)}/>
        </Box>
        <Button type='submit' variant='contained' sx={{mt:'30px',background:'palevioletred'}} className='loginButton'>Login</Button>
     </form>
     <Button variant='contained' color='success' sx={{position: 'absolute',
top: '60px',
right: '20px',
background: 'teal',
cursor: 'pointer',
border: 'none'
}} className='loginRegisterButton'><Link className='link' to='/login'>Register</Link></Button>

{error && <span style={{font:'10px',marginTop:'10px',fontSize:'400',color:'red'}}>
  SomeThing Went Wrong....</span>}
      </Box>
  )
}

export default Login