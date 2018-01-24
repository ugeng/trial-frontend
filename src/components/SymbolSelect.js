import React, { PureComponent } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import Sym from '../constants/symbol';

const items = [
  { key: Sym.USD, name: Sym.USD },
  { key: Sym.EUR, name: Sym.EUR },
  { key: Sym.RUB, name: Sym.RUB },
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

