import ENVIRONMENT from '../constantas/environment.js'
import methop_HTTP from '../constantas/method.js'

const login = async ({ email, password }) => {
    const server_response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/users/login`,
        {
            method: methop_HTTP.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            )
        }
    )
    const server_response_data = await server_response_http.json()
    return server_response_data
}

 const register = async ({ name, email, password }) => {
    try{const server_response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/users/register`,
        {
            method: methop_HTTP.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: name,
                    email: email,
                    password: password
                }
            )
        }
    )
    const server_response_data = await server_response_http.json()
    return server_response_data
}
catch(error){
    console.error(error)
    throw{
        message: 'Ocurrio un error al comunicarnos con el servidor'
    }
}
}

const getEmail = async (email) => {
  const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);
  if (auth_token) {
    const server_response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/users/login`,
      {
        method: methop_HTTP.GET,
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
    const server_response_data = await server_response_http.json();
    return server_response_data.email;
  } else {
    return null;
  }
};

export {getEmail, login, register}