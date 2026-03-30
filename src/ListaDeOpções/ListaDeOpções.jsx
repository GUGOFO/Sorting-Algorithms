import Styles from "./ListaDeOpções.module.css"

function ListaDeOpções({setAlgoritmo}){


    return(
        <div id={Styles.divListaDeOpcoes}>
            <ol id={Styles.listaDeOpcoes}>
                <li onClick={() => setAlgoritmo("Insertion Sort")}>INSERTION SORT</li>
                <li onClick={() => setAlgoritmo("Select Sort")}>SELECT SORT</li>
                <li onClick={() => setAlgoritmo("Merge Sort")}>MERGE SORT</li>
                <li onClick={() => setAlgoritmo("Thanos Sort")}>THANOS SORT</li>
                <li onClick={() => setAlgoritmo("Random Sort")}>RANDOM SORT</li>
                <li onClick={() => setAlgoritmo("Epstein Sort")}>EPSTEIN SORT</li>
            </ol>
        </div>
    )
}

export default ListaDeOpções