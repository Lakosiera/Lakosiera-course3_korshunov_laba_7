import { cookie } from "@/utils/cookie";

export const api = { login }

const API_URL = "/api"

async function login({username, password}) {
    let response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            // 'X-CSRFToken': `${cookie.get("csrftoken")}`
        },
        // body: JSON.stringify({username, password})
    })

    // csrftoken=xo89g3OA3H3q0XoDadOcCDlTdJUOOuZr

    let json = await response.json()
    return json
}