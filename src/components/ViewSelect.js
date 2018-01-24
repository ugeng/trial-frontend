import React, { PureComponent } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import View from '../constants/view';

const items = [
  { key: View.LOW_HIGH, name: View.LOW_HIGH },
  { key: View.OPEN_CLOSE, name: View.OPEN_CLOSE },
]

export default class extends PureComponent {
  onItemClick = (e, { index }) => {
    const { onSelect } = this.props;

    return onSelect && items[index] && onSelect(items[index].key);
  }

  render() {
    return <Menu compact size="mini" items={items} onItemClick={this.onItemClick} />
  }
};

