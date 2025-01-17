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

    if (response.status != 200) {
        return null
    }

    let json = await response.json()
    cookie.set(COOKIE_TOKEN_KEY, json.token)
    return json.token || null
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
        },
        // body: JSON.stringify({username, password})
    })

    let json = await response.json()
    return json
}

function getToken() {
    const token = cookie.get(COOKIE_TOKEN_KEY)
    if (!token) return null
    if (token.lenght == 0) return null
    return token
}