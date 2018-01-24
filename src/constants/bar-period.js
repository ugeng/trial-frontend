export const BarPeriodName = {
    Month: 'Месяц',
    Week: 'Неделя',
    Day: 'День',
};

const BarPeriod = {
    Month: 'TIME_SERIES_MONTHLY_ADJUSTED',
    Week: 'TIME_SERIES_WEEKLY_ADJUSTED',
    Day: 'TIME_SERIES_DAILY_ADJUSTED',
};


export const BarPeriodResponseFieldName = {
    [BarPeriod.Month]: 'Monthly Adjusted Time Series',
    [BarPeriod.Week]: 'Weekly Adjusted Time Series',
    [BarPeriod.Day]: 'Time Series (Daily)',
}

export default BarPeriod;
