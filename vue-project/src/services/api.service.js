import { cookie } from "@/utils/cookie";

export const api = { login, customers }

const API_URL = "/api"
const COOKIE_AUTH_KEY = 'auth_token'
const COOKIE_SESSIONID_KEY = 'sessionid'

async function login({username, password}) {
    const basic = btoa(`${username}:${password}`)
    let response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Basic ${basic}`,
        },
    })

    if (response.status == 200) {
        cookie.set(COOKIE_AUTH_KEY, basic)
    }
    let json = await response.json()

    return json
}

async function customers() {
    let response = await fetch(`${API_URL}/customer/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-CSRFToken': cookie.get('csrftoken'),
            // 'cookie': `COOKIE_SESSIONID_KEY=${cookie.get('COOKIE_SESSIONID_KEY')}`,
        },
        // body: JSON.stringify({username, password})
    })

    let json = await response.json()
    return json
}