import React, {Component} from 'react';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {List} from 'react-virtualized';
/* 3 layers of nesting here -
a React-Sortable-HOC sortableElement component inside of 
a React Virtualized <List> component inside of 
a React-Sortable-HOC sortableContainer component, 
which is then rendered from a custom component.
The props items and value come from
the custom component's state and are passed all the way through to 
the innermost sortableElement. */
const SortableItem = sortableElement(
  ({value}) => 
  <tr>
    {value}
  </tr>
);

class VirtualList extends Component {
  renderRow = ({index}) => {
    const {items} = this.props;
    const {value} = items[index];

    return <SortableItem index={index} value={value} />;
  };
  //The height of the rows in this example are setup in ReactVirtualizedExample's state. 

  getRowHeight = ({index}) => {
    const {items} = this.props;
    return items[index].height;
  };

  render() {
    const {items, getRef} = this.props;

    return (
      <List
        ref={getRef}
        rowHeight={this.getRowHeight}
        rowRenderer={this.renderRow}
        rowCount={items.length}
        width={400}
        height={600}
      />
    );
  }
}
/*sortableContainer is a React Higher Order Component, which takes
 a component as a parameter and returns a new component. HOCs are discussed in the React docs. */
const SortableVirtualList = sortableContainer(VirtualList);
/*You can assign composite/custom components to a variable, and then mount it by wrapping
 the variable in JSX syntax. But these variables must evaluate to classes or functions. React won't accept something like QuickMaths: */
const QuickMaths = 7+7;

export default class ReactVirtualizedExample extends Component {
  state = {
    items: [
      {value: 'Item 1', height: 89},
      {value: 'Item 2', height: 59},
      {value: 'Item 3', height: 130},
      {value: 'Item 4', height: 59},
      {value: 'Item 5', height: 200},
      {value: 'Item 6', height: 150},
    ],
  };

  registerListRef = (listInstance) => {
    this.List = listInstance;
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    if (oldIndex === newIndex) {
      return;
    }

    const {items} = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });

    // We need to inform React Virtualized that the items have changed heights
    // This can either be done by imperatively calling the recomputeRowHeights and
    // forceUpdate instance methods on the `List` ref, or by passing an additional prop
    // to List that changes whenever the order changes to force it to re-render
    this.List.recomputeRowHeights();
    this.List.forceUpdate();
  };

  render() {
    const {items} = this.state;

    return (
      <>
      
      <SortableVirtualList
        getRef={this.registerListRef}
        items={items}
        onSortEnd={this.onSortEnd}
      />
      </>
    );
  }
}