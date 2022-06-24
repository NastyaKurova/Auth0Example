import {customFetch} from "./API"

export async function getScanData(pageFrom,itemsByPage, accessToken){
    const data= JSON.stringify( {
            Page: pageFrom,
            PerPage: itemsByPage
        }
    )
    let result = await requestPostWithHeaders(`/api/v2/scans/get`, data, accessToken)
    result = await result.json()
    return result;
}

export async function getAccountData(ids,accessToken){
    const data= JSON.stringify({IDs:ids})
    let result = await requestPostWithHeaders(`/api/v2/identities/get`, data, accessToken)
    result = await result.json()
    return result.Data;
}

export function requestPostWithHeaders(url, data, accessToken){
   return customFetch(url,'POST',{
        'Content-Type': 'application/json',
        'X-User-Id':'Auth0User',
        'X-Org-Id':'Auth0Org',
        'Authorization':`Bearer ${accessToken}`,
    },data)
}

