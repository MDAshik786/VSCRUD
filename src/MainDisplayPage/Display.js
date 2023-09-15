import React, { useEffect, useState } from "react";
import "./Display.css";
import axios from "axios";
import { apiUrl } from "../Constrains/URL";
import { useLocation, useNavigate } from "react-router-dom";
import ToptoBottom from "./ToptoBottom";
import PageAndSearch from "../PageNation-SearchBar/PageAndSearch";
import BottomtoTop from "./DataTable";

const Display = () => {

  const [apiData, setapiData] = useState("");
  const [search, setSearch] = useState("");
  const [Deleteid, setDeleteid] = useState("");
  const [arrow, setarrow] = useState(true);
  const [deleteConfirm , setDeleteConfirm] = useState(false);
 
  const location = useLocation();
  const loginId = location?.state?.loginId
  const callApiDataa = async () => {
    const data = await axios.get(apiUrl);
    setapiData(data.data);
  };
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      callApiDataa();
    }, 1000);

    return () => {
      clearTimeout(myTimeout);
    };
  }, []);

  function CancelConform() {
    setDeleteConfirm(false)
  }

  function deleteStart(id) {
    setDeleteid(id);
    setDeleteConfirm(true)
  }


  const deleteValue = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    callApiDataa();
    setDeleteConfirm(false)
  };
  const nevigate = useNavigate();

  const editValue = async (single) => {
    nevigate("/additem", { state: { single,loginId:loginId } });
  };

  function arrowFunction() {
    setarrow(!arrow);
  }

  if (!apiData) {
    return (
      <p className="gif">
        <img src="/images/Ellipsis-2.1s-131px.svg" alt="" className="img-gif" />
      </p>
    );
  }

  const newApi = apiData.filter((data) => {
    return (
      data.fn.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.ln.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.address.toLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  const lastTenApiData = newApi.slice(-10);

  function formatDate(inputDate) {
    const parts = inputDate?.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const date = new Date(year, month, day);

    const formattedDay = date.getDate().toString().padStart(2, "0");
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedYear = date.getFullYear();

    const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;

    return formattedDate;
  }

  function moveToSingleData(single) {
    nevigate("/single", { state: {singleData:single,loginId:loginId} });
  }

  function toGetDateAndTime(currentDate) {
    const timestamp = new Date(currentDate);
    
    const istDate = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'short',
    }).format(timestamp);
    
    const istTime = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      timeStyle: 'long',
    }).format(timestamp);
    
    return { istDate, istTime };
  }
  return (
    <main className="main-con">
      <PageAndSearch
        arrow={arrow}
        arrowFunction={arrowFunction}
        search={search}
        setSearch={setSearch}
        lastTenApiData={lastTenApiData}
        editValue={editValue}
        deleteStart={deleteStart}
        moveToSingleData={moveToSingleData}
        formatDate={formatDate}
        toGetDateAndTime = {toGetDateAndTime}
      />
      <div className="maindis-1">

       {deleteConfirm ? (<div className="delete-parent">
          <div className="delete-container">
            <p className="content">
              Are you sure you want to confirm the deletion of details
            </p>
            <div className="buttons">
              <button
                type="reset"
                onClick={() => CancelConform()}
                className="submite-button2"
              >
                Cancel
              </button>
              <button
                type="reset"
                onClick={() => deleteValue(Deleteid)}
                className="submite-button1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        ) : ''
}
      
      </div>
    </main>
  );
};
export default Display;
