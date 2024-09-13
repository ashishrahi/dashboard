import React from 'react';
import Breadcrumb from './Navigation/Breadcrumbs/Breadcrumb';
import ChartOne from './dataDisplay/Charts/ChartOne';
import ChartThree from './dataDisplay/Charts/ChartThree';
import ChartTwo from './dataDisplay/Charts/ChartTwo';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
