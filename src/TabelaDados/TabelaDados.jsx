import React, {useState} from "react";
import Styles from "./TabelaDados.module.css"

function TabelaDados(){

    const [colunas, setColunas] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [novoValor, setNovoValor] = useState(1);

    return(
        <div id={Styles.tabela}>
            {colunas.map((coluna, id) => { 
                return (
                    <div className={Styles.coluna}
                         key={id}
                         style={{"--altura" : `${(coluna/Math.max(...colunas)) * 100}%`}}>
                    </div>
                );
            })}
        </div>
    )

}

export default TabelaDados;