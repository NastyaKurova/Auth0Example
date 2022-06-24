export function customFetch(url, method, headers, data){
    try {
        return  fetch(url,{
            method: method,
            headers,
            body:data
        })
    } catch (e) {
        throw new Error('API Error')
    }
}