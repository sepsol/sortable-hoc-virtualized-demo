// Read deps from UMD exports
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Draggable from 'react-draggable';
import { AutoSizer, defaultTableHeaderRenderer, defaultTableRowRenderer, Column, Table } from 'react-virtualized';
import  { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import list from './create-list.js'
// const { Component } = React
// const { findDOMNode } = ReactDOM
// const Draggable = ReactDraggable
// const { AutoSizer, defaultTableHeaderRenderer, defaultTableRowRenderer, Column, Table } = ReactVirtualized
// const { SortableContainer, SortableElement, SortableHandle } = SortableHOC

// Connect react-virtualized and react-sortable-hoc
const SortableTable = SortableContainer(Table, {
  withRef: true
})
const SortableRow = SortableElement(defaultTableRowRenderer)
const DragHandle = SortableHandle(({ children }) => (
  <div>{children}</div>
))

const MIN_COLUMN_WIDTH = 50

class DemoApp extends Component {
  constructor (props, context) {
    super(props, context)

    this._draggableHeaderRenderer = this._draggableHeaderRenderer.bind(this)
    this._draggableColumn = this._draggableColumn.bind(this)
    this._rowRenderer = this._rowRenderer.bind(this)
    this._sortRow = this._sortRow.bind(this)

    this.state = {
      flexColums: [
        'index',
        'age',
        'name'
      ],
      flexColumProps: {
        age: {
          cellRenderer: this._draggableColumn,
          dataKey: 'age',
          label: 'Age',
          width: 100
        },
        index: {
          cellRenderer: this._draggableColumn,
          dataKey: 'index',
          label: '#',
          width: 50
        },
        name: {
          cellRenderer: this._draggableColumn,
          dataKey: 'name',
          label: 'Name',
          width: 200
        }
      }
    }
  }

  render () {
    const { flexColums, flexColumProps } = this.state

    return (
      <AutoSizer>
        {({ width, height }) => (
          <SortableTable
            getContainer={(wrappedInstance) => findDOMNode(wrappedInstance.Grid)}
            headerHeight={40}
            height={height}
            onSortEnd={this._sortRow}
            rowClassName='Row'
            rowHeight={50}
            rowGetter={({ index }) => list[index]}
            rowCount={list.length}
            rowRenderer={this._rowRenderer}
            useDragHandle
            width={width}
          >
            {flexColums.map((key) => (
              <Column
                className='DragHandleColumn'
                key={key}
                headerRenderer={this._draggableHeaderRenderer}
                {...flexColumProps[key]}
              />
            ))}
          </SortableTable>
        )}
      </AutoSizer>
    )
  }

  _draggableHeaderRenderer (props) {
    return (
      <div className='DraggableHeader'>
        {defaultTableHeaderRenderer(props)}
        <Draggable
          axis='x'
          defaultClassName='DragHandle'
          defaultClassNameDragging='DragHandleActive'
          onStop={(event, data) => this._resizeColumn({
            dataKey: props.dataKey,
            deltaX: data.x
          })}
          position={{
            x: 0,
            y: 0
          }}
          zIndex={999}
        >
          <div>||</div>
        </Draggable>
      </div>
    )
  }

  _draggableColumn ({ cellData, rowData, rowIndex }) {
    if (this._isRowSortable(rowIndex)) {
      return (
        <DragHandle>{cellData}</DragHandle>
      )
    } else {
      return cellData + 1
    }
  }

  _isRowSortable (index) {
    return index >= 0 // Header row should not be draggable
  }

  _resizeColumn ({ dataKey, deltaX }) {
    const { flexColumProps } = this.state

    // Once a column has been resized, lock its size
    // This prevents an awkward user experience where their resized width is overridden by flex
    const thisColumn = flexColumProps[dataKey]
    thisColumn.flexGrow = 0
    thisColumn.flexShrink = 0
    thisColumn.width = Math.max(MIN_COLUMN_WIDTH, thisColumn.width + deltaX)

    this.setState({
      flexColumProps
    })
  }

  _rowRenderer (props) {
    const { index } = props

    return this._isRowSortable(index)
      ? <SortableRow {...props} />
      : defaultTableRowRenderer(props)
  }

  _sortRow ({ newIndex, oldIndex }) {
    if (newIndex === oldIndex) {
      return
    }

    const row = list[oldIndex]

    list.splice(oldIndex, 1)
    list.splice(newIndex, 0, row)

    this.forceUpdate() // Re-render
  }
}

export default DemoApp;