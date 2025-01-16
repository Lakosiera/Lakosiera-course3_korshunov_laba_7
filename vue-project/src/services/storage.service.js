export const storage = { set, get, remove }


function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function get(key) {
    const value = localStorage.getItem(key) || null
    if (value == null) return null;
    return JSON.parse(value)|| null
}

function remove(key) {
    localStorage.removeItem(key)
}
