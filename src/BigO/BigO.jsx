import React, {useRef} from "react";
import Styles from "./BigO.module.css"

function BigO({algoritmoUsado}){

    let bigO = useRef(["n", "n", "n"]);

    switch (algoritmoUsado){
        case "Insertion Sort":
            bigO = ["n²", "n²", "n"];
            break;
        case "Select Sort":
            bigO = ["n²", "n²", "n²"];
            break;
        case "Merge Sort":
            bigO = ["n log n", "n log n", "n log n"];
            break;
        case "Thanos Sort":
            bigO = ["log n", "log n", "n"];
            break;
        case "Random Sort":
            bigO = ["∞", "n * n!", "n"];
            break;
        case "Epstein Sort":
            bigO = ["n²", "n²", "n"];
            break;
        default:
            console.log("fodeu");
            bigO = ["?", "?", "?"];
            break;
    }

    return (
        <div id={Styles.bigO}>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Pior Caso</h1>
                <p className={Styles.resto}>O({bigO[0]})</p>
            </div>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Caso Médio</h1>
                <p className={Styles.resto}>O({bigO[1]})</p>
            </div>
            <div className={Styles.conjunto}>
                <h1 className={Styles.titulo}>Melhor Caso</h1>
                <p className={Styles.resto}>O({bigO[2]})</p>
            </div>
        </div>
    )
}

export default BigO;