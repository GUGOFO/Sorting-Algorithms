
import Styles from "./ListaDeOpções.module.css"

function ListaDeOpções(){

    return(
        <div id={Styles.divListaDeOpcoes}>
            <ol id={Styles.listaDeOpcoes}>
                <ul>BUSCA BINARIA</ul>
                <ul>INSERTION SORT</ul>
                <ul>SELECT SORT</ul>
                <ul>MERGE SORT</ul>
                <ul>QUICK SORT</ul>
            </ol>
        </div>
    )


}

export default ListaDeOpções