import React from 'react'
import { Link } from 'react-router-dom'
import './NewWorkspace.css'

const NewWorkspace = () => {
  return (
   <div>
        <div className='newWorkspace'>
          <div className='txt-newWorkspace'>
            <Link to={'/new'}>
              <botton className='btn-newWorkspace'> Crear espacio de trabajo </botton>
            </Link>
          </div>
          
        </div>
      </div>
  )
}

export default NewWorkspace