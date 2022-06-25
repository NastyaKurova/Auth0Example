import React, {useEffect, useState} from "react";
import configJson from "../../auth_config.json";
import {useAuth0} from "@auth0/auth0-react";
import {getAccountData, getScanData} from "../../services/ScanService";
import ScanList from "../../components/ScanList";
import style from "../ScanPage/scanPage.module.css";
import ComponentWithSidebar from "../../components/ComponentWithSideBar/ComponentWithSidebar";
import InputSearch from "../../components/InputSearch/InputSearch";
const ITEMS_PER_PAGE = 10;
function ScanPage(){
    const { getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken]=useState(null)
    const [scanData, setScanData]=useState(null)
    const [pagination, setPagination]=useState(null)
    const [page, setPage]=useState(1)
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        getAccessToken()
    },[])

    useEffect(()=>{
        if(accessToken) fetchData(page)
    },[accessToken, page])

    return <ComponentWithSidebar>
        <div className={style.scanPage}>
            <div className={style.scanPageControls}>
                <InputSearch/>
                <InputSearch/>
            </div>

        {!loading?<ScanList page={page}
                            setPage={setPage}
                            perPage={ITEMS_PER_PAGE}
                            pagination={pagination}
                            scanData={scanData}></ScanList>:<div>Загрузка</div>}
    </div>
    </ComponentWithSidebar>
    async function fetchData(page){
        try {
            setLoading(true)
            let scanResults = await getScanData(page,ITEMS_PER_PAGE,accessToken)
            setPagination(scanResults.Pagination)


            let ids=scanResults.Data.map(({IdentityID})=>IdentityID)
            ids=new Set(ids)
            let accountResults = await getAccountData([...ids],accessToken)
            const concutResults = scanResults.Data.map(({ID, IdentityID})=> {
                const {FirstName, LastName,Birthday,City,State,Gender,EyeColor, Height,Weight,CreatedAt} =
                    accountResults.find(({ID:accountId}) => IdentityID === accountId )

                return {ID, FirstName,LastName,Birthday,City,State,Gender,EyeColor,Height,Weight,CreatedAt}

            } )
            setScanData(concutResults)
            setLoading(false);

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
