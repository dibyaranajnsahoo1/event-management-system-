import React, { useRef } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const CalendarIcon = () => (
  <svg width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default function DateInput({ value, onChange }) {
  const ref = useRef(null);

  const formatPretty = (d) => (d ? dayjs(d).format("MMMM Do, YYYY") : "");

  return (
    <div className="date-input-wrapper" onClick={() => ref.current.showPicker()}>
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={onChange}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          cursor: "pointer",
        }}
      />

      <div className="date-input-box">
        <span className="date-input-icon">
          <CalendarIcon />
        </span>

        {value ? (
          <span className="date-input-text">{formatPretty(value)}</span>
        ) : (
          <span className="date-input-placeholder">Pick a date</span>
        )}
      </div>

      <style>
        {`
          .date-input-wrapper {
            position: relative;
            width: 100%;
          }

          .date-input-box {
            height: 40px;
            padding-left: 36px;
            display: flex;
            align-items: center;
            cursor: pointer;
            background: #fff;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            transition: 0.2s;
            color: #111;
          }

          .date-input-wrapper:hover .date-input-box {
            background: var(--purple);
            color: #fff;
            border-color: var(--purple);
          }

          .date-input-wrapper:hover .date-input-placeholder {
            color: #fff;
          }

          .date-input-wrapper:hover .date-input-icon svg {
            stroke: #fff;
          }

          .date-input-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: #6b7280;
          }

          .date-input-placeholder {
            color: #9ca3af;
          }

          .date-input-text {
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
}
