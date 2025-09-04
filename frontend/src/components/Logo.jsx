import {Link} from 'react-router-dom'   
const Logo = () => {
    return (
        <Link to='/' className='max-md:flex-1'>
            <h1 className='w-36 h-auto text-black text-3xl md:text-2xl font-bold' >ClauseSense</h1>
        </Link>
    )
}
export default Logo