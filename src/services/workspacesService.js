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

export const createWorkspace = async (workspace) => {
    const {name, description} = workspace
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspace', {
            method: methods_HTTP.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`,
            }
        ,
        body: JSON.stringify({
            name: name,
            description: description
        }
    )
})
        const data = server_response.json()
        return data
    }
    catch(error){
        console.error(error)
        throw error
    }
}