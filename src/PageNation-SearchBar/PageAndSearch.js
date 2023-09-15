import React, { useState } from "react";
import "./PageAndSearch.css";
import DataTable from "../MainDisplayPage/DataTable";
import { returnPageNationRange } from "../utils__/PageNation_Utils";

const PageAndSearch = ({
  arrow,
  search,
  setSearch,
  lastTenApiData,
  editValue,
  deleteStart,
  formatDate,
  moveToSingleData,
  arrowFunction,
  toGetDateAndTime,
}) => {
  const [pageNation, setPageNation] = useState({
    pageNo: 2,
    pageLimit: 10,
  });

  const getUsers = function (pageNo, pageLimit) {
    let arrays = [];
    for (
      let i = (pageNo - 1) * pageLimit;
      i < pageNo * pageLimit && lastTenApiData[i];
      i++
    ) {
      arrays.push(lastTenApiData[i]);
    }
    return arrays;
  };
  const apiData = getUsers(pageNation.pageNo, pageNation.pageLimit);
  const getLength = function () {
    return lastTenApiData.length;
  };
  const totalPage = Math.ceil(getLength() / pageNation.pageLimit);
  if (pageNation.pageNo > totalPage) {
    setPageNation((pagenation) => ({
      ...pagenation,
      pageNo: totalPage,
    }));
  }
  const numbers = returnPageNationRange(
    totalPage,
    pageNation.pageNo,
    pageNation.pageLimit,
    1
  );
  function setValueSearch(e) {
    setSearch(e.target.value);
  }
  function handelePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      setPageNation((pagenation) => ({
        ...pagenation,
        pageNo: 1,
      }));
    } else if (value === "&lsaquo;") {
      if (pageNation.pageNo !== 1) {
        setPageNation((pageNation) => ({
          ...pageNation,
          pageNo: pageNation.pageNo - 1,
        }));
      }
    } else if (value === "&rsaquo;") {
      if (pageNation.pageNo !== totalPage) {
        setPageNation((pageNation) => ({
          ...pageNation,
          pageNo: pageNation.pageNo + 1,
        }));
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPageNation((pageNation) => ({
        ...pageNation,
        pageNo: totalPage,
      }));
    } else {
      setPageNation((pageNation) => ({
        ...pageNation,
        pageNo: value,
      }));
    }
  }
  return (
    <div className="main-sb">
      <div className="search-bar">
        <div className="page-nation">
          <div className="pagenation">
            <button
              className="page-item"
              onClick={() => handelePageChange("&laquo;")}
            >
              &laquo;
            </button>
            <button
              className="page-item"
              onClick={() => handelePageChange("&lsaquo;")}
            >
              &lsaquo;
            </button>
            {numbers.map((value) => {
              if (value === pageNation.pageNo) {
                return (
                  <button
                    className="page-item active"
                    key={value}
                    onClick={() => handelePageChange(value)}
                  >
                    {value}
                  </button>
                );
              } else {
                return (
                  <button
                    className="page-item"
                    key={value}
                    onClick={() => handelePageChange(value)}
                  >
                    {value}
                  </button>
                );
              }
            })}
            <button
              className="page-item"
              onClick={() => handelePageChange("&rsaquo;")}
            >
              &rsaquo;
            </button>
            <button
              className="page-item"
              onClick={() => handelePageChange("&raquo;")}
            >
              &raquo;
            </button>
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input"
            value={search}
            onChange={setValueSearch}
            autoFocus
            placeholder="Search Here"
          />
          <div className="search-icon">
            <img
              src="/images/search-xxl.png"
              alt=""
              className="saerch-icon-img"
              height={2}
              width={2}
            />
          </div>
        </div>
      </div>

      <DataTable
        lastTenApiData={arrow ? apiData : apiData.reverse()}
        editValue={editValue}
        deleteStart={deleteStart}
        moveToSingleData={moveToSingleData}
        arrow={arrow}
        formatDate={formatDate}
        arrowFunction={arrowFunction}
        toGetDateAndTime={toGetDateAndTime}
      />
    </div>
  );
};

export default PageAndSearch;
