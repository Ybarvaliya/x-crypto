import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-black text-white text-lg p-6'>
      <Link className='mr-5 hover:text-blue-400' to='/'>Home</Link>
      <Link className='mr-5 hover:text-blue-400' to="/exchange">Exchanges</Link>
      <Link className='mr-5 hover:text-blue-400' to="/coins">Coins</Link>
    </div>
  )
}

export default Header