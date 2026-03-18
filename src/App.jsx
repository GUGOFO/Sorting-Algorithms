import React, {useState} from 'react'
import TabelaDados from './TabelaDados/TabelaDados'
import ListaDeOpções from './ListaDeOpções/ListaDeOpções'
import './App.css'

function App() {

  const [algoritmo, setAlgoritmo] = useState("Insertion Sort")

  return(
    <div id='paginaCompleta'>
      <ListaDeOpções/>

      <div id="pagina">
        <h1 id='titulo' >{algoritmo}</h1>
        <TabelaDados/>
      </div>

    </div>
  )
}

export default App
