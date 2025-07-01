import ENVIRONMENT from "../constantas/environment";
import methop_HTTP from "../constantas/method";
import LOCALSTORAGE_KEYS from "../constantas/localstorage";

export const getChannels = async ({workspace_id}) => {
    try {
        const serverResponse = await fetch(
            `${ENVIRONMENT.URL_API}/api/channels/${workspace_id}`,
            {
                method: methop_HTTP.GET,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                }
            }
        );
        const data = await serverResponse.json();
        return data;
    }
    catch (error) {
        console.error('El error jeje', error)
        throw error
    };
};

export const createChannel = async ({name, workspace_id})  => {
  try {
        const serverResponse = await fetch(
            `${ENVIRONMENT.URL_API}/api/channels/${workspace_id}`,
            {
                method: methop_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                },
                body: JSON.stringify({
                    name
                })
            }
        );
        const data = await serverResponse.json();
        return data;
    }
    catch (error) {
        console.error('Error al crear canales', error);
        throw error;
    }
}