import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import { getAllWorkspaces } from '../../services/workspacesService';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  const getWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkspaces();
      setResponse(data);
    } catch (error) {
      console.error('Error al obtener workspaces', error);
      setError('Ocurrió un error al obtener los espacios de trabajo.'); // Mensaje de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  console.log({ loading, response });

  return (
    <div>
      <h1>Tus espacios de trabajo</h1>
      {loading ? (
        <h2>Está cargando...</h2>
      ) : error ? (
        <h2 style={{ color: 'red' }}>{error}</h2> // Mostrar mensaje de error
      ) : response.data && response.data.getWorkspaces && response.data.getWorkspaces.length > 0 ? (
        <div>
          {response.data.getWorkspaces.map((element) => (
            <div key={element.workspace._id}>
              <h2>{element.workspace.name}</h2> {/* Asegúrate de que sea 'element.workspace.name' */}
              <Link to={'/workspace/' + element.workspace._id}>Ir a espacio de trabajo</Link>
            </div>
          ))}
        </div>
      ) : (
        <h2>No hay espacios de trabajo disponibles.</h2> // Mensaje si no hay workspaces
      )}
    </div>
  );
};

export default HomeScreen;
