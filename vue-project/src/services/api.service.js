
export const api = { login }

const API_URL = "/api"

async function login({username, password}) {
    let response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({username, password})
    })

    let json = await response.json()
    return json
}