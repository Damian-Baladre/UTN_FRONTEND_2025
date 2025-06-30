import ENVIRONMENT from "../constantas/environment"
import LOCALSTORAGE_KEYS from "../constantas/localstorage"
import methods_HTTP from "../constantas/method"
export const getAllWorkspaces = async () => {
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspace', {
            method: methods_HTTP.GET,
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        })
        const data = server_response.json()
        return data
    }
    catch(error){
        console.error(error)
        throw error
    }
}

export const createWorspace = async () => {
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspace', {
            method: methods_HTTP.POST,
            headers: {
                'Authorization': `Bearer ${auth_token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = server_response.json()
        return data
    }
    catch(error){
        console.error(error)
        throw error
    }
}