import React from 'react'
import { Link } from 'react-router-dom'
import './newWorkspace.css'

const newWorkspace = () => {
  return (
   <div>
        <div className='newWorkspace'>
          <div className='txt-newWorkspace'>
            <h1 className='tt-newworkspace'>Crear un nuevo espacio de trabajo de Slack</h1>
            <p>Slack brinda a tu equipo un hogar, un lugar en el que poder conversar
              y trabajar juntos. Para crear un espacio de trabajo nuevo,
              haz clic en el siguiente botón.</p>
            <Link to={'/new'}>
              <botton className='btn-newWorkspace'> Crear espacio de trabajo </botton>
            </Link>
          </div>
          <img src="Frame1.png" alt="" />
        </div>
      </div>
  )
}

export default newWorkspace