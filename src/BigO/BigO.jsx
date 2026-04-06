import React from "react";
import Styles from "./BigO.module.css"

function BigO({algoritmoUsado}){

    return (
        <div id={Styles.bigO}>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Pior Caso</h1>
                <p className={Styles.resto}>O(n)</p>
            </div>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Caso Médio</h1>
                <p className={Styles.resto}>O(n)</p>
            </div>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Melhor Caso</h1>
                <p className={Styles.resto}>O(n)</p>
            </div>
        </div>
    )
}

export default BigO;