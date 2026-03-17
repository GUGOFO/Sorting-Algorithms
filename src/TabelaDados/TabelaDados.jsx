import React, {useState, useEffect, useRef} from "react";
import Styles from "./TabelaDados.module.css"
import BtnPequeno from "./btnPequeno";

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
    const [idCorVerde, setIdCorVerde] = useState(-1)
    const [idCorVermelho, setIdCorVermelho] = useState(-1)
    const [intervaloDeTempo, setIntervaloDeTempo] = useState(Math.floor(300 / colunas.length)); //Sim vai ter um numero magico por em quanto e fds akkasak, um dia tiro

    const ColunaItem = React.memo(({ coluna, maxColunas, cor }) => {
        return (
            <div className={Styles.coluna}
                style={{
                    "--altura" : `${(coluna / maxColunas) * 100}%`,
                    "--valor" : `"${coluna}"`,
                    background: cor
                }}>
            </div>
        );
    });
    
    function modificarCores(idVerde, idVermelho){
        setIdCorVerde(idVerde);
        setIdCorVermelho(idVermelho);
    }

    function mudarQuantidadeDeColunas(e) {
        const numDeColunas = Number(e.target.value);
        const novoArray = Array.from({ length: numDeColunas }, (_, i) => i + 1);
        setColunas(novoArray);
    }

    function ComecarOuTerminar(){
        setEstaRodando(!estaRodando)
    }

    function desacelerar(){
        setIntervaloDeTempo(t => t = 500);
    }

    function acelerar(){
        setIntervaloDeTempo(t => t = 1)
    }

    function aleatorizar(indexInicial, indexFinal){
        let novoArray = [...colunas];
        let i = indexInicial;

        function passo() {
            if (i < indexFinal) {
                let j = Math.floor(Math.random() * (indexFinal - i)) + i;
                let temp = novoArray[i];
                novoArray[i] = novoArray[j];
                novoArray[j] = temp;
                setColunas([...novoArray]);
                modificarCores(i, j);
                i++;
                setTimeout(passo, intervaloDeTempo);
            }
            else modificarCores(-1, -1);
        }
        passo();
    }

    return(
        <div id={Styles.conjuntoTabela}>
            <div id={Styles.tabela}>
                {colunas.map((coluna, id) => { 
                    let corAtual = "linear-gradient(135deg, hsl(0, 0%, 80%), hsl(0, 0%, 20%))";
                    if (id === idCorVerde) corAtual = "green";
                    else if (id === idCorVermelho) corAtual = "red";
                    return (
                        <ColunaItem 
                            key={id} 
                            coluna={coluna} 
                            maxColunas={Math.max(...colunas)} 
                            cor={corAtual} 
                        />
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

                        <BtnPequeno btnId={Styles.btnPrimeiraMetade} btnFuncao={() => aleatorizar(0, Math.floor(colunas.length / 2))} btnImagem={metadeImg} btnAlt={"Aleatorizar Primeira Metade"}/>

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
                        <button id={Styles.btnLesma} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => desacelerar()}>
                            <img src={lesmaImg} alt="Velocidade 1" style={{width: 24, height: 24}}/>
                        </button>
                        <button id={Styles.btnPause} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => ComecarOuTerminar()}>
                            <img src={estaRodando === true ? pauseImg : playImg} alt="Velocidade 2" style={{width: 24, height: 24}}/>
                        </button>
                        <button id={Styles.btnFlash} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={() => acelerar()} >
                            <img src={flashImg} alt="Velocidade 3" style={{width: 24, height: 24}} />
                        </button>
                    </div>
                </div>
                <div id={Styles.DivInputColunas}>
                    <label htmlFor="inputNumDeColunas" id={Styles.texto} onClick={() => setColunas([1,2,3,4,5,6,7,8,9,10])} >COLUNAS</label>
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