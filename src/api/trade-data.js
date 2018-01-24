import Axios from 'axios';

import defaults from 'lodash/defaults';

import BarPeriod, { BarPeriodResponseFieldName } from '../constants/bar-period';
import Sym from '../constants/symbol';

const apikey = 'TMAUZTQFBNUWA6GC';

const axios = Axios.create({
  baseURL: `https://www.alphavantage.co/query`,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});

const defaultFetchParams = { period: BarPeriod.Month, symbol: Sym.EUR };

const resolveDataField = period => res => {
  return res && res.data && res.data[BarPeriodResponseFieldName[period]];
};

export const fetch = (p) => {
  const { period, symbol } = defaults(p, defaultFetchParams); 
  return axios.get(`?function=${period}&symbol=${symbol}&apikey=${apikey}`)
  .then(resolveDataField(period));
};


