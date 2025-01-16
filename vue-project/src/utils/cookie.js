export const cookie = { get, set }

function get(key, defValue = null) {
    return document.cookie
        .split(";") // делим строку на масив (; - в качестве разделителя)
        .map((item) => item.trim()) // убераем пробелы в элементах массива (отступы в начали или конце)
        .find((item) => item.startsWith(`${key}=`)) // ищем элемент который начинаеться на "ключ="
        ?.split("=")[1] || defValue // если нашли вернум все что было после "=" иначе значчение "defValue"
}

// сохраняем куки
function set(key, value) {
    document.cookie = `${key}=${value}`
}