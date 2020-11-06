import React, { Component } from 'react';
import 'react-virtualized/styles.css';

import { Table, Column } from 'react-virtualized';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const ROW_HEIGHT = 30;
const HEADER_ROW_HEIGHT = 20;
const COL_WIDTH = 100;

const SortableHeader = sortableElement(
    ({ children, ...props }) =>
        React.cloneElement(children, props)
);

const SortableHeaderRowRenderer = sortableContainer(
    ({ className, columns, style }) => (
        <div className={className} role="row" style={style}>
            {React.Children.map(columns, (column, index) => (
                <SortableHeader index={index}>{column}</SortableHeader>
            ))}
        </div>
    )
);

export default class TableWithSortableRows extends Component {
    state = {
        cols: [
            { dataKey: "col1", label: "Checkbox" },
            { dataKey: "col2", label: "Agenda Item" },
            { dataKey: "col3", label: "Status" }
        ],
        rows: [
            { col1: "row1 col1", col2: "row1 col2", col3: "row1 col3" },
            { col1: "row2 col1", col2: "row2 col2", col3: "row2 col3" },
            { col1: "row3 col1", col2: "row3 col2", col3: "row3 col3" },
        ]
    }
    // onSortEnd, or when we drop a row, change state
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(
            ({ rows }) => ({
                rows: arrayMove(rows, oldIndex, newIndex)
            })
        );
    }
    //maybe this has to do with choosing what row to drag. what is index?
    getRow = ({ index }) => {
        const { rows } = this.state;
        return rows[index];
    }
    // getCol = ({ index }) => {
    //     const { cols } = this.state;
    //     return cols[index];
    // }
    renderHeaderRow = (params) => {
        return(
            <SortableHeaderRowRenderer
                {...params}
                axis="x"
                lockAxis="x"
                onSortEnd={this.onSortEnd}
            />
        );
    }
    render() {
        const { rows, cols } = this.state;
        
        return(
            <Table
                width={COL_WIDTH * rows.length}
                height={HEADER_ROW_HEIGHT + ROW_HEIGHT * rows.length} 
                headerHeight={ROW_HEIGHT}
                rowHeight={ROW_HEIGHT}
                rowCount={rows.length}
                rowGetter={this.getRow}
                headerRowRenderer={this.renderHeaderRow}
            >
                {cols.map(
                    col => <Column {...col} key={col.dataKey} width={COL_WIDTH} />
                )}
            </Table>
        )
    }
}