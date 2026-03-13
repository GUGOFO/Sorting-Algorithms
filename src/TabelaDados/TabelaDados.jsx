import React, {useState} from "react";
import Styles from "./TabelaDados.module.css"

function TabelaDados(){

    const [colunas, setColunas] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [novoValor, setNovoValor] = useState(1);

    function mudarQuantidadeDeColunas(e) {
        const numDeColunas = Number(e.target.value);
        const novoArray = Array.from({ length: numDeColunas }, (_, i) => i + 1);
        setColunas(novoArray);
    }

    return(
        <div id={Styles.conjuntoTabela}>
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
            <div id={Styles.DivInputColunas}>
                <label htmlFor="inputNumDeColunas" id={Styles.texto}>COLUNAS</label>
                <input type="range"
                       id="inputNumDeColunas"
                       className={Styles.inputNumDeColunas}
                       min={10} max={200}
                       value={colunas.length} 
                       onChange={(e) => mudarQuantidadeDeColunas(e)}/>
            </div>
        </div>
    )

}

export default TabelaDados;