import React from "react";

function Tag({ title, icon }) {
  return (
    <div className="tag">
      <img src={icon} className="tag-icon" alt="tag" />
      <span className="tag-name">{title}</span>
    </div>
  );
}
export default Tag;
