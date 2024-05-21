import './App.css';
import Banner from './Components/Banner/Banner';
import Header from './Components/Header/Header';
import RowPost from './Components/RowPost/RowPost';
import {originals,actions,horror} from './url'

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={actions} title='Action' isSmall/>
      <RowPost url={horror} title='Horror' isSmall/>
    </div>
  );
}

export default App;
