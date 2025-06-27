import methop_HTTP from "../constantas/method"

export const getAllMessagesByChannelId = async ({channel_id}) => {
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${channel_id}`, {
            method: methop_HTTP.GET,
            headers:{
                'Authorization': `Bearer ${auth_token}`
            }
        })
        const data = await server_response.json()
        return data
    } catch(error){
        console.error(error)
        throw error
    }
}