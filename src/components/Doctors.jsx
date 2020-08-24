import React from "react";

import left from "./../assets/icons/arrow-left.svg";
import Tag from "./Tag";
import { serviceText, servicesIcon } from "../utils/constant";

//icons
import telephone from "../assets/icons/telephone.svg";
import comment from "../assets/icons/comment.svg";
import check from "../assets/icons/check.svg";
import user from "../assets/icons/user.svg";

function Doctors({
  avatar,
  city,
  fullName,
  specialities,
  services,
  medicalCode,
}) {
  const convertToIcon = (icon) => {
    switch (icon) {
      case "telephone":
        return telephone;
      case "comment":
        return comment;
      default:
        break;
    }
  };
  return (
    <div className="doctors">
      <div className="doctors-first">
        <div className="avatar-box">
          {avatar ? (
            <img className="avatar-img" src={avatar} alt="آواتار" />
          ) : (
            <img className="avatar-icon" src={user} alt="آواتار" />
          )}
          <span className="doctor-city-desktop">{city}</span>
        </div>
        <div className="doctor-info">
          <div className="doctor-name">{fullName}</div>
          <div className="doctor-desc">
            {specialities.map((spec, index) => {
              return (
                <div key={index} className="doctor-desc-text">
                  {spec.name}
                </div>
              );
            })}
          </div>
          <div className="doctor-city-mobile">{city}</div>
        </div>
      </div>
      <div className="seprator-first"></div>
      <div className="doctors-left">
        <div className="doctors-second">
          <div className="doctors-second-child">
            <div className="doctors-types">
              {services.map((service, index) => {
                return (
                  <Tag
                    key={index}
                    title={serviceText[service]}
                    icon={convertToIcon(servicesIcon[service])}
                  />
                );
              })}
            </div>
            <div className="doctors-code">
              <div className="doctors-code-title">
                <img className="doctor-code-icon" src={check} alt="left" />
                کد نطام پزشکی
              </div>
              <div className="doctors-code-value">{medicalCode}</div>
            </div>
          </div>
        </div>
        <div className="seprator-second"></div>

        <div className="doctors-third">
          <div className="go-to-doctor">
            <span className="go-to-doctor-text">مشاوره با پزشک</span>
            <img className="go-to-doctor-icon" src={left} alt="فلش" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Doctors;
