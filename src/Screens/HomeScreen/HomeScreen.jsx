import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import { getAllWorkspaces } from '../../services/workspacesService';
import { Link } from 'react-router-dom';
import useCustomQuery from '../../hooks/useCustomQuery';

const HomeScreen = () => {
  const { response: channelsResponse, error, loading, sendRequest } = useCustomQuery();


  useEffect(() => {
    sendRequest( async () => getAllWorkspaces(user_id));
  },
  []
  );

  console.log({ loading, response });
  return (
    <div>
      <h1>Tus espacios de trabajo</h1>
      <div>
        {
          loading
            ? <h2>Está cargando...</h2>
            : <div>
              {
                response.data.workspaces.map(
                  (element) => {
                    return (
                      <div key={element.workspace._id}>
                        <h2>{element.workspace.name}</h2> {/* Asegúrate de que sea 'element.workspace.name' */}
                        <Link to={'/workspace/' + element.workspace._id}> Ir a espacio de trabajo </Link>
                      </div>
                    )
                  }
                )
              }
            </div>
        }
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
