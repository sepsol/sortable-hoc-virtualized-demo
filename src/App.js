import React, { Component } from 'react';
// import TableWithSortableRows from './TableWithSortableRows';
import ReactVirtualizedExample from './ReactVirtualizedExample';
import {List} from 'react-virtualized';

import './App.css';

class App extends Component {
  render() {
    const {items, getRef} = this.props;
    return(
      <>
        <ReactVirtualizedExample />
      </>
    )
  }
}

export default App;
