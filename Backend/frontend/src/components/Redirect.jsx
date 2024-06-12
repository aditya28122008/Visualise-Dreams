/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/blog')
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default Redirect
