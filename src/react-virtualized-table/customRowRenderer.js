/** @flow */
import * as React from 'react';
import VirtualizedCheckbox from 'react-virtualized-checkbox'

/**
 * Default row renderer for Table.
 */
type RowRendererParams = {
  className: string,
  columns: Array<any>,
  index: number,
  isScrolling: boolean,
  onRowClick: ?Function,
  onRowDoubleClick: ?Function,
  onRowMouseOver: ?Function,
  onRowMouseOut: ?Function,
  rowData: any,
  style: any,
  key: string,
  props: any
};

export default function customTableRowRenderer({
  className,
  columns,
  index,
  key,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOut,
  onRowMouseOver,
  onRowRightClick,
  rowData,
  style,
  props,
}: RowRendererParams) {
  const a11yProps = {'aria-rowindex': index + 1};

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = event => onRowClick({event, index, rowData});
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = event =>
        onRowDoubleClick({event, index, rowData});
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = event => onRowMouseOut({event, index, rowData});
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = event => onRowMouseOver({event, index, rowData});
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = event =>
        onRowRightClick({event, index, rowData});
    }
  }


  
  return (
    <div
      {...a11yProps}
      className={className}
      key={key}
      role="row"
      style={style}>
        <VirtualizedCheckbox 
          items={columns} 
          hasFilterBox={false}
          hasOkButton={false}
          hasCancelButton={false}
          {...props}
        />
    </div>
  );
}
