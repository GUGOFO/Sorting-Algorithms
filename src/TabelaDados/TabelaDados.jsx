import React, {useState} from "react";
import Styles from "./TabelaDados.module.css"

import playImg from '../assets/TabelaDados/play.png';
import lesmaImg from '../assets/TabelaDados/lesma.png';
import flashImg from '../assets/TabelaDados/flash.png';
import pauseImg from '../assets/TabelaDados/pause.png';

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
                            style={{"--altura" : `${(coluna/Math.max(...colunas)) * 100}%`,
                                     "--valor" : `"${coluna}"`}}>
                        </div>
                    );
                })}
            </div>
            <div id={Styles.botoes}>
                <div id={Styles.btnComecar}>
                    <button id={Styles.btnProximo} className={Styles.botao}>PROXIMO</button>
                    <div id={Styles.divVelocidades}>
                        <button id={Styles.btnLesma} className={`${Styles.botao} ${Styles.btnVelocidade}`}>
                            <img src={lesmaImg} alt="Velocidade 1" style={{width: 24, height: 24}} />
                        </button>
                        <button id={Styles.btnPause} className={`${Styles.botao} ${Styles.btnVelocidade}`}>
                            <img src={pauseImg} alt="Velocidade 2" style={{width: 24, height: 24}} />
                        </button>
                        <button id={Styles.btnFlash} className={`${Styles.botao} ${Styles.btnVelocidade}`}>
                            <img src={flashImg} alt="Velocidade 3" style={{width: 24, height: 24}} />
                        </button>
                    </div>
                </div>
                <div id={Styles.DivInputColunas}>
                    <label htmlFor="inputNumDeColunas" id={Styles.texto} >COLUNAS</label>
                    <input type="range"
                        id="inputNumDeColunas"
                        className={Styles.inputNumDeColunas}
                        min={10} max={200}
                        value={colunas.length} 
                        onChange={(e) => mudarQuantidadeDeColunas(e)}/>
                </div>
            </div>
        </div>
    )

}

export default TabelaDados;