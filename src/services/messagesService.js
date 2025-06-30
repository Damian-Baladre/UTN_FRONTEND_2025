import ENVIRONMENT from "../constantas/environment"
import LOCALSTORAGE_KEYS from "../constantas/localstorage"
import methop_HTTP from "../constantas/method"

export const getAllMessagesByChannelId = async ({ channel_id, workspace_id }) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methop_HTTP.GET,
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        })
        if (!server_response.ok) {
            throw new Error(`Error al obtener mensajes: ${server_response.status} ${server_response.statusText}`)
        }
        const data = await server_response.json()
        return data
    }
    catch (error) {
        console.error(error)
        throw error
    }
}
export const createNewMessage = async ({ channel_id, workspace_id, content }) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methop_HTTP.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify({ 
                content
             })
             })
        const data = await server_response.json()
        return data
    }
    catch(error) {
        console.error(error)
        throw error
    }
        }
