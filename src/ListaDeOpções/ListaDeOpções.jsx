import Styles from "./ListaDeOpções.module.css"

function ListaDeOpções({setAlgoritmo}){


    return(
        <div id={Styles.divListaDeOpcoes}>
            <ol id={Styles.listaDeOpcoes}>
                <li onClick={() => setAlgoritmo("Busca Binaria")}>BUSCA BINARIA</li>
                <li onClick={() => setAlgoritmo("Insertion Sort")}>INSERTION SORT</li>
                <li onClick={() => setAlgoritmo("Select Sort")}>SELECT SORT</li>
                <li onClick={() => setAlgoritmo("Merge Sort")}>MERGE SORT</li>
                <li onClick={() => setAlgoritmo("Quick Sort")}>QUICK SORT</li>
            </ol>
        </div>
    )
}

export default ListaDeOpções