import React, { useState, useEffect } from "react";
import SelectOption from "../components/SelectOption";
import docData from "../data/data.json";
import searchIcon from "../assets/icons/search.svg";
import spec from "../data/specialities.json";
import Doctors from "../components/Doctors";
import right from "../assets/icons/right-dark.svg";
import left from "../assets/icons/left-dark.svg";

const data = docData["data"];
const selectorData = spec["specialities"];

function Filter(props) {
  const [filtredData, setFiltredData] = useState([]);
  const [selectValue, setSelectValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [menu, setMenu] = useState(false);
  const [showValue, setShowValue] = React.useState("");

  const handleSelect = (showValue, slug) => {
    setSelectValue(slug);

    props.history.replace({
      pathname: `/search/speciality/${slug}`,
      search: searchValue === "" ? "" : `keyword=${searchValue}`,
    });
    setMenu((prev) => !prev);
    setShowValue(showValue);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    props.history.replace({
      pathname: selectValue ? `/search/speciality/${selectValue}` : "",
      search: value === "" ? "" : `keyword=${value}`,
    });
  };

  useEffect(() => {
    const { pathname, search } = props.location;

    if (pathname === "/search/speciality" && search) {
      setSearchValue(decodeURIComponent(search.replace("?keyword=", "")));
      setFiltredData(data.filter((one) => one.fullName.includes(searchValue)));
    } else if (pathname === "/search/speciality" && selectValue) {
      setFiltredData(data.filter((one) => one.fullName.includes(selectValue)));
    } else if (pathname === "/search/speciality" && !search) {
      setFiltredData(data);
    } else if (pathname !== "/search/speciality" && search) {
      setSearchValue(decodeURIComponent(search.replace("?keyword=", "")));
      setSelectValue(pathname.replace("/search/speciality/", ""));
      setShowValue(
        selectorData.filter(
          (one) => pathname.replace("/search/speciality/", "") === one.slug
        )[0]["name"]
      );
      setFiltredData(
        data
          .filter((one) => one.fullName.includes(searchValue))
          .filter((two) =>
            two.specialities.some((three) => [selectValue].includes(three.slug))
          )
      );
    } else if (pathname !== "/search/speciality" && !search) {
      setSelectValue(pathname.replace("/search/speciality/", ""));
      setShowValue(
        selectorData.filter(
          (one) => pathname.replace("/search/speciality/", "") === one.slug
        )[0]["name"]
      );
      setFiltredData(
        data.filter((one) =>
          one.specialities.some((two) => [selectValue].includes(two.slug))
        )
      );
    }
  }, [searchValue, selectValue, props.location]);

  const openSelector = () => {
    setMenu((prev) => !prev);
  };

  const clearSelector = () => {
    setSelectValue(null);

    props.history.replace({
      pathname: "/search/speciality",
      search: searchValue === "" ? "" : `keyword=${searchValue}`,
    });
    setShowValue("انتخاب کنید");
  };

  const closeSelector = () => {
    if (menu) {
      setMenu(false);
    }
  };

  return (
    <div className="filter" onClick={closeSelector}>
      <div className="banner">
        <div className="banner-child ">
          <div className="banner-title">مشاوره پزشکی</div>
          <div className="banner-content">
            به شکل تلفنی یا متنی با بهترین پزشکان مشاوره کنید
          </div>
        </div>
      </div>
      <div className="container">
        <div className="filter-head">
          <SelectOption
            title="قصد مشاوره در چه تخصصی  دارید ؟"
            openMenu={openSelector}
            showSelectMenu={menu}
            selectRow={handleSelect}
            showValue={showValue}
            data={selectorData}
            clear={clearSelector}
          />
          <div className="search-box">
            <div className="select-title">
              اگر پزشک را میشناسید جستجو کنید :
            </div>
            <div className="search-parent">
              <input
                className="search-input"
                placeholder="جستجوی نام پزشک"
                onChange={handleSearch}
                value={searchValue}
              />
              <img className="search-icon" src={searchIcon} alt="جستجو" />
            </div>
          </div>
        </div>
        <div className="filter-body">
          <div className="filter-body-title">
            {showValue && filtredData.length > 0
              ? `مشاوره تخصصی با متخصص ${showValue}`
              : "مشاوره با بهترین متخصصین"}
          </div>

          {filtredData.map((filter) => {
            const {
              _id,
              avatar,
              city,
              fullName,
              specialities,
              services,
              medicalCode,
            } = filter;
            return (
              <Doctors
                key={_id}
                avatar={avatar}
                city={city.name}
                fullName={fullName}
                specialities={specialities}
                services={services}
                medicalCode={medicalCode}
              />
            );
          })}
          {filtredData.length === 0 && (
            <div className="no-result">نتیجه ای یافت نشد :(</div>
          )}
        </div>
        <div className="pagination">
          <img className="page-icon" src={right} alt="arrow" />
          <div className="page-number">1</div>
          <div className="page-number">...</div>
          <div className="page-number">3</div>
          <div className="page-number page-number-active">4</div>
          <div className="page-number">5</div>
          <div className="page-number">...</div>
          <div className="page-number">200</div>
          <img className="page-icon" src={left} alt="arrow" />
        </div>
      </div>
    </div>
  );
}

export default Filter;
