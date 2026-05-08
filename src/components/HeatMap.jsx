import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import '../index.css';
import { subYears, format } from 'date-fns';

const SubmissionHeatmap = ({ data }) => {
  const today = new Date();
  const lastYear = subYears(today, 1);

  return (
    <div className="text-shadow-amber-50 p-6 rounded-xl border border-gray-800">
     <CalendarHeatmap
      startDate={new Date('2025-01-01')}
      endDate={new Date()}
      values={data} 
      classForValue={(value) => {
        if (!value || value.count === 0) return 'color-empty';
        return `color-scale-${Math.min(value.count, 4)}`; 
      }}
    />
    </div>
  );
};


export default SubmissionHeatmap;