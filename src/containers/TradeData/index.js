import React from 'react';

import { connect } from 'react-redux';

import compose from 'recompose/compose';
import pure from 'recompose/pure';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import withFetch from '../../hocs/withFetch';

import { fetchTradeData, setPeriod, setSymbol, setView } from '../../redux/modules/trade-data';

import BarPeriodSelect from '../../components/BarPeriodSelect';
import SymbolSelect from '../../components/SymbolSelect';
import ViewSelect from '../../components/ViewSelect';
import TradeDataChart from '../../components/TradeDataChart';

const TradeDataContainer = ({ data, onSetPeriod, onSetSymbol, onSetView, view }) =>
    <Grid divided='vertically'>
        <Grid.Row columns={3}>
            <Grid.Column>
                <BarPeriodSelect onSelect={onSetPeriod} />
            </Grid.Column>
            <Grid.Column>
                <SymbolSelect onSelect={onSetSymbol} />
            </Grid.Column>
            <Grid.Column>
                <ViewSelect onSelect={onSetView} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <TradeDataChart data={data} view={view}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>

const selectData = state => ({
    period: state.tradeData.period,
    symbol: state.tradeData.symbol,
    view: state.tradeData.view,
    data: state.tradeData.data,
});

const mapActions = { 
    onFetchTradeData: fetchTradeData,
    onSetPeriod: setPeriod,
    onSetSymbol: setSymbol,
    onSetView: setView,
};

const connected = connect(selectData, mapActions);

const fetchable = withFetch(fetchTradeData, {
    fetchProps: ['period', 'symbol'],
    restrictIfNoParams: false,
    onlyOnMount: false,
});

export default compose(pure, connected, fetchable)(TradeDataContainer);