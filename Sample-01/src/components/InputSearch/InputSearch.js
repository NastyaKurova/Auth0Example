import * as React from 'react';
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import style from "./InputSearch.module.scss";
import styleInput from "../Input.module.scss";



export default function InputSearch({label}) {
    const [value,setValue]=useState('')
    return <div  className={style.searchInput}>
     {label&&<label htmlFor=""></label>}
      <input type="text" value={value} onChange={onChangeInput} className={`${style.searchInputItem} ${styleInput.input}`} placeholder="Поиск"/>
        <FontAwesomeIcon icon={faSearch} className={`mr-2 regular ${style.searchInputIco}`} />

    </div>


    function onChangeInput(event){
        setValue(event.target.value)
    }
}