import React from "react";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="loader"></div>

      <style>{`
        .loader {
          width: 30px;
          height: 30px;
          border: 4px solid #ddd;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
