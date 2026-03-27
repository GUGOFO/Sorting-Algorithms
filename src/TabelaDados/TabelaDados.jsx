import React, {useState, useEffect, useRef} from "react";
import Styles from "./TabelaDados.module.css"
import BtnPequeno from "./btnPequeno";

import playImg from '../assets/TabelaDados/play.png';
import lesmaImg from '../assets/TabelaDados/lesma.png';
import flashImg from '../assets/TabelaDados/flash.png';
import pauseImg from '../assets/TabelaDados/pause.png';
import aleatorioImg from '../assets/TabelaDados/aleatorio.png';
import metadeImg from '../assets/TabelaDados/metade.png';
import pessoaAndando from '../assets/TabelaDados/pessoaAndando.png';

function TabelaDados({algoritmoUsado}){

    const [colunas, setColunas] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [estaRodando, setEstaRodando] = useState(false)
    const [idCorVerde, setIdCorVerde] = useState(-1)
    const [idCorVermelho, setIdCorVermelho] = useState(-1)
    const intervaloDeTempoRef = useRef((15/colunas.length) * 100);

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

    function rodarSorting(){
        switch (true){
            case algoritmoUsado === "Insertion Sort":
                insertionSort();
                break;
            case algoritmoUsado === "Select Sort":
                selectSort();
                break;
            case algoritmoUsado === "Merge Sort":
                mergeSort();
                break;
            case algoritmoUsado === "Thanos Sort":
                thanosSort();
                break;
            default:
                console.log("fodeu")
                break;
        }
        console.log(algoritmoUsado)
    }

    //Arrumar o bug de velocidade so mudar quando voce clicar affs

    function desacelerar(){
        intervaloDeTempoRef.current = (90/colunas.length) * 100; 
    }

    function acelerar(){
        intervaloDeTempoRef.current = (2/colunas.length) * 100; 
    }

    function velocidadeMedia(){
        intervaloDeTempoRef.current = (15/colunas.length) * 100;
    }

    function aleatorizar(indexInicial, indexFinal){
        let novoArray = [...colunas];
        let i = indexInicial;
        setEstaRodando(true)

        function passo() {
            if (i < indexFinal) {
                let j = Math.floor(Math.random() * (indexFinal - i)) + i;
                let temp = novoArray[i];
                novoArray[i] = novoArray[j];
                novoArray[j] = temp;
                setColunas([...novoArray]);
                modificarCores(i, j);
                i++;
                setTimeout(passo, intervaloDeTempoRef.current);
            }
            else {
                modificarCores(-1, -1);
                setEstaRodando(false)
            }
        }
        passo();
    }

    async function tudoCorreto(){
        setEstaRodando(true)
        for(let i = 0; i < colunas.length; i++){
            modificarCores(i, -1);
            await new Promise(resolve => setTimeout(resolve, (15/colunas.length) * 100)); 
        }
        modificarCores(-1, -1);
        setEstaRodando(false)
    }

    function ordemCorreta(vetor){
        if(vetor.length <= 1) return true;

        for(let i = 0; i < vetor.length - 1; i++)
            if(vetor[i] > vetor[i + 1]) return false;
        return true
    }

    async function insertionSort() {

        let colunasAtualizadas = [...colunas]; 
        setEstaRodando(true)

        for(let j = 1; j < colunasAtualizadas.length; j++){
            const x = colunasAtualizadas[j];
            let i = j - 1;
            
            while(i >= 0 && colunasAtualizadas[i] > x){
                let temp = colunasAtualizadas[i + 1]
                colunasAtualizadas[i + 1] = colunasAtualizadas[i];
                colunasAtualizadas[i] = temp;
                setColunas([...colunasAtualizadas]); 
                modificarCores(i,i + 1);
                await new Promise(resolve => setTimeout(resolve, intervaloDeTempoRef.current)); 
                i--;
            }
        }
        setEstaRodando(false)
        tudoCorreto();
    }

    async function selectSort(){
        let colunasAtualizadas = [...colunas];
        const tamanhoColunas = colunasAtualizadas.length;
        setEstaRodando(true)

        for(let i = 0; i < tamanhoColunas; i++){
            let min = i;
            for(let j = i + 1; j < tamanhoColunas; j++) {
                if(colunasAtualizadas[j] < colunasAtualizadas[min]) min = j;
                setColunas([...colunasAtualizadas]);
                modificarCores(min, j);
                await new Promise(resolve => setTimeout(resolve, intervaloDeTempoRef.current));
            }
            const temp = colunasAtualizadas[i];
            colunasAtualizadas[i] = colunasAtualizadas[min];
            colunasAtualizadas[min] = temp;
            setColunas([...colunasAtualizadas]);
        }
        
        setEstaRodando(false)
        tudoCorreto();
    }

    async function mergeSort(){
        let colunasAtualizadas = [...colunas];
        const tamanhoColunas = colunasAtualizadas.length - 1;
        setEstaRodando(true);        

        async function intercala(e, m, d){
            let i = e;
            let j = m + 1;

            while (i <= m && j <= d) {
                if (colunasAtualizadas[i] <= colunasAtualizadas[j]) {
                    i++;
                } else {
                    let valor = colunasAtualizadas[j];
                    let index = j;
                    while (index !== i) {
                        colunasAtualizadas[index] = colunasAtualizadas[index - 1];
                        index--;
                    }
                    colunasAtualizadas[i] = valor;
                    modificarCores(i, j); 
                    setColunas([...colunasAtualizadas]);
                    await new Promise(resolve => setTimeout(resolve, intervaloDeTempoRef.current));
                    i++; m++; j++;
                }
            }
        }

        async function merge(e, d){
            if(e < d){
                let m = Math.floor((e + d) / 2);
                await merge(e,m);
                await merge(m + 1, d);
                await intercala(e, m, d)
            }
        }

        await merge(0, tamanhoColunas)
        modificarCores(-1, -1);
        tudoCorreto()
        setEstaRodando(false)
    }

    async function thanosSort(){
        let colunasAtualizadas = [...colunas];
        setEstaRodando(true)
        
        while(!ordemCorreta(colunasAtualizadas)){
            const metadeDoVetor = Math.floor(colunasAtualizadas.length / 2);
            
            for(let i = 0; i < metadeDoVetor; i++){
                const novoTamanho = colunasAtualizadas.length;
                const indiceAleatorio = Math.floor(Math.random() * novoTamanho);
                colunasAtualizadas = colunasAtualizadas.filter((_, index) => index !== indiceAleatorio);
            }
            setColunas([...colunasAtualizadas])
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setColunas([...colunasAtualizadas])
        
        for(let i = 0; i < colunasAtualizadas.length; i++){
            modificarCores(i, -1);
            await new Promise(resolve => setTimeout(resolve, (15/colunasAtualizadas.length) * 100)); 
        }
        modificarCores(-1, -1);
        setEstaRodando(false)
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

                        <BtnPequeno btnId={Styles.btnPrimeiraMetade}
                                    btnFuncao={() => aleatorizar(0, Math.floor(colunas.length / 2))}
                                    btnImagem={metadeImg} 
                                    btnAlt={"Aleatorizar Primeira Metade"}
                                    btnRodando={estaRodando}
                        />
                        <BtnPequeno btnId="btnAleatorizar"
                                    btnFuncao={() => aleatorizar(0, colunas.length)}
                                    btnImagem={aleatorioImg} 
                                    btnAlt={"Aleatorizar TUDO"}
                                    btnRodando={estaRodando}
                        />
                        <BtnPequeno btnId={Styles.btnSegundaMetade}
                                    btnFuncao={() => aleatorizar(Math.floor(colunas.length / 2), colunas.length)}
                                    btnImagem={metadeImg} 
                                    btnAlt={"Aleatoizar Segunda Metade"}
                                    btnRodando={estaRodando}
                        />

                    </div>
                </div>
                <div id={Styles.btnComecar}>
                    <button id={Styles.btnProximo} className={Styles.botao} onClick={() => rodarSorting()} disabled={estaRodando}>
                        <img src={estaRodando === true ? pauseImg : playImg} 
                             alt={"Ativar"} 
                             style={{width: 24, height: 24}}/>
                    </button>
                    <div id={Styles.divbtnsPequenos}>

                        <BtnPequeno btnId={Styles.btnLesma}
                                    btnFuncao={() => desacelerar()}
                                    btnImagem={lesmaImg} 
                                    btnAlt={"Velocidade 1"}
                                    btnRodando={estaRodando}
                        />
                        <BtnPequeno btnId={Styles.btnPause}
                                    btnFuncao={() => velocidadeMedia()}
                                    btnImagem={pessoaAndando} 
                                    btnAlt={"Velocidade 2"}
                                    btnRodando={estaRodando}
                        />
                        <BtnPequeno btnId={Styles.btnFlash}
                                    btnFuncao={() => acelerar()}
                                    btnImagem={flashImg} 
                                    btnAlt={"Velocidade 3"}
                                    btnRodando={estaRodando}
                        />
                        
                    </div>
                </div>
                <div id={Styles.DivInputColunas}>
                    <label htmlFor="inputNumDeColunas" id={Styles.texto} onClick={() => setColunas([1,2,3,4,5,6,7,8,9,10])} >COLUNAS</label>
                    <input type="range"
                        id="inputNumDeColunas"
                        className={Styles.inputNumDeColunas}
                        min={10} max={200}
                        value={colunas.length} 
                        onChange={(e) => mudarQuantidadeDeColunas(e)}
                        disabled={estaRodando}/>
                </div>
            </div>
        </div>
    )

}

export default TabelaDados;