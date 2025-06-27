import ENVIRONMENT from "../constantas/environment";
import methop_HTTP from "../constantas/method";

export const fetcher = async ({
    URL,
    method = methop_HTTP,
    body = null,
    headers = {}
}) => {
    const response = await fetch(`${ENVIRONMENT.URL_API}` + URL, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : null
    })
    const data = await response.json();

    if(!response.ok)
         throw data;

}