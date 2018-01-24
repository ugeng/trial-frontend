import React, { PureComponent } from 'react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import BarPeriod, { BarPeriodName } from '../constants/bar-period';

const items = [
  { key: BarPeriod.Month, name: BarPeriodName.Month },
  { key: BarPeriod.Week, name: BarPeriodName.Week },
  { key: BarPeriod.Day, name: BarPeriodName.Day },
]

export default class extends PureComponent {
  onItemClick = (e, { index }) => {
    const { onSelect } = this.props;

    return onSelect && items[index] && onSelect(items[index].key);
  }

  render() {
    return <Menu compact defaultActiveIndex={0} size="mini" items={items} onItemClick={this.onItemClick} />
  }
};

