import Styles from "./TabelaDados.module.css"

function BtnPequeno({btnId, btnFuncao, btnImagem, btnAlt}){
    return(
        <button id={btnId} className={`${Styles.botao} ${Styles.btnPequeno}`} onClick={btnFuncao}>
            <img src={btnImagem} alt={btnAlt} style={{width: 24, height: 24}}/>
        </button>
    )
}

export default BtnPequeno