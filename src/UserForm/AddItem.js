import React, { useEffect } from "react";
import "./AddItem.css";
import MainLayout from "../Layout__/MainLayout";
import { useState } from "react";
import { apiUrl } from "../Constrains/URL";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./Form";
import { phoneRegex, fnRegex, emailRegex } from "../Validation/Regex";
import "./FormMQ.css";
import { currentDate1 } from "../utils__/DateFormat";

const AddItem = () => {
  const [validEmail, setValidEmail] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state,"locationAddItem")
  const loginId = location.state?.loginId;
  const loginVerification = location.state?.loginVerification;
  useEffect(() => {
    !loginVerification && navigate("/")
    console.log("ashhh")
  },[])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fn: "",
    ln: "",
    dob: "",
    phone: "",
    address: "",
  });
  const [Error, setError] = useState({
    email : ''
  });
  const [apiData, setApiData] = useState([]);

  const data = location.state;

  useEffect(() => {
    const callApiData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setApiData(response.data);
      } catch (error) {
      }
    };
    callApiData();
  }, []);
  useEffect(() => {
    if (location?.state?.single || location?.state?.singleData) {
      const array = location?.state;
      setFormData({
        email: array.single
          ? array?.single?.email
          : array?.singleData?.singleData?.email,
        password: array.single
          ? array?.single?.password
          : array?.singleData?.singleData?.password,
        fn: array.single
          ? array?.single?.fn
          : array?.singleData?.singleData?.fn,
        ln: array.single
          ? array?.single?.ln
          : array?.singleData?.singleData?.ln,
        dob: array.single
          ? array?.single?.dob
          : array?.singleData?.singleData?.dob,
        phone: array.single
          ? array?.single?.phone
          : array?.singleData?.singleData?.phone,
        address: array.single
          ? array?.single?.address
          : array?.singleData?.singleData?.address,
      });
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      if (value === "") {
        Error.email = "Email is Required";
      } else if (!emailRegex.test(value)) {
        Error.email = "Please Enter a Valid Email";
      } else {
        setError((prevState) => {
          const updateData = prevState ? { ...prevState } : {};
          updateData[name] = "";
          return updateData;
        });
      }
    } else {
      setError((prevState) => {
        const updateData = prevState ? { ...prevState } : {};
        updateData[name] = "";
        return updateData;
      });
    }
  };
  let emptyRequirement, allreadyExist, validOrNot;
  const submitAllData = (event) => {
    event.preventDefault();
    let error = {};

    emptyRequirement = true;
    allreadyExist = true;
    validOrNot = true;
    if(Error.email !== '')
    error.email = Error.email;
  else{
    if (formData.email === "") {
      error.email = "Email is Required";
      emptyRequirement = false;
    } else if (!emailRegex.test(formData.email)) {
      error.email = "Please Enter a Valid Email";
      validOrNot = false;
    }
  }
    if (formData.password === "") {
      error.password = "Password is Required";
      emptyRequirement = false;
    }
    if (formData.fn === "") {
      error.fn = "First Name is Required";
      emptyRequirement = false;
    } else if (!fnRegex.test(formData.fn)) {
      error.fn = "Please Enter a Valid First Name";
      validOrNot = false;
    }

    if (formData.ln === "") {
      error.ln = "Last Name is Required";
      emptyRequirement = false;
    } else if (!fnRegex.test(formData.ln)) {
      error.ln = "Please Enter a Valid Last Name";
      validOrNot = false;
    }
    if (formData.dob === "") {
      error.dob = "DOB is Required";
      emptyRequirement = false;
    }
    if (formData.phone === "") {
      error.phone = "Phone Number is Required";
      emptyRequirement = false;
    } else if (formData.phone.length !== 10) {
      error.phone = "Please Enter a 10 Digit Number";
      validOrNot = false;
    } else if (!phoneRegex.test(formData.phone)) {
      error.phone = "Please Enter a Valid Phone Number";
      validOrNot = false;
    }

    if (formData.address === "") {
      error.address = "Address is Required";
      emptyRequirement = false;
    } else if (formData.address.length > 50) {
      error.address = "Character Limit is 50 only";
      validOrNot = false;
    }
    // setError((prevState) => ({
    //   ...prevState,
    //   error,
    // }));
    setError(error);

    if (emptyRequirement && validOrNot && allreadyExist && validEmail) {
      if (!data.single && !data.singleData) {

        setAllValue();
      } else {
        const id = data?.single
          ? data?.single?.id
          : data?.singleData.singleData.id;
        editUserDetails(id);
      }
    }
  };
  // const addedMessage = async(email) => {
  //   console.log(`${apiUrl}/addedMessage/${email}`,"ddd")
  //   const verification = await axios.post(`${apiUrl}/addedMessage/${email}`)
  //   try{
  //      console.log(verification.data,"verify")
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }
  
  const getSingleData = async (email) => {
    const response = await axios.get(`${apiUrl}/identify/${email}`);
    navigate("/single", {
      state: { singleData: response.data, loginId: loginId, loginVerification },
    });
    return response.data;
  };
  const setAllValue = async () => {
    await axios.post(apiUrl, {
      email: formData.email,
      password: formData.password,
      fn: formData.fn,
      ln: formData.ln,
      dob: formData.dob,
      phone: formData.phone,
      address: formData.address,
    });
    // addedMessage(formData.email)
    !loginId
      ? getSingleData(formData.email)
      : navigate("/display", { state: { loginId, loginVerification } });
  };
  const getEditSingleData = async (email) => {
    const response = await axios.get(`${apiUrl}/identify/${email}`);
    navigate("/single", {
      state: { singleData: response.data, loginId: loginId, loginVerification },
    });
    return response.data;
  };
  const editUserDetails = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, {
        email: formData.email,
        password: formData.password,
        fn: formData.fn,
        ln: formData.ln,
        dob: formData.dob,
        address: formData.address,
        phone: formData.phone,
      });
      if (response.data === false) {
        setError((prevState) => ({
          ...prevState,
          email: "Email is Already Exists",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
      if (loginId) {
        navigate("/display", { state: { loginId: loginId, loginVerification } });
      } else {
        getEditSingleData(formData.email);
      }
      loginId
        ? navigate("/display", { state: { loginId: loginId, loginVerification } })
        : navigate("/single", { state: { loginId: loginId, loginVerification } });
    } catch (error) {
    }
  };

  function clearAllData() {
    setFormData({
      email: "",
      password: "",
      fn: "",
      ln: "",
      dob: "",
      address: "",
      phone: "",
    });
    setError('')
  }
  function Cancel() {
    if (loginId) navigate("/display", { state: { loginId: loginId, loginVerification } });
    else {
      if (location.state.singleData) {
        navigate("/single", {
          state: { singleData: location.state.singleData.singleData, loginId, loginVerification },
        });
      } else navigate("/");
    }
  }
  return (
    <main className="main">
      <MainLayout>
        <Form
          formData={formData}
          Cancel={Cancel}
          clearAllData={clearAllData}
          submitAllData={submitAllData}
          handleInputChange={handleInputChange}
          Error={Error}
          currentDate1={currentDate1}
          data={data}
          setError={setError}
          setValidEmail={setValidEmail}
        />
      </MainLayout>
    </main>
  );
};

export default AddItem;
