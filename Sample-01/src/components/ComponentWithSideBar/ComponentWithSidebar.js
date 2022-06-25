import * as React from 'react';
import style from './componentWithSidebar.module.scss';
import {Container} from "reactstrap";
import img from "../../assets/sidebarImg.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import {faCloud} from "@fortawesome/free-solid-svg-icons";



export default function ComponentWithSidebar({children}) {

    return <div>
        <nav className={style.sideBar}>
            <div className={style.sideBarImgBlock}>
                <img src={img} alt="hamster img"/>
            </div>
            <div className={style.sideBarIcos}>
            <div className={style.sideBarIcosItem}>
                <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className={style.sideBarIcosItem}>
                <FontAwesomeIcon icon={faCloud}/>
            </div>
            <div className={style.sideBarIcosItem}>
                <FontAwesomeIcon icon="power-off"  />
            </div>
            </div>
        </nav>
        <Container className={style.sideContainer}>
        {children}
        </Container>
    </div>

}