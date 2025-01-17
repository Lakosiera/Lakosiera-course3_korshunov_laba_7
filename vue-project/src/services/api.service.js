import { cookie } from "@/utils/cookie";

export const api = {
    login, logout,
    customers,
    getToken, guestData,
    depositsList, depositCreate, depositRead, depositUpdate, depositDelete,
    loansList, loanCreate, loanRead, loanUpdate, loanDelete,
}

const API_URL = "/api"
const COOKIE_TOKEN_KEY = 'token'

async function login({ username, password }) {
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

async function guestData() {
    let response = await fetch(`${API_URL}/guest/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })

    let json = await response.json()
    return json
}

// Депозиты
async function depositsList(customerId) {
    let response = await fetch(`${API_URL}/customer/${customerId}/deposit/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })

    let json = await response.json()
    return json
}

async function depositCreate(customerId, data) {
    let response = await fetch(`${API_URL}/customer/${customerId}/deposit/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
        body: JSON.stringify(data)
    })

    let json = await response.json()
    return json
}

async function depositRead(customerId) {
    let response = await fetch(`${API_URL}/customer/${customerId}/deposit/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })

    let json = await response.json()
    return json
}

async function depositUpdate(customerId, data) {
    let response = await fetch(`${API_URL}/customer/${customerId}/deposit/${depositId}/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
        body: JSON.stringify(data)
    })

    let json = await response.json()
    return json
}

async function depositDelete(customerId, depositId) {
    await fetch(`${API_URL}/customer/${customerId}/deposit/${depositId}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })
}


// Займы
async function loansList(customerId) {
    let response = await fetch(`${API_URL}/customer/${customerId}/deposit/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })

    let json = await response.json()
    return json
}

async function loanCreate(customerId, data) {
    let response = await fetch(`${API_URL}/customer/${customerId}/loan/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
        body: JSON.stringify(data)
    })

    let json = await response.json()
    return json
}

async function loanRead(customerId) {
    let response = await fetch(`${API_URL}/customer/${customerId}/loan/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })

    let json = await response.json()
    return json
}

async function loanUpdate(customerId, loanId, data) {
    let response = await fetch(`${API_URL}/customer/${customerId}/loan/${loanId}/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
        body: JSON.stringify(data)
    })

    let json = await response.json()
    return json
}

async function loanDelete(customerId, loanId) {
    await fetch(`${API_URL}/customer/${customerId}/loan/${loanId}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${cookie.get(COOKIE_TOKEN_KEY)}`,
        },
    })
}