import React, { Component } from 'react';
// import TableWithSortableRows from './TableWithSortableRows';
import ReactVirtualizedExample from './ReactVirtualizedExample';
import CustomSortableTable from './CustomSortableTable';
import './App.css';

class App extends Component {
  render() {
    const {items, getRef} = this.props;
    return(
      <>
        {/* <ReactVirtualizedExample /> */}
        <CustomSortableTable/>
      </>
    )
  }
}

export default App;
