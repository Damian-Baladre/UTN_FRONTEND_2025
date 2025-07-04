import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import { getAllWorkspaces } from '../../services/workspacesService';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NewWorkspace from '../../components/NewWorkspace/NewWorkspace';


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
       <NewWorkspace />

      <div className='workspaces'>
        <div>
          <h1>Tus espacios de trabajo</h1>
          {
            loading
              ? <h2>Está cargando...</h2>
              : <div>
                {
                  response.data.workspaces.map(
                    (element) => {
                      return (
                        <div key={element.workspace._id}>
                          <h2>{element.workspace.name}</h2>
                          <Link to={
                            '/workspace/'
                            + element.workspace._id
                          }> Ir a espacio de trabajo </Link>
                        </div>
                      )
                    }
                  )
                }
              </div>
          }
        </div>
      </div>
    </div>

  );
}

export default HomeScreen;





//             ? <h2 style={{ color: 'red' }}>{error}</h2> // Mostrar mensaje de error
//             : response.data && response.data.getWorkspaces && response.data.getWorkspaces.length > 0
//               ? <div>
//                 {response.data.getWorkspaces.map((element) => (
//                   <div key={element.workspace._id}>
//                     <h2>{element.workspace.name}</h2> {/* Asegúrate de que sea 'element.workspace.name' */}
//                     <Link to={'/workspace' + element.workspace._id}>Ir a espacio de trabajo</Link>
//                   </div>
//                 ))}
//               </div>
//               : <h2>No hay espacios de trabajo disponibles.</h2>// Mensaje si no hay workspaces
