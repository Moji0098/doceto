import React from "react";
import arrow from "../assets/icons/arrow-down.svg";
import close from "../assets/icons/close.svg";

function SelectOption({
  showSelectMenu,
  openMenu,
  selectRow,
  showValue,
  data,
  title,
  clear,
}) {
  return (
    <div className="select">
      <div className="select-title">{title}</div>
      <div className="select-head-text" onClick={openMenu}>
        {showValue ? (
          <div className="select-show-value ">{showValue}</div>
        ) : (
          <div className="select-default-text">انتخاب کنید</div>
        )}

        {showSelectMenu ? (
          <div className="icon-box">
            <img className="icon" src={close} alt="فلش" onClick={clear} />
          </div>
        ) : (
          <div className="icon-box">
            <img className="icon" src={arrow} alt="فلش" />
          </div>
        )}
      </div>
      {showSelectMenu ? (
        <div className="select-drop">
          {data
            .filter((items) => items.type === 0)
            .map((rows) => {
              return (
                <div key={rows.id}>
                  <p
                    className="select-parent hover"
                    onClick={() => selectRow(rows.name, rows.slug)}
                  >
                    {rows.name}
                  </p>
                  {data
                    .filter(
                      (item) => item.parent_id === rows.id && item.type === 1
                    )
                    .map((item) => {
                      return (
                        <div
                          className="select-child hover"
                          key={item.id}
                          onClick={() => selectRow(item.name, item.slug)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default SelectOption;
