import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";

const ToptoBottom = ({
  lastTenApiData,
  editValue,
  deleteStart,
  formatDate,
  moveToSingleData,
  arrow,
  arrowFunction,
  toGetDateAndTime,
  getUsers,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = lastTenApiData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(lastTenApiData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function previousPage() {
    console.log("previous Page---");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    console.log("nextPage---");
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCpage(id) {
    console.log(currentPage, "currentPage");
    setCurrentPage(id);
  }
  console.log(numbers, "Number");
  return (
    <div className="maindis">
      <div className="page-nation">
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={previousPage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li className="page-icon" key={i}>
              <a
                href="#"
                className={`page-item ${currentPage === n ? "active" : ""}`}
                onClick={() => changeCpage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </div>
      <table className="content-table">
        <thead>
          <tr className="content-heading">
            <th className="heading-child heading-child1">Email</th>
            <th className="heading-child heading-child1">First Name</th>
            <th className="heading-child heading-child1">Last Name</th>
            <th className="heading-child heading-child1">DOB</th>
            <th className="heading-child heading-child1">Phone</th>
            <th className="heading-child heading-child1">
              <div className="uploded-time">
                <p>Last Updated Time</p>
                <button className="arrow-button" onClick={arrowFunction}>
                  {arrow ? (
                    <BsFillArrowDownSquareFill className="arrow-img" />
                  ) : (
                    <BsFillArrowUpSquareFill className="arrow-img" />
                  )}
                </button>
              </div>
            </th>
            <th className="heading-child heading-child1">Action</th>
          </tr>
        </thead>
        <tbody>
          {records?.length > 0 ? (
            [...records].map((single, i) => (
              <tr className="content-heading" key={i}>
                <td className="heading-child">{single.email}</td>
                <td className="heading-child">{single.fn}</td>
                <td className="heading-child">{single.ln}</td>
                <td className="heading-child">{formatDate(single.dob)}</td>
                <td className="heading-child">{single.phone}</td>
                <td className="heading-child">
                  {toGetDateAndTime(single.currDate).istDate}
                  <span className="time">
                    {toGetDateAndTime(single.currDate).istTime.slice(0, -3)}
                  </span>
                </td>
                <td className="heading-child-last">
                  <button className="hcl-child-2">
                    <BiShowAlt
                      className="edit-img"
                      onClick={() => moveToSingleData(single)}
                    />
                  </button>
                  <button className="hcl-child-2">
                    <GrEdit
                      className="edit-img"
                      onClick={() => editValue(single)}
                    />
                  </button>
                  <button className="hcl-child-3">
                    <RiDeleteBin2Fill
                      className="delete-img"
                      onClick={() => deleteStart(single.id)}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <table className="content-table">
        <thead>
          <tr className="content-heading">
            <th className="heading-child heading-child1">Email</th>
            <th className="heading-child heading-child1">First Name</th>
            <th className="heading-child heading-child1">Last Name</th>
            <th className="heading-child heading-child1">DOB</th>
            <th className="heading-child heading-child1">Phone</th>
            <th className="heading-child heading-child1">
              <div className="uploded-time">
                <p>Last Updated Time</p>
                <button className="arrow-button" onClick={arrowFunction}>
                  {arrow ? (
                    <BsFillArrowDownSquareFill className="arrow-img" />
                  ) : (
                    <BsFillArrowUpSquareFill className="arrow-img" />
                  )}
                </button>
              </div>
            </th>
            <th className="heading-child heading-child1">Action</th>
          </tr>
        </thead>
        <tbody>
          {lastTenApiData?.length > 0 ? (
            [...lastTenApiData].reverse().map((single, i) => (
              <tr className="content-heading" key={i}>
                <td className="heading-child">{single.email}</td>
                <td className="heading-child">{single.fn}</td>
                <td className="heading-child">{single.ln}</td>
                <td className="heading-child">{formatDate(single.dob)}</td>
                <td className="heading-child">{single.phone}</td>
                <td className="heading-child">
                  {toGetDateAndTime(single.currDate).istDate}
                  <span className="time">
                    {toGetDateAndTime(single.currDate).istTime.slice(0, -3)}
                  </span>
                </td>
                <td className="heading-child-last">
                  <button className="hcl-child-2">
                    <BiShowAlt
                      className="edit-img"
                      onClick={() => moveToSingleData(single)}
                    />
                  </button>
                  <button className="hcl-child-2">
                    <GrEdit
                      className="edit-img"
                      onClick={() => editValue(single)}
                    />
                  </button>
                  <button className="hcl-child-3">
                    <RiDeleteBin2Fill
                      className="delete-img"
                      onClick={() => deleteStart(single.id)}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available.</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default ToptoBottom;
