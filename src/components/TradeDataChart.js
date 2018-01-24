import React from 'react';

import values from 'lodash/values';
import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';

import pure from 'recompose/pure';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';

import { LineChart, XAxis, YAxis, Legend, CartesianGrid, Line, Tooltip } from 'recharts';

import View from '../constants/view';

const margin = { top: 5, right: 20, left: 10, bottom: 5 };

const TradeDataChart = ({ data, dataKey1, dataKey2 }) =>
    <LineChart width={640} height={400} data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={false} connectNulls={true} type="monotone" dataKey={dataKey1} stroke="#8884d8" />
        <Line dot={false} connectNulls={true} type="monotone" dataKey={dataKey2} stroke="#82ca9d" />
    </LineChart>

const mapProps = (ownProps) => {
    const data = values(mapValues(ownProps.data, (i, date) => 
        ({ 
            ...i,
            date,
            open: parseFloat(i['1. open']),
            close: parseFloat(i['4. close']),
            low: parseFloat(i['3. low']),
            high: parseFloat(i['2. high']),
        })));
    return { 
        data: sortBy(data, 'date'),
        dataKey1: ownProps.view === View.LOW_HIGH ? 'low' : 'open',
        dataKey2: ownProps.view === View.LOW_HIGH ? 'high' : 'close',
    };
};

export default compose(pure, withProps(mapProps))(TradeDataChart);
