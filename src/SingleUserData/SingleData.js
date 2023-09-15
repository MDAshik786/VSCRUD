import React, { useState } from "react";
import MainLayout from "../Layout__/MainLayout.js";
import "./SingleData.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../Constrains/URL.js";

const SingleData = () => {
  const location = useLocation();
  const nevigate = useNavigate();
  let singleData = location.state;
  const single = singleData;
  const loginId = location.state.loginId;

  const [deletBollean, setdeletBollean] = useState(false);
  
  function CancelConfirm() {
    loginId
      ? nevigate("/display", { state: { loginId: loginId } })
      : nevigate("/", { state: { loginId: loginId } });
  }
  function editConfirm() {
    nevigate("/additem", { state: { singleData, loginId } });
  }
  function deleteValue() {
    setdeletBollean(true);
  }
  function resetHomePage() {
    setdeletBollean(false);
  }
  const deleteConfirmation = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    loginId
      ? nevigate("/display", { state: { loginId: loginId } })
      : nevigate("/", { state: { loginId: loginId } });
  };
  function toGetDate(createdDate) {
    const dateObject = new Date(createdDate);
    return dateObject.toLocaleDateString();
  }
    function toGetTime(createdDate) {
      const dateObject = new Date(createdDate);
      return dateObject.toLocaleTimeString();
    
  }
  return (
    <div className="div">
      <div className="main-div">
        <MainLayout>
          {deletBollean ? (
            <div className="delete-container1">
              <p className="contents">
                Are you sure you want to confirm the deletion of {singleData.fn}
                's details
              </p>
              <div className="buttons">
                <button
                  type="reset"
                  onClick={() => resetHomePage()}
                  className="submite-button2"
                >
                  Cancel
                </button>
                <button
                  type="reset"
                  onClick={() => deleteConfirmation(singleData?.singleData?.id)}
                  className="submite-button1"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="main-container">
              <div className="sub-container">
                <p className="heading">
                  <span className="inner-name">
                    {singleData?.singleData?.fn} {singleData?.singleData?.ln}
                  </span>
                  's Details
                </p>
                <div className="container">
                  <p className="head1">User Id:</p>
                  <p className="content1">{singleData?.singleData?.id}</p>
                </div>
                <div className="container">
                  <p className="head1">Email:</p>
                  <p className="content1">{singleData?.singleData?.email}</p>
                </div>
                <div className="container">
                  <p className="head1">Password:</p>
                  <p className="content1">{singleData?.singleData?.password}</p>
                </div>
                <div className="container">
                  <p className="head1">First Name:</p>
                  <p className="content1">{singleData?.singleData?.fn}</p>
                </div>
                <div className="container">
                  <p className="head1">Last Name:</p>
                  <p className="content1">{singleData?.singleData?.ln}</p>
                </div>
                <div className="container">
                  <p className="head1">Phone Number:</p>
                  <p className="content1">{singleData?.singleData?.id}</p>
                </div>
                <div className="container">
                  <p className="head1">Address:</p>
                  <p className="content1">{singleData?.singleData?.address}</p>
                </div>
                <div className="container">
                  <p className="head1">Created Date & Time:</p>
                  <p className="content1">
                    {toGetDate(singleData?.singleData?.createdDate)}
                    <span className="con">
                      {toGetTime(singleData?.singleData?.createdDate)}
                    </span>
                  </p>
                </div>
                <div className="container">
                  <p className="head1">Created Date & Time:</p>
                  <p className="content1">
                    {toGetDate(singleData?.singleData?.currDate)}
                    <span className="con">
                      {toGetTime(singleData?.singleData?.currDate)}
                    </span>
                  </p>
                </div>

                <div className="buttons">
                  <button
                    type="reset"
                    onClick={() => CancelConfirm()}
                    className="submite-button2"
                  >
                    Cancel
                  </button>
                  <button
                    type="reset"
                    onClick={() => editConfirm()}
                    className="submite-button3"
                  >
                    Edit
                  </button>
                  <button
                    type="reset"
                    onClick={() => deleteValue()}
                    className="submite-button1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </MainLayout>
      </div>
    </div>
  );
};

export default SingleData;
