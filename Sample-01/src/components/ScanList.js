import React, {useEffect, useState} from "react";
import configJson from "../auth_config.json";
import {useAuth0} from "@auth0/auth0-react";
import {getScanData} from "../services/ScanService";

function ScanList(){
    const { getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken]=useState(null)
    const [scanData, setScanData]=useState(null)

    useEffect(()=>{
        getAccessToken()
    },[])

    useEffect(()=>{
        if(accessToken) fetchData()
    },[accessToken])

    return <div>
        {scanData?scanData.map(scanItem=><div key={scanItem.ID}>{scanItem.ID}</div>):null}
    </div>

    async function fetchData(){
        try {
            let scanResults = await getScanData(null,accessToken)
            scanResults = await scanResults.json()
            setScanData(scanResults.Data)
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


export default ScanList;
