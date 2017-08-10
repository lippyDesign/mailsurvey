// Survey field contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => <div>
  <label>{label}</label>
  <input { ...input } style={{marginBottom: 5}} />
  <div className="red-text" style={{marginBottom: 20}}>{touched && error}</div>
</div>;