import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css'

const App = () => (  
  <Home/>
);

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);