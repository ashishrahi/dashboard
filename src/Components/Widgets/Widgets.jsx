import '../Widgets/Widgets.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const Widgets = ({type}) => {
 let data;

switch (type) {
    case 'user':
        data={
            title:'users',
            isMoney:false,
            link:'see all users',
            icon:<PersonOutlineIcon className='icon' sx={{color:'crimson',backgroundColor:'rbga(255,0,0,0.2)'}}/>
        };
        break;
        case 'order':
            data={
                title:'ORDERS',
                isMoney:false,
                link:'see all ORDERS',
                icon:<AddShoppingCartIcon className='icon'/>
            };
            break;

            case 'earning':
                data={
                    title:'ERARNING',
                    isMoney:true,
                    link:'View net earnings ',
                    icon:<MonetizationOnIcon className='icon'/>
                };
                break;
                case 'balance':
                    data={
                        title:'BALANCE',
                        isMoney:true,
                        link:'See details ',
                        icon:<MonetizationOnIcon className='icon'/>
                    };
                    break;

    default:
        break;
}


  return (
    <div className="widget">
        <div className="left">
            <span className='title'>{data.title}</span>
            <span className="counter">{data.isMoney && '$'}</span>
            <span className="link">{data.link}</span>
         </div>
        <div className="right">
            <div className='percentage positive'>
            <KeyboardArrowDownIcon/>
                20%
                </div>
                {data.icon}
        </div>

    </div>
  )
}

export default Widgets