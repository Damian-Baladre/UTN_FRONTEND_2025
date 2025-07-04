import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import { getAllWorkspaces } from '../../services/workspacesService';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NewWorkspace from '../../components/NewWorkspace/newWorkspace';
import {HiArrowRight} from 'react-icons/hi';

const HomeScreen = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)

  const getWorkspaces = async () => {
    try {
      setLoading(true)
      const data = await getAllWorkspaces()
      setResponse(data)
    }
    catch (error) {
      console.error('Error al obtener workspaces', error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(
    () => {
      getWorkspaces()
    },
    []
  )
  return (

   
    <div className='Home'>
       <Header className='Headerhome' />
       <span className='tt-home'>Hola de nuevo!</span>
      <div className='workspaces'>
        <div>

          {
            loading
              ? <h2>Está cargando...</h2>
              : <div className='workspace-list'>
                <h3 className='sbt-workspace'>Espacios de trabajos</h3>
                {
                  response.data.workspaces.map(
                    (element) => {
                      return (
                        <div key={element.workspace._id} className='workspace-card'>
                          <h2 className='workspace-name'>{element.workspace.name}</h2>
                          <Link to={
                            '/workspace/'
                            + element.workspace._id
                          }> <HiArrowRight /> </Link>
                        </div>
                      )
                    }
                  )
                }
              </div>
          }
        </div>
      </div>
      <NewWorkspace />
    </div>

  );
}

export default HomeScreen;
