import TabelaDados from './TabelaDados/TabelaDados'
import ListaDeOpções from './ListaDeOpções/ListaDeOpções'
import './App.css'

function App() {

  return(
    <div id='paginaCompleta'>
      <ListaDeOpções/>

      <div id="pagina">
        <h1 id='titulo'>NOME DO SORT</h1>
        <TabelaDados/>
      </div>

    </div>
  )
}

export default App
