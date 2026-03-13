import React, {useState} from "react";
import Styles from "./TabelaDados.module.css"

import playImg from '../assets/TabelaDados/play.png';
import lesmaImg from '../assets/TabelaDados/lesma.png';
import flashImg from '../assets/TabelaDados/flash.png';
import pauseImg from '../assets/TabelaDados/pause.png';
import aleatorioImg from '../assets/TabelaDados/aleatorio.png';
import metadeImg from '../assets/TabelaDados/metade.png';

function TabelaDados(){

    const [colunas, setColunas] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [novoValor, setNovoValor] = useState(1);
    const [estaRodando, setEstaRodando] = useState(false)

    function mudarQuantidadeDeColunas(e) {
        const numDeColunas = Number(e.target.value);
        const novoArray = Array.from({ length: numDeColunas }, (_, i) => i + 1);
        setColunas(novoArray);
    }

    function ComecarOuTerminar(){
        setEstaRodando(r => r === true ? false : true);
        console.log(estaRodando)
    }

    function aleatorizar(indexInicial, indexFinal){
        let novoArray = [...colunas], j, temp;

        // indexInicial = 10 ; indexFinal = 20
        // i = 10; j = (0.5) * (20 - 10) + 10 = 15
        // i = 11; j = (0) * (20 - 11) + 11 = 11
        // i = 12; j = (1) * (20 - 12) + 12 = 20

        for(let i = indexInicial; i < indexFinal; i++){
            j = Math.floor(Math.random() * (indexFinal - i)) + i
            temp = novoArray[i];
            novoArray[i] = novoArray[j]
            novoArray[j] = temp;
        }
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
                <div id="divAleatorizar">
                    <label htmlFor="btnAleatorizar" id={Styles.texto} >ALEATORIZAR</label>
                    <div id={Styles.divbtnsPequenos}>
                        <button id={Styles.btnPrimeiraMetade} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => aleatorizar(0, Math.floor(colunas.length / 2))}>
                            <img src={metadeImg} alt="Aleatorizar Primeira Metade" style={{width: 24, height: 24}}/>
                        </button>
                        <button id="btnAleatorizar" className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => aleatorizar(0, colunas.length)}>
                            <img src={aleatorioImg} alt="Aleatorizar TUDO" style={{width: 24, height: 24}}/>
                        </button>
                        <button id={Styles.btnSegundaMetade} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => aleatorizar(Math.floor(colunas.length / 2), colunas.length)}>
                            <img src={metadeImg} alt="Aleatoizar Segunda Metade" style={{width: 24, height: 24}} />
                        </button>
                    </div>
                </div>
                <div id={Styles.btnComecar}>
                    <button id={Styles.btnProximo} className={Styles.botao}>PROXIMO</button>
                    <div id={Styles.divbtnsPequenos}>
                        <button id={Styles.btnLesma} className={`${Styles.botao} ${Styles.btnPequeno}`}>
                            <img src={lesmaImg} alt="Velocidade 1" style={{width: 24, height: 24}}/>
                        </button>
                        <button id={Styles.btnPause} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => ComecarOuTerminar()}>
                            <img src={estaRodando === true ? pauseImg : playImg} alt="Velocidade 2" style={{width: 24, height: 24}}/>
                        </button>
                        <button id={Styles.btnFlash} className={`${Styles.botao} ${Styles.btnPequeno}`}>
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