import React from 'react'
import VirtualizedCheckbox from 'react-virtualized-checkbox'

function ReactVirtualizedCheckbox() {
  const [state, setState] = React.useState({});
  const items= [
    { label: "One", value: 1, checked: true},
    { label: "Two", value: 2, checked: true},
    { label: "Three", value: 3, checked: true}
    // And so on...
  ];
  return(
    <VirtualizedCheckbox
      items={items}
      onOk={checkedItems => setState({checkedItems})}
      onCancel={() => setState({checkedItems: []})}
    />
  );
}

// class ReactVirtualizedCheckbox extends React.Component {
//   constructor (props) {
//     super(props)

//     this.state = {}
//   }

//   render () {
//     const items = [
//       { label: "One", value: 1, checked: true},
//       { label: "Two", value: 2, checked: true},
//       { label: "Three", value: 3, checked: true}
//       // And so on...
//     ]

//     return (
//       <VirtualizedCheckbox
//         items={items}
//         onOk={(checkedItems) => this.setState({ checkedItems })}
//         onCancel={ () => this.setState({ checkedItems: [] })}
//       />
//     )
//   }
// }

export default ReactVirtualizedCheckbox;