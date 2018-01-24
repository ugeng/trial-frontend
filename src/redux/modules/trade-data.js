
import View from '../../constants/view';

export const TRADE_DATA_FETCHED = 'TRADE_DATA_FETCHED';
export const TRADE_DATA_FETCH_FAILED = 'TRADE_DATA_FETCH_FAILED';
export const TRADE_DATA_PERIOD_SET = 'TRADE_DATA_PERIOD_SET';
export const TRADE_DATA_SYMBOL_SET = 'TRADE_DATA_SYMBOL_SET';
export const TRADE_DATA_VIEW_SET = 'TRADE_DATA_VIEW_SET';

export const fetchTradeData = ({ period, symbol }) =>
    (dispatch, getState, api) =>
        api.tradeData.fetch({ period, symbol })
        .then((res) => {
            return dispatch(tradeDataFetched(res));
        })
        .catch((error) => {
            return dispatch(tradeDataFetchFailed(error));
        })

const tradeDataFetched = (payload) => ({
    type: TRADE_DATA_FETCHED, payload
});

const tradeDataFetchFailed = (error) => ({
    type: TRADE_DATA_FETCH_FAILED, error
});

export const setPeriod = (period) => ({
    type: TRADE_DATA_PERIOD_SET, payload: period
});

export const setSymbol = (symbol) => ({
    type: TRADE_DATA_SYMBOL_SET, payload: symbol
});

export const setView = (view) => ({
    type: TRADE_DATA_VIEW_SET, payload: view
});

const handleFetchedData = (state, data) =>
    ({ ...state, data, error: undefined });

const handleDataFetchFailed = (state, error) =>
    ({ ...state, error });

const handleDataPeriodSet = (state, period) =>
    ({ ...state, period });

const handleDataSymbolSet = (state, symbol) =>
    ({ ...state, symbol });

const handleDataViewSet = (state, view) =>
    ({ ...state, view });

const handlers = {
    [TRADE_DATA_FETCHED]: handleFetchedData,
    [TRADE_DATA_FETCH_FAILED]: handleDataFetchFailed,
    [TRADE_DATA_PERIOD_SET]: handleDataPeriodSet,
    [TRADE_DATA_SYMBOL_SET]: handleDataSymbolSet,
    [TRADE_DATA_VIEW_SET]: handleDataViewSet,
};

const initialState = { 
    view: View.LOW_HIGH
};

export default (state = initialState, action) => {
    const handler = handlers && handlers[action.type];
    return handler ? handler(state, action && action.payload) : state;
};
