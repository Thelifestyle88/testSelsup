import './App.css';
import ParamEditor, { testParams, testModel } from './components/ParamEditor/ParamEditor';

function App() {
  return <ParamEditor params={testParams} model={testModel} />;
}

export default App;
