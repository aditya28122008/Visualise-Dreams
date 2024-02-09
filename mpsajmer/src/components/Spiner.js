import React from 'react'
import loader from '../static/images/Loader.gif'
const Spiner = () => {
  return (
    <div className='w-fit mx-auto'>
      <img src={loader} alt="Loading" className='h-10 w-10' />
    </div>
  )
}

export default Spiner
