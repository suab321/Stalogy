import React from 'react';
import {Button} from 'react-materialize';
import cookie from 'react-cookies';
import Items from './component/Items';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Items/>
      </div>
    )
  }
}

export default App;
