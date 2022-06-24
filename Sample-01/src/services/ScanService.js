import {customFetch} from "./API"
export function getScanData(data, accessToken){
    const dataCur= JSON.stringify( {
            "Page": 1,
            "PerPage": 20
        }
    )
    return customFetch(`/api/v2/scans/get`,'POST',{
        'Content-Type': 'application/json',
        'X-User-Id':'Auth0User',
        'X-Org-Id':'Auth0Org',
        'Authorization':`Bearer ${accessToken}`,
    },dataCur)
}

