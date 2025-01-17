import { cookie } from "@/utils/cookie";

export const api = { login, logout, customers, getToken }

const API_URL = "/api"
const COOKIE_TOKEN_KEY = 'token'

async function login({username, password}) {
    const basic = btoa(`${username}:${password}`)
    let response = await fetch(`${API_URL}/login/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Basic ${basic}`,
        },
    })

    let json = await response.json()
    if (response.status == 200) {
        cookie.set(COOKIE_TOKEN_KEY, json.token)
        return json.token || null
    }

    return null
}

function logout() {
    cookie.remove(COOKIE_TOKEN_KEY)
}

async function customers() {
    let response = await fetch(`${API_URL}/customer/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
            // 'X-CSRFToken': cookie.get('csrftoken'),
            // 'cookie': `COOKIE_SESSIONID_KEY=${cookie.get('COOKIE_SESSIONID_KEY')}`,
        },
        // body: JSON.stringify({username, password})
    })

    let json = await response.json()
    return json
}

function getToken() {
    return cookie.get(COOKIE_TOKEN_KEY) || null
}