import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pick, isEqual, isEmpty, compact, values, mapValues, defaults } from 'lodash';

import { connect } from 'react-redux';

const getEncodedQuery = query => (query && mapValues(query, encodeURIComponent)) || { };

const defaultConfig = {
  fetchProps: [],
  restrictIfNoParams: true,
  onlyOnMount: true,
  waitForFetchOver: true
};

export default (fetch, c) => (Target, Spinner) => {
  const config = defaults(c, defaultConfig);
  class Wrapper extends Component {
    state = { isReady: false };

    componentWillMount() {
      const { onFetch, params, location, ...props } = this.props;

      const additionalParams = pick(props, config.fetchProps);

      const encodedQuery = getEncodedQuery(location && location.query);

      const mixedFetchParams = {
        ...params, ...encodedQuery, ...additionalParams
      };

      if (config.restrictIfNoParams) {
        if (isEmpty(mixedFetchParams)) return;
        if (isEmpty(compact(values(mixedFetchParams)))) return;
      }

      if (!config.waitForFetchOver) return onFetch(mixedFetchParams);

      onFetch(mixedFetchParams)
      .then(() => this.setState({ isReady: true }))
      .catch(() => this.setState({ isReady: true }));
    }

    componentWillReceiveProps(nextProps) { // eslint-disable-line
      if (config.onlyOnMount) return;

      const { onFetch, params, location } = this.props;
      const { query } = location || {};
      const { params: nextParams } = nextProps;
      const { query: nextQuery } = nextProps.location || {};

      const additionalParams = pick(this.props, config.fetchProps);
      const nextAdditionalParams = pick(nextProps, config.fetchProps);

      const isParamsEquals = isEqual(nextParams, params);
      const isQueryEquals = isEqual(nextQuery, query);
      const isAddtionalParamsEquals = isEqual(nextAdditionalParams, additionalParams);

      if (isParamsEquals && isQueryEquals && isAddtionalParamsEquals) {
        return;
      }

      const mixedFetchParams = { ...nextParams, ...nextQuery, ...nextAdditionalParams };

      if (config.restrictIfNoParams) {
        if (isEmpty(mixedFetchParams)) return;
        if (isEmpty(compact(values(mixedFetchParams)))) return;
      }

      if (config.restrictIfNoParams) {
        if (isEmpty(mixedFetchParams)) return;
        if (isEmpty(compact(values(mixedFetchParams)))) return;
      }

      onFetch(mixedFetchParams);
    }

    render() {
      const { isReady } = this.state;
      if (config.waitForFetchOver && !isReady) {
        return Spinner ? <Spinner /> : <div>Please, wait...</div>;
      }
      return <Target {...this.props} />;
    }
  }

  Wrapper.propTypes = {
    location: PropTypes.object,
    onFetch: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  const connected = connect(
    () => ({}), { onFetch: fetch }
  );

  return connected(Wrapper);
};