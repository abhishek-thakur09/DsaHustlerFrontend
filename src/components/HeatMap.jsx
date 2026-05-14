import React from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import '../index.css';
import 'react-calendar-heatmap/dist/styles.css'; 
import { subYears } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const SubmissionHeatmap = ({ data }) => {
  const today = new Date();
  const lastYear = subYears(today, 1);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="text-white mb-4">Submission Activity</h3>
      
      <CalendarHeatmap
        startDate={lastYear}
        endDate={today}
        values={data} 
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          return `color-scale-${Math.min(value.count, 4)}`; 
        }}
        tooltipDataAttrs={(value) => {
          // Check if data exists in green block or not?
          const count = value?.count || 0;
          const date = value?.date;

          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': date 
              ? `${date}: ${count} problems solved` 
              : 'No submissions recorded',
          };
        }}
      />

      <Tooltip 
        id="heatmap-tooltip" 
        place="top"
        style={{ 
          backgroundColor: "#1e293b", 
          color: "#fff", 
          borderRadius: "8px",
          fontSize: "12px",
          zIndex: 100 
        }}
      />
    </div>
  );
};

export default SubmissionHeatmap;