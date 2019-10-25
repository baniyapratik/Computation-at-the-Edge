import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <span>{label}</span>
      <input {...input} />
      <div className="red-text">{touched && error}</div>
    </div>
  );
};
