import React, {useEffect, useState} from "react";
import configJson from "../auth_config.json";
import {useAuth0} from "@auth0/auth0-react";
import {getAccountData, getScanData} from "../services/ScanService";
import ScanList from "../components/ScanList";

function ScanPage(){
    const { getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken]=useState(null)
    const [scanData, setScanData]=useState(null)
    const [accountsData, setAccountsData]=useState(null)
    const [page, setPage]=useState(1)
    const [perPage, setPerPage]=useState(20)
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        getAccessToken()
    },[])

    useEffect(()=>{
        if(accessToken) fetchData(page, perPage)
    },[accessToken, page, perPage])

    return <div>
        {!loading?<ScanList page={page}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            accountsData={accountsData}
                            scanData={scanData}></ScanList>:<div>Загрузка</div>}
    </div>

    async function fetchData(page, perPage){
        try {
            setLoading(true)
            let scanResults = await getScanData(page,perPage,accessToken)
            setScanData(scanResults)
            setLoading(false)

            let ids=scanResults.Data.map(({IdentityID})=>IdentityID)
            ids=new Set(ids)
            let accountResults = await getAccountData([...ids],accessToken)
            setAccountsData(accountResults)
        } catch (e) {
            throw new Error("Scan api error")

        }
    }
    async function getAccessToken(){
        try {
          const token= await getAccessTokenSilently({
                audience:configJson.audience,
            });
          await setAccessToken(token)

        } catch (e) {
            throw new Error("Can't get access token")
        }
    }
}


export default ScanPage;
