import React, {Component} from 'react';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import {defaultTableRowRenderer, Table, Column} from 'react-virtualized';
import 'react-virtualized/styles.css'

const SortableTable = SortableContainer(Table);
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

function rowRenderer(props) {
  return <SortableTableRowRenderer {...props} />;
}

function CustomizedTable(props) {
  return (
    <SortableTable 
      rowRenderer={rowRenderer} 
      rowGetter={({index}) => props.items[index]}
      width={600}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={props.items.length}
      handleCheckboxClick={props.handleCheckboxClick}
      {...props} 
    >
      <Column 
        label="Select" 
        dataKey="checkbox" 
        width={25} 
        headerRenderer={() => {
          // something
          return <input type="checkbox"/>
        }}
        handleCheckboxClick={props.handleCheckboxClick}
        cellRenderer={({cellData}) => {
          <input type="checkbox" checked={cellData}/>
        }}
      />
      <Column 
        label="Agenda Item" 
        dataKey="agendaItem"
        cellRenderer={({cellData, rowIndex})=>`${cellData} at row ${rowIndex}`}
        width={300} 
      />
      <Column
        label="Status"
        dataKey="agendaStatus"
        width={200}
        cellRenderer={({cellData}) => {
          return (
            <select value={cellData}>
              <option value="In Progress">In Progress</option>
              <option value="Deferred">Deferred</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </select>
          )
        }}
      />
    </SortableTable>
  );
}

class SortableCustomizedTable extends Component {
  state = {
    items: [
      {checkbox: true, agendaItem: 'Quick', agendaStatus: 'In Progress', height: 89},
      {checkbox: true, agendaItem: 'brown', agendaStatus: 'Deferred', height: 89},
      {checkbox: false, agendaItem: 'fox', agendaStatus: 'Closed', height: 89},
      {checkbox: false, agendaItem: 'jumps', agendaStatus: 'Completed', height: 89},
      {checkbox: true, agendaItem: 'over', agendaStatus: 'Completed', height: 89},
      {checkbox: false, agendaItem: 'the lazy dog', agendaStatus: 'Deferred', height: 89},
    ]
  }
  registerTableRef = tableInstance => {
    this.Table = tableInstance;
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    if (oldIndex === newIndex) return;
    const {items} = this.state;
    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });
    // this.Table.recomputeRowHeight();
    // this.Table.forceUpdate();
  }

  render() {
    const {items} = this.state;
    return(
      <CustomizedTable
        items={items}
        getRef={this.registerTableRef}
        onSortEnd={this.onSortEnd}
        handleCheckboxClick={this.handleCheckboxClick}
      />
    );
  }
}

export default SortableCustomizedTable;