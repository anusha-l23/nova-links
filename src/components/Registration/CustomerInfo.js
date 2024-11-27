import './CustomerInfo.css';
import { useState, useCallback, useMemo, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { Modal, } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl } from '../../apiConfig';

const TShirtSizeModal = ({ show, handleClose, customSlug, eventCategory }) => {
  return (
    <>
    <style>
      {
        `
        @media (max-width: 576px) {
  .nowrap-table th,
  .nowrap-table td {
    white-space: nowrap;
  }
}
        `
      }
    </style>
  <Modal show={show} onHide={handleClose} size="xl">
  <Modal.Header closeButton className='bg-blue-2'>
    <Modal.Title>Size Chart</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="table-responsive">
<table className="table table-striped border mx-auto nowrap-table">
<thead>
  {eventCategory?.slug === "perambalur-marathon" ?
  <>
<tr>
  <th colSpan={4} className='py-2 text-center'>REGULAR SIZES</th>
</tr>
<tr style={{verticalAlign:"middle"}}>
<th scope="col" className='py-1' rowSpan={2}>Brand Size</th>
<th scope="col" className='py-1' rowSpan={2}>Standard Size</th>
<th scope="col" className='py-1' colSpan={2}>Chest (in)</th>
</tr>
<tr>
<th scope="col" className='py-1'>Width (in)</th>
<th scope="col" className='py-1'>Length (in)</th>
</tr>
</>
: 
<>
<tr>
    <th colSpan={5} className='py-2 text-center'>REGULAR SIZES</th>
  </tr>
<tr>
<th scope="col" className='py-1'>Brand Size</th>
<th scope="col" className='py-1'>Standard Size</th>
<th scope="col" className='py-1'>Chest (in)</th>
{eventCategory?.slug !== "senthil-marathon-2024" &&
<th scope="col" className='py-1'>Shoulder (in)</th>
}
<th scope="col" className='py-1'>Length (in)</th>
</tr>
</>
}
</thead>
<tbody>
{eventCategory?.slug === "perambalur-marathon" ?
  <>
<tr>
<td className='py-1'>XS</td>
<td className='py-1'>XS</td>
<td className='py-1'>36</td>
<td className='py-1'>25.5</td>
</tr>
<tr>
<td className='py-1'>S</td>
<td className='py-1'>S</td>
<td className='py-1'>38</td>
<td className='py-1'>26</td>
</tr>
<tr>
<td className='py-1'>M</td>
<td className='py-1'>M</td>
<td className='py-1'>40</td>
<td className='py-1'>27</td>
</tr>
<tr>
<td className='py-1'>L</td>
<td className='py-1'>L</td>
<td className='py-1'>42</td>
<td className='py-1'>28</td>
</tr>
<tr>
<td className='py-1'>XL</td>
<td className='py-1'>XL</td>
<td className='py-1'>44</td>
<td className='py-1'>28.5	</td>
</tr>
<tr>
<td className='py-1'>XXL</td>
<td className='py-1'>XXL</td>
<td className='py-1'>46</td>
<td className='py-1'>29</td>
</tr>
<tr>
<td className='py-1'>XXXL</td>
<td className='py-1'>XXXL</td>
<td className='py-1'>48</td>
<td className='py-1'>	30</td>
</tr>
</>
:
eventCategory?.slug === "senthil-marathon-2024" ?
<>
<tr>
<td className='py-1'>XXS</td>
<td className='py-1'>XXS</td>
<td className='py-1'>34</td>
<td className='py-1'>24.5</td>
</tr>
<tr>
<td className='py-1'>XS</td>
<td className='py-1'>XS</td>
<td className='py-1'>36</td>
<td className='py-1'>25.5</td>
</tr>
<tr>
<td className='py-1'>S</td>
<td className='py-1'>S</td>
<td className='py-1'>38</td>
<td className='py-1'>26.5</td>
</tr>
<tr>
<td className='py-1'>M</td>
<td className='py-1'>M</td>
<td className='py-1'>40</td>
<td className='py-1'>27.5</td>
</tr>
<tr>
<td className='py-1'>L</td>
<td className='py-1'>L</td>
<td className='py-1'>42	</td>
<td className='py-1'>	28.5</td>
</tr>
<tr>
<td className='py-1'>XL</td>
<td className='py-1'>XL</td>
<td className='py-1'>44	</td>
<td className='py-1'>29.5</td>
</tr>
<tr>
<td className='py-1'>XXL</td>
<td className='py-1'>XXL</td>
<td className='py-1'>46</td>
<td className='py-1'>30.5</td>
</tr>
<tr>
<td className='py-1'>3XL</td>
<td className='py-1'>3XL</td>
<td className='py-1'>48</td>
<td className='py-1'>31</td>
</tr>
</>
: 
<>
<tr>
<td className='py-1'>XS</td>
<td className='py-1'>XS</td>
<td className='py-1'>36</td>
<td className='py-1'>16.3</td>
<td className='py-1'>25.5</td>
</tr>
<tr>
<td className='py-1'>S</td>
<td className='py-1'>S</td>
<td className='py-1'>38</td>
<td className='py-1'>16</td>
<td className='py-1'>27.8</td>
</tr>
<tr>
<td className='py-1'>M</td>
<td className='py-1'>M</td>
<td className='py-1'>40</td>
<td className='py-1'>16.8	</td>
<td className='py-1'>28.2</td>
</tr>
<tr>
<td className='py-1'>L</td>
<td className='py-1'>L</td>
<td className='py-1'>42	</td>
<td className='py-1'>17.5</td>
<td className='py-1'>	28.8</td>
</tr>
<tr>
<td className='py-1'>XL</td>
<td className='py-1'>XL</td>
<td className='py-1'>45	</td>
<td className='py-1'>18.2	</td>
<td className='py-1'>29.2</td>
</tr>
<tr>
<td className='py-1'>XXL</td>
<td className='py-1'>XXL</td>
<td className='py-1'>47.5</td>
<td className='py-1'>19</td>
<td className='py-1'>29.8</td>
</tr>
<tr>
<td className='py-1'>3XL</td>
<td className='py-1'>3XL</td>
<td className='py-1'>50</td>
<td className='py-1'>	19.8	</td>
<td className='py-1'>30.2</td>
</tr>
</>
}
{ eventCategory?.slug !== 'salem-runners-marathon-2024' && eventCategory?.slug !== 'perambalur-marathon' && (
<>
<tr>
    <th colSpan={5} className='py-2 text-center'>KIDS SIZES</th>
  </tr>
  <tr>
<td className='py-1'>2-4 Yrs 24 inches</td>
<td className='py-1'>2-4 Yrs 24 inches</td>
<td className='py-1'></td>
<td className='py-1'></td>
<td className='py-1'></td>
</tr>
<tr>
<td className='py-1'>4-5 Yrs 26 inches</td>
<td className='py-1'>4-5 Yrs 26 inches</td>
<td className='py-1'></td>
<td className='py-1'></td>
<td className='py-1'></td>
</tr>
<tr>
<td className='py-1'>5-7 Yrs 28 inches</td>
<td className='py-1'>5-7 Yrs 28 inches</td>
<td className='py-1'></td>
<td className='py-1'></td>
<td className='py-1'></td>
</tr>
<tr>
<td className='py-1'>7-8 Yrs 30 inches</td>
<td className='py-1'>7-8 Yrs 30 inches</td>
<td className='py-1'></td>
<td className='py-1'></td>
<td className='py-1'></td>
</tr>
<tr>
<td className='py-1'>8-10 Yrs 32 inches</td>
<td className='py-1'>8-10 Yrs 32 inches</td>
<td className='py-1'></td>
<td className='py-1'></td>
<td className='py-1'></td>
</tr>
</>)
}
</tbody>
</table>
</div>
  </Modal.Body>

</Modal>
</>
)}


const CustomerInfo = ({runnerClub, formik, eventCategory, categoryNames, categoryMinimumAge, customSlug, isMatched, matchedAgeBracket }) => {  
  const [showTermsPopover, setShowTermsPopover] = useState(false);
  const [showAdditionalTermsPopover, setShowAdditionalTermsPopover] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverDivStyles = {
    color: isHovered ? '#dc3545' : '#007bff',
    textDecoration: isHovered ? 'underline' : '',
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}users/users?eventId=${eventCategory?.id}&orderStatus='COMPLETED'`);
          setUsers(response.data);

    } catch (error) {
      console.error(error);
    }
  };
    fetchRegistrations();
  }, [eventCategory]);
  const calculateAge = useMemo(() => {
    return (dateOfBirth) => {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();

      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        return age - 1;
      }
  
      return age;
    };
  }, []);
  


  const [age, setAge] = useState(calculateAge(formik.values.dateOfBirth));

  const handleDateChange = useCallback(
    (date) => {
      formik.setFieldTouched('dateOfBirth', true);
      formik.setFieldValue("dateOfBirth", date instanceof Date ? date : new Date(date));
      
      const newAge = calculateAge(date);      
      setAge(newAge);
    },
    [formik.setFieldValue, calculateAge, categoryMinimumAge, formik.setFieldError]
  );

  const IndianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
// const [runnerClub, setRunnerClub] = useState([])
// const fetchData = async()=> {
//   const response = await axios.get(`${baseUrl}users/getAllRunnerClub`);
//   const sortedData = response.data.sort((a, b) => {
//     if (a.name === "Others") return 1;
//     if (b.name === "Others") return -1;
//     return a.name.localeCompare(b.name);
//   });
//   setRunnerClub(sortedData); 
// }

// useEffect(()=>{
// fetchData();
// },[])
useEffect(() => {
  if (formik.values.mobileNumber !== '' && !formik.touched.mobileNumber) {
    formik.setFieldTouched('mobileNumber', true);
  }
  if (formik.values.contactNumber !== '' && !formik.touched.contactNumber) {
    formik.setFieldTouched('contactNumber', true);
  }
  if (formik.values.dateOfBirth !== '' && !formik.touched.dateOfBirth) {
    formik.setFieldTouched('dateOfBirth', true);
  }
  if (formik.values.gender !== '' && !formik.touched.gender) {
    formik.setFieldTouched('gender', true);
  }
  formik.validateForm();
}, [formik.values.mobileNumber, formik.values.contactNumber, formik.values.dateOfBirth, formik.values.gender]);

const [showOthersField, setShowOthersField] = useState(false);

// const [showPopup, setShowPopup] = useState(false);
const [hoverCategory, setHoveredCategory] = useState(null)
  
  return (
    <>
    <div className="container p-3">
      <form
        id="reg"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
          return false;
        }}
      >
          <div className={`${isMatched ? "bg-success rounded fs-4" : "bg-danger rounded fs-4" } text-center text-white mb-3`}>{matchedAgeBracket}</div>
        <h5>Please Enter Runner Details:</h5>
        <div className="row x-gap-40 y-gap-20">
        <div className="col-md-6">
        <div className="border p-4">
        <p className="fw-bold">SELECT YOUR CATEGORY</p>
          <div className={`form-group form-input row m-2 px-3 ${formik.touched.categoryName && formik.errors.categoryName ? "errorStyle " : ''}`}>
          <label className="text-16 fw-bold col-sm-12">Categories <span className="text-danger">*</span></label>
            <div className='col-sm-12'>
                    {eventCategory?.category?.map((category, index) => (
                <>
                <div  className={`row align-items-center rounded-4 cursor-pointer ${formik.values.categoryName === category.name ? `border-3 ${formik.values.categoryName && !isMatched ? "border-danger" : "border-warning"} rounded bg-light-2` : ""} mt-2`}
                         // onClick={() => formik.setFieldValue("categoryName", category.name)}
                         onClick={() => {
                          if (users && users?.filter(user=>user?.categoryName === category?.name)?.length >= parseInt(category?.maxRunners, 10)) {
                            return;
                          }
                           formik.setFieldValue("categoryName", category.name);
                        }}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onMouseLeave={()=> setHoveredCategory(null)}
                style={{
                  border: formik.touched.categoryName && formik.errors.categoryName ? "1px solid #dc2626" : "1px solid #ccc",
                backgroundColor: formik.touched.categoryName && formik.errors.categoryName && "#ffffff"
                     }}
                   >
                    {hoverCategory === category && (
                      <div className="popup"
                            >
                              <div className='popup-arrow'></div>
                              <div className='popup-content'>
                         Registration Eligibility Criteria for <b>{category.distance}&nbsp;KM</b>
                         <br />
                          MinimumAge : <b>{category.minimumAge}</b> - MaximumAge : <b>{category.maximumAge}</b>
                         <br/>
                                Gender : <b>{category.gender}</b>
                       </div>
                      </div>
                    )}
              <div className="col-sm-12 d-flex align-items-center justify-content-between gap-2">
            
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-1 gap-md-3">
                <div className='circle mt-2 mt-md-0'>
                {category.distance}
                </div>
                  <div className=''>
                {category.name}<br/>
                {category?.description}<br/>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.725 21L7 14v-2h3.5q1.325 0 2.288-.862T13.95 9H6V7h7.65q-.425-.875-1.263-1.437T10.5 5H6V3h12v2h-3.25q.35.425.625.925T15.8 7H18v2h-2.025q-.2 2.125-1.75 3.563T10.5 14h-.725l6.725 7z"></path></svg>{category?.amount}
              
                </div>
                </div>
              <div className="mt-2 py-2">
              {users && users?.filter(user=>user?.categoryName === category?.name)?.length >= parseInt(category?.maxRunners, 10) ? (
        <div className="fw-bold text-danger">SOLD OUT</div>
      ) : (
                <input
                  type="radio"
                  name="categoryName"
                  value={category.name}
                  className="custom-control-input large-radio"
                  checked={formik.values.categoryName === category.name}
                  onChange={(e) => formik.setFieldValue("categoryName", e.target.value)}
                  onBlur={formik.handleBlur}
                  required
                  onClick={(e) => e.stopPropagation()} 
                />
      )}
              </div>
            </div>
            </div>
            </>
               ))}
              {formik.touched.categoryName && formik.errors.categoryName && (
                <div className="text-danger">{formik.errors.categoryName}</div>
              )}
              </div>
              
            </div>
            </div>
            <div className="border p-4 mt-3">
            <p className="fw-bold">PERSONAL DATA</p>
            <div className={`form-group form-input row m-2 ${formik.touched.firstName && formik.errors.firstName ? "errorStyle" : ''}`}>
            <label className="text-16 fw-bold col-sm-4">First Name <span className='text-danger'>*</span></label>
            <div className="col-sm-8 ">
              <input
                type="text"
                id="firstname"
                name="firstName"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.firstName || ""}
                disabled={!formik.values.categoryName} className="form-control"
                style={{
                  border: formik.touched.firstName && formik.errors.firstName && "1px solid #dc2626",
                backgroundColor: formik.touched.firstName && formik.errors.firstName && "#ffffff"
                }}
                />
  {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-danger">{formik.errors.firstName}</div>
            )}
            </div>
          
            </div>

            <div className={`form-group form-input row m-2 ${formik.touched.lastName && formik.errors.lastName ? "errorStyle" : ''}`}>
                <label className="text-16 fw-bold col-sm-4">Last Name <span className='text-danger'>*</span></label>           
                <div className="col-sm-8">
                  <input
                    type="text"
                    id="lastname"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName || ""}
                    onChange={(e) => formik.handleChange(e)}
                    disabled={!formik.values.categoryName} className='form-control'
                     style={{
                      border: formik.touched.lastName && formik.errors.lastName && "1px solid #dc2626",
                      backgroundColor: formik.touched.lastName && formik.errors.lastName && "#ffffff"
                     }}
                  />
{formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-danger">{formik.errors.lastName}</div>
                )}
                  </div>
            </div>

            <div className={`form-group form-input row m-2 ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? "errorStyle" : ''}`}>
              <label className="text-16 fw-bold col-sm-4">Date of Birth <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <DatePicker
                inputClass=""
                containerClassName="custom_container-picker"
                value={
                  formik.values.dateOfBirth
                    ? new Date(formik.values.dateOfBirth)
                    : null
                }
                onChange={handleDateChange}   
                disabled={!formik.values.categoryName}
                id="dateOfBirth"
                name="dateOfBirth"
                format="DD/MM/YYYY"
                style={{
                  border: formik.touched.dateOfBirth && formik.errors.dateOfBirth && "1px solid #dc2626",
                  backgroundColor: formik.touched.dateOfBirth && formik.errors.dateOfBirth && "#ffffff"
                 }}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="text-danger">{formik.errors.dateOfBirth}</div>
              )}              
              </div>
            </div>
            <div className={`form-group form-input row m-2 ${formik.touched.gender && formik.errors.gender ? "errorStyle" : ''}`}>
              <label className="text-16 fw-bold col-sm-4">Gender <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
                <select className='form-select text-black' 
                name="gender" 
                id="gender" 
                disabled={!formik.values.categoryName}
                value={formik.values.gender || ""}
                style={{
                  border: formik.touched.gender && formik.errors.gender && "1px solid #dc2626",
                  backgroundColor: formik.touched.gender && formik.errors.gender && "#ffffff"
                 }}
                 onChange={(e) => {formik.handleChange(e)
                //  formik.setFieldTouched('gender', true);
                }}
                  onBlur={formik.handleBlur} >
                  <option value="">Please Select</option>
                  {eventCategory?.slug !== "rmkv-saree-walkathon-2024" &&
                  <option value="Male">Male</option>
}
      <option value="Female">Female</option>
                </select>                                
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger">{formik.errors.gender}</div>
                )}
              </div>
            </div>

            <div className={`form-group form-input row m-2 ${formik.touched.bloodGroup && formik.errors.bloodGroup ? "errorStyle" : ''}`}>
            
              <label className="text-16 fw-bold col-sm-4">Blood Group <span className='text-danger'>*</span></label>
              <div className="col-sm-8">            
              <select
                id="bloodgroup"
                className="p-2 form-select text-black"
                name="bloodGroup"
                style={{
                  width: "100%",
                  padding: "0.4em",
                  borderRadius: "7px",
                  outline: "none",
                   border: formik.touched.bloodGroup && formik.errors.bloodGroup && "1px solid #dc2626",
                  backgroundColor: formik.touched.bloodGroup && formik.errors.bloodGroup && "#ffffff",
                  color: "gray",
                }}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.bloodGroup || ""}
                disabled={!formik.values.categoryName}
              >
                <option value="">Please Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {formik.touched.bloodGroup && formik.errors.bloodGroup && (
              <div className="text-danger">{formik.errors.bloodGroup}</div>
            )}
            </div>
            
            </div>
            <div className={`form-group form-input row m-2 ${formik.touched.nameOfTheBib && formik.errors.nameOfTheBib ? "errorStyle" : ''}`}>
            
              <label className="text-16 fw-bold col-sm-4"> Name On the bib <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <input type="text" id="bib" className='form-control' name="nameOfTheBib" maxLength={16} onChange={(e) => formik.handleChange(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfTheBib || ""}
                  disabled={!formik.values.categoryName}
                  style={{
                    border: formik.touched.nameOfTheBib && formik.errors.nameOfTheBib && "1px solid #dc2626",
                    backgroundColor: formik.touched.nameOfTheBib && formik.errors.nameOfTheBib && "#ffffff"
                   }}
                />
                {formik.touched.nameOfTheBib && formik.errors.nameOfTheBib && (
                  <div className="text-danger">{formik.errors.nameOfTheBib}</div>
                )}
              </div>
            </div>
            {eventCategory?.slug !== "rmkv-saree-walkathon-2024" &&
            <div className={`form-group form-input row m-2 ${formik.touched.tShirtSize && formik.errors.tShirtSize ? "errorStyle" : ''}`}>
            
              <label className="text-16 fw-bold col-sm-4">T Shirt size <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <select id="tshirtsize" className="p-2 form-select text-black" name="tShirtSize" onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur}
                style={{
                  width: "100%",
                  padding: "0.4em",
                  borderRadius: "7px",
                  outline: "none",
                  border: formik.touched.tShirtSize && formik.errors.tShirtSize && "1px solid #dc2626",
                  backgroundColor: formik.touched.tShirtSize && formik.errors.tShirtSize && "#ffffff",
                  color: "gray",
                }} value={formik.values.tShirtSize || ""} disabled={!formik.values.categoryName}
                >
                <option value="">Please Select</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="3XL">3XL</option>
                
                {eventCategory?.slug !== 'salem-runners-marathon-2024' && eventCategory?.slug !== 'perambalur-marathon' && (<optgroup label="Kids">
                <option disabled>───────────</option>
                <option value="2-4 Yrs 24 inches">2-4 Yrs 24 inches</option>
                <option value="4-5 Yrs 26 inches">4-5 Yrs 26 inches</option>
                <option value="5-7 Yrs 28 inches">5-7 Yrs 28 inches</option>
                <option value="7-8 Yrs 30 inches">7-8 Yrs 30 inches</option>
                <option value="8-10 Yrs 32 inches">8-10 Yrs 32 inches</option>
              </optgroup>)}
                
              </select>
              {formik.touched.tShirtSize && formik.errors.tShirtSize && (
                  <div className="text-danger">{formik.errors.tShirtSize}</div>
                )}
              <div variant="primary" onClick={handleShow} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`pointer`} style={hoverDivStyles}>
                  Size Chart <i className="icon-chevron-sm-down text-12"></i>
              </div>
              <TShirtSizeModal show={show} handleClose={handleClose} customSlug={customSlug} eventCategory={eventCategory} />
            </div>
          </div>
          }
          {eventCategory?.slug !== 'salem-runners-marathon-2024' && (
          <div className='form-group form-input row m-2'>
            <label className="text-16 fw-bold col-sm-4">Medical Issues</label>
            <div className='col-sm-8'>
               <input type="text" id="medicalissue" className='form-control p-2 custom-placeholder' placeholder="Please enter medical issues if any" name="medicalIssue" onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur} value={formik.values.medicalIssue || ""} disabled={!formik.values.categoryName}/>
               {formik.touched.medicalIssue && formik.errors.medicalIssue && (
                <div className="text-danger">{formik.errors.medicalIssue}</div>
              )}
            </div>
          </div>
            )}
            {eventCategory?.slug === 'salem-runners-marathon-2024' && (
              <>
            <div className='form-group form-input row m-2'>
            <label className="text-16 col-sm-8">
            Do you suffer from ailments with blood pressure or cardiac or circulatory disorders?
            </label>
            <div className='col-sm-4'>
              <select id="chronicIssues" disabled={!formik.values.categoryName} name="disorders" className="disorders form-select" onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur}>
                    <option selected>YES</option>
                    <option>NO</option>
              </select>
            </div>
          </div>

          <div className='form-group form-input row m-2'>
          <label className="text-16 col-sm-8">
              Do you have any chronic disease?
            </label>
            <div className='col-sm-4 col align-self-end'>
              <select id="chronicIssues" disabled={!formik.values.categoryName} name="chronicIssues" className="disorders form-select form-control" onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur}>
                    <option selected>YES</option>
                    <option >NO</option>
              </select>
            </div>
          </div>
          </>
          )}


          <div className={`form-group form-input row m-2 ${formik.touched.address && formik.errors.address ? "errorStyle" : ''}`}>
            
            <label className="text-16 fw-bold col-sm-4">Address <span className='text-danger'>*</span></label>
            <div className='col-sm-8'>
              <textarea type="textarea" id="address" className='form-control custom-placeholder' name="address" placeholder='House, apartment, street, city'
              onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur} value={formik.values.address || ""} 
              disabled={!formik.values.categoryName}
              style={{
                border: formik.touched.address && formik.errors.address && "1px solid #dc2626",
                backgroundColor: formik.touched.address && formik.errors.address && "#ffffff"
               }}
              />
               {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>
          </div>

          <div className={`form-group form-input row m-2 ${formik.touched.state && formik.errors.state ? "errorStyle" : ''}`}>
            
            <label className="text-16 fw-bold col-sm-4">State <span className='text-danger'>*</span></label>
            <div className='col-sm-8'>
                <select
                id="state"
                className="p-2 form-select text-black"
                name="state"
                style={{
                  width: "100%",
                  padding: "0.4em",
                  borderRadius: "7px",
                  outline: "none",
                   border: formik.touched.state && formik.errors.state && "1px solid #dc2626",
                   backgroundColor: formik.touched.state && formik.errors.state && "#ffffff",
                  color: "gray",
                }}
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.state || ""}
                disabled={!formik.values.categoryName}
                >
                <option value="">Please Select</option>
                {IndianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger">{formik.errors.state}</div>
              )}
            </div>            
            </div>
            
            <div className={`form-group form-input row m-2 ${formik.touched.pincode && formik.errors.pincode ? "errorStyle" : ''}`}>
            
              <label className="text-16 fw-bold col-sm-4">Pincode <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <input type="text" id="pincode" className='form-control' name="pincode"
                  onChange={(e) => formik.handleChange(e)} onBlur={formik.handleBlur} value={formik.values.pincode || ""} disabled={!formik.values.categoryName}
                  style={{
                    border: formik.touched.pincode && formik.errors.pincode && "1px solid #dc2626",
                    backgroundColor: formik.touched.pincode && formik.errors.pincode && "#ffffff"
                   }}
                />                
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger">{formik.errors.pincode}</div>
              )}
              </div>
            </div>


        </div>
            
  </div>

<div className="col-md-6">
  <div className="border p-4">
<p className="fw-bold">CONTACT</p>
<p className="text-16">Email and Phone number on which you will receive the communication regarding the race</p>
          <div className={`form-input form-group row m-2 ${formik.touched.email && formik.errors.email ? "errorStyle" : ''}`}>
          <label className="text-16 fw-bold col-sm-4">Email <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <input
                type="email"
                id="email"
                className='form-control'
                name="email"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.email || ""}
                disabled={!formik.values.categoryName}
                style={{
                  border: formik.touched.email && formik.errors.email && "1px solid #dc2626",
                  backgroundColor: formik.touched.email && formik.errors.email && "#ffffff"
                 }}
              />

              

            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
            </div>
          </div>

            <div className={`form-input form-group row m-2 ${formik.touched.mobileNumber && formik.errors.mobileNumber ? "errorStyle" : ''}`}>
            <label className="text-16 fw-bold col-sm-4">Phone Number <span className='text-danger'>*</span></label>
              <div className='col-sm-8'>
              <input
                type="text" 
                className='form-control' 
                id="mobilenumber"
                name="mobileNumber"
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNumber || ""}
                disabled={!formik.values.categoryName}
                autoComplete="tel"
                style={{
                  border: formik.touched.mobileNumber && formik.errors.mobileNumber && "1px solid #dc2626",
                  backgroundColor: formik.touched.mobileNumber && formik.errors.mobileNumber && "#ffffff"
                 }}
              />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-danger">{formik.errors.mobileNumber}</div>
            )}
            </div>
          </div>


<p className="fw-bold mt-3">{eventCategory?.slug === "racing-kids-2024" ? "ADDITIONAL" : "EMERGENCY"} CONTACT</p>
          <div className={`form-input form-group row m-2 ${formik.touched.contactName && formik.errors.contactName ? "errorStyle" : ''}`}> 
            <label className="text-16 fw-bold col-sm-4">
                Name <span className='text-danger'>*</span>
              </label>
              <div className="col-sm-8">
              <input
                type="text"
                id="emergencycontactname"
                name="contactName" 
                className='form-control' 
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.contactName || ""}
                disabled={!formik.values.categoryName}
                style={{
                  border: formik.touched.contactName && formik.errors.contactName && "1px solid #dc2626",
                  backgroundColor: formik.touched.contactName && formik.errors.contactName && "#ffffff"
                 }}
              />
{formik.touched.contactName && formik.errors.contactName && (
              <div className="text-danger">{formik.errors.contactName}</div>
            )}
            </div>
          </div>
          <div className={`form-input form-group row m-2 ${formik.touched.contactNumber && formik.errors.contactNumber ? "errorStyle" : ''}`}>
            
            <label className="text-16 fw-bold col-sm-4">
                Number <span className='text-danger'>*</span>
              </label>
              <div className="form-input col-sm-8">
              <input
                type="text"
                id="emergencycontactnumber"
                name="contactNumber" 
                className='form-control'
                onChange={(e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.contactNumber || ""}
                disabled={!formik.values.categoryName}
                autoComplete="tel"
                style={{
                  border: formik.touched.contactNumber && formik.errors.contactNumber && "1px solid #dc2626",
                  backgroundColor: formik.touched.contactNumber && formik.errors.contactNumber && "#ffffff"
                 }}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
              <div className="text-danger">{formik.errors.contactNumber}</div>
            )}
            </div>

          </div>
          {eventCategory?.slug !== "racing-kids-2024" && (
          <>
{eventCategory?.slug !== "rmkv-saree-walkathon-2024" &&
          <div className='form-group form-input row m-2 align-items-center'>
            <label className="text-16 fw-bold col-sm-4">{eventCategory?.slug === "get-fit-tamizha" ? "Runner Club / School / College Name" : "Runner Club"}</label>
            <div className='col-sm-8'>
            <input
                  type="text"
                  id="runnerClub"
                  name="runnerClub" 
                  className='form-control'
                  onChange={(e) => formik.handleChange(e)}
                  onBlur={formik.handleBlur}
                  value={runnerClub?.name}
                  readOnly
                />
            </div>            
            </div>
}
            {eventCategory?.slug === "rmkv-saree-walkathon-2024" && 
            <div className='form-group form-input row m-2 align-items-center'>
            <label className="text-16 fw-bold col-sm-4">How did you come to know about RmKV Saree Walkathon 2024?</label>
            <div className='col-sm-8'>
                <select
                id="addNewQuestion"
                className="p-2 form-select text-black"
                name="addNewQuestion"
                style={{
                  width: "100%",
                  padding: "0.4em",
                  borderRadius: "7px",
                  outline: "none",
                  border: "1px solid lightgray",
                  color: "gray",
                }}
                onChange={(e) => {
                  const selectedValue = e.target.value === "" ? "None" : e.target.value;
                  formik.setFieldValue("addNewQuestion", selectedValue);
                  setShowOthersField(e.target.value === "OTHERS")
                }}
                onBlur={formik.handleBlur}
                value={formik.values.addNewQuestion || ""}
                disabled={!formik.values.categoryName}>
                <option value="">Please Select</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Friends and Relatives">Friends and Relatives</option>
                <option value="Others">Others</option>
              </select>
            </div>            
            </div>

}
            </>
          )
}

</div>
  </div>


</div>
<div className='mt-3'>
<span className="text-danger">*</span> Indicates mandatory fields
</div>
{/* <div className="row x-gap-20 y-gap-20 pt-10">
<div className="col-md-6">

            <div className="d-flex gap-2">
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formik.values.acceptedTerms}
                  onChange={(e) => formik.setFieldValue("acceptedTerms", e.target.checked)}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.categoryName}
                  required
                />

                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
              </div>
              <div className="text-15 lh-15 ml-10">
              I have read and agree to the {" "}
          <span
          style={{cursor:"pointer", textDecoration:"underline"}}
            className="terms-link"
            onClick={() => setShowTermsPopover(true)}
          >
            terms and conditions
          </span>
              </div>
            </div> */}
            <div class="form-check">
  <input class="form-check-input" type="checkbox"
                  name="acceptedTerms"
                  checked={formik.values.acceptedTerms}
                  onChange={(e) => formik.setFieldValue("acceptedTerms", e.target.checked)}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.categoryName}
                  required
                   id="flexCheckChecked"/>
  <label class="form-check-label" for="flexCheckChecked">
  I have read and agree to the {" "}
          <span
          style={{cursor:"pointer", textDecoration:"underline"}}
            className="terms-link"
            onClick={() => setShowTermsPopover(true)}
          >
            terms and conditions
          </span>
  </label>
</div>
            {formik.touched.acceptedTerms && formik.errors.acceptedTerms && (
              <div className="text-danger">{formik.errors.acceptedTerms}</div>
            )}
       
{/* </div>
</div> */}
{eventCategory?.slug === "mutthu-marathon-2025" &&
<div className="row x-gap-20 y-gap-20 pt-10">
<div className="col-md-6">
            <div className="d-flex">
              <div className="form-checkbox mt-5">
                <input
                  type="checkbox"
                  name="additionalTermsAndConditions"
                  checked={formik.values.additionalTermsAndConditions}
                  onChange={(e) => formik.setFieldValue("additionalTermsAndConditions", e.target.checked)}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.categoryName}
                  required
                />

                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
              </div>
              <div className="text-15 lh-15 ml-10">
              I have read and agree to an {" "}
          <span
          style={{cursor:"pointer", textDecoration:"underline"}}
            className="terms-link"
            onClick={() => setShowAdditionalTermsPopover(true)}
          >
            additional terms and conditions
          </span>
              </div>
            </div>
            {formik.touched.additionalTermsAndConditions && formik.errors.additionalTermsAndConditions && (
              <div className="text-danger">{formik.errors.additionalTermsAndConditions}</div>
            )}
       
</div>
</div>
}
<TermsAndConditionsPopover
        showPopover={showTermsPopover}
        onClose={() => setShowTermsPopover(false)}
      />
<AdditionalTermsAndConditionsPopover
        showPopover={showAdditionalTermsPopover}
        onClose={() => setShowAdditionalTermsPopover(false)}
      />
      </form>
    </div>
  </>
  );
};

export default CustomerInfo;

const TermsAndConditionsPopover = ({ showPopover, onClose }) => {
  return (
    showPopover && (
      <div className="popover">
        <div className="popover-content">
          <span className="close" onClick={onClose}>&times;</span>
          <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-20 fw-600 mb-15">
                NovaRace Event Terms and Conditions:
              </h1>
              <p className="text-15 mt-5">
                Welcome to NovaRace! Before participating in any of our events,
                please read and agree to the following terms and conditions:
              </p>
              <h2 className="text-16 fw-500 mt-15">
                Organizer Responsibility:
              </h2>
              <div style={{ marginLeft: "3em" }}>
                <ul className="list-disc text-15 mt-5">
                  <li>
                    NovaRace acts solely as a platform to facilitate event
                    registration and promotion. We do not assume responsibility
                    for the organization, conduct, or safety of any events
                    listed on our platform.
                  </li>
                  <li>
                    Event organizers are solely responsible for the planning,
                    execution, and safety measures of their respective events.
                  </li>
                </ul>

                <h2 className="text-16 fw-500 mt-15">
                  Participant Responsibilities:
                </h2>
                 <ul className="list-disc text-15 mt-5">
                  <li>
                    By registering for an event on NovaRace, participants
                    acknowledge and accept that they are solely responsible for
                    their own safety, health, and actions during the event.
                  </li>
                  <li>
                    Participants must comply with the rules, regulations, and
                    guidelines set by the event organizer.
                  </li>
                </ul>

                <h2 className="text-16 fw-500 mt-15">Liability Waiver:</h2>
                 <ul className="list-disc text-15 mt-5">
                  <li>
                    Participants understand and agree that NovaRace is not
                    liable for any injuries, damages, losses, or expenses that
                    may occur during the event.
                  </li>
                  <li>
                    Participants waive any claims against NovaRace and its
                    affiliates in connection with their participation in the
                    event.
                  </li>
                </ul>

                <h2 className="text-16 fw-500 mt-15">
                  Event Changes or Cancellation:
                </h2>
                 <ul className="list-disc text-15 mt-5">
                  <li>
                    NovaRace reserves the right to modify event details,
                    including dates, times, and locations, at its discretion.
                  </li>
                  <li>
                    In the event of cancellation, NovaRace is not responsible
                    for any costs incurred by participants, such as travel or
                    accommodation expenses.
                  </li>
                </ul>
                <h2 className="text-16 fw-500 mt-15">
                  Registration and Payment:
                </h2>
                 <ul className="list-disc text-15 mt-5">
                  <li>
                    Event registration is complete only upon receipt of payment,
                    and refunds are subject to the event organizer&apos;s
                    policies.
                  </li>
                  <li>
                    NovaRace does not store or handle payment information
                    directly. All transactions are securely processed through
                    third-party payment gateways.
                  </li>
                </ul>
                <h2 className="text-16 fw-500 mt-15">Personal Information:</h2>
                 <ul className="list-disc text-15 mt-5">
                  <li>
                    NovaRace collects personal information for the sole purpose
                    of event registration and communication.
                  </li>
                  <li>
                    Participants&apos; personal information will not be shared,
                    sold, or used for any other purposes without explicit
                    consent.
                  </li>
                </ul>
              </div>
              <p className="text-15 mt-10">
                By registering for a NovaRace event, participants confirm that
                they have read, understood, and agreed to these terms and
                conditions. NovaRace reserves the right to update or modify
                these terms as needed. Participants are encouraged to review the
                terms regularly for any changes.
              </p>
              <p className="text-15 mt-10">
                If you have any questions or concerns, please contact us at {" "}
                <a href="mailto:support@novarace.in" className='text-blue-1'>support@novarace.in</a>.
                <br />
                Thank you for being part of the NovaRace community!
              </p>
            </div>
        </div>
      </div>
    )
  );
};
const AdditionalTermsAndConditionsPopover = ({ showPopover, onClose }) => {
  return (
    <>
    <style>
      {
        `
       table {
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
}
  th, td {
  padding:0.5em;
  }
        `
      }
    </style>
    {showPopover && (
      <div className="popover">
        <div className="popover-content">
          <span className="close" onClick={onClose}>&times;</span>
          <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-20 fw-600 mb-15">
              Terms & Conditions 
              </h1>
              <p className="text-15 mt-5">
              <span className='fw-bold'>Bib Distribution Venue and Date:</span> <a href="https://maps.app.goo.gl/9cvaZ9mWaD7Kh6Ne9" target='_blank' rel="noopener noreferrer" className='text-blue-1'>JPR Mahal Vaikuntham</a>. 4th January 2025 - 10 Am to 7 Pm
              </p>
              <p className="text-15 mt-5">
              <span className='fw-bold'>Prize Distribution Venue:</span> KAN Govt Higher Secondary School, Konganapuram.</p>
              <p className="text-15 mt-5">
              <span className='fw-bold'>Trail:</span> Rural village.</p>
              <div style={{ marginLeft: "3em" }}>
                <ul className="list-disc text-15 mt-5">
                  <li>
                  I consent that I am healthy and fit to participate in marathon events and I agreed to terms and conditions of Mutthu marathon.
                  </li>
                  <li>I agreed to receive any medical treatment which may be deemed advisable in the event of injury, accident and/or illness during the event.</li>
<li>Prize money is applicable only for the Tamil Nadu permanent residents. However we may recognize non-Tamil Nadu-residents runners performance consistent with their achievement.</li>
<li>Below are the available categories.</li>
                </ul>
                </div>
                <div className="table-responsive">
                <table className="border table-bordered mt-2">
                  <thead>
                    <tr>
                  <th>Race</th>
                  <th>Categories</th>
                  <th>Age Requirement</th>
                  <th>Eligible</th>
                  <th>Fee</th>
                  <th>Reporting time</th>
                  <th>Start Time</th>
                  </tr>
                  </thead>
<tbody>
  <tr>
  <td rowSpan={2}>SWELECT 42K Full-Marathon</td>
  <td>MEN</td>
  <td>18 Years & above</td>
  <td>Before 06-01-2007</td>
  <td>800</td>
  <td>4.30 AM</td>
  <td>5.00 AM</td>
  </tr>
  <tr>
  <td>WOMEN</td>
  <td>18 Years & above</td>
  <td>Before 06-01-2007</td>
  </tr>
  <tr>
    <td rowSpan={2}>DUCEN 21K Half-Marathon</td>
 <td>MEN</td>	
 <td>18 Years & above</td>
 <td>	Before 06-01-2007</td>
 <td>	700	</td>
 <td>5.30 AM</td>
 <td>	6.00 AM</td>
</tr>
<tr>
  <td>WOMEN</td>
  <td>18 Years & above</td>
  <td>Before 06-01-2007</td>
</tr>
<tr>
<td rowSpan={4}>KMC 11K RUN</td>
<td>MEN</td>
<td>18 Years & above</td>
<td>	Before 06-01-2007</td>
<td>	600</td>
<td>	6.00 AM</td>
<td>	6.30 AM</td>
</tr>
<tr>
<td>WOMEN</td>
<td>18 Years & above</td>
<td>Before 06-01-2007</td>
</tr>
			<tr>
      <td>BOYS</td>
      <td>Under 18 Yrs</td>
      <td>After 06-01-2007</td>
      </tr>
      <tr>
        <td>GIRLS</td>
        <td>	Under 18 Yrs</td>
        <td>	After 06-01-2007</td>
      </tr>

 <tr>
 <td rowSpan={4}>KISSFLOW 6K RUN</td>
<td>WOMEN</td>
  <td>	18 Years & above</td>	
  <td>Before 06-01-2007</td>
  <td>	450</td>
  <td>	6.30 AM</td>
  <td>	7.00 AM</td>
  </tr>
    <tr>
    <td>GIRLS</td>
    <td>	Under 18 Yrs</td>
    <td>	After 06-01-2007</td>			
    </tr>
    <tr>
    <td>BOYS</td>
    <td>	Under 14 Yrs</td>
    <td>	After 06-01-2011</td>			
    </tr>
    <tr>
<td>GIRLS</td>
<td>	Under 14 Yrs</td>
<td>After 06-01-2011</td>
    </tr>
    <tr>

    </tr>
    <tr>
    <td rowSpan={4}>CSK 3K RUN</td>
    <td>BOYS</td>
      <td>	Under 11 Yrs</td>
      <td>	After 06-01-2014</td>
      <td>	350</td>
      <td>	7.00 AM</td>
      <td>	7.20 AM</td>
      </tr>
      
      <tr>
<td>GIRLS</td>
<td>	Under 11 Yrs</td>
<td>	After 06-01-2014			</td>
</tr>
 <tr>
 <td>BOYS</td>
 <td>	Under 8 Yrs</td>
 <td>	After 06-01-2017</td>			
	
 </tr>
 <tr>
<td> GIRLS</td>
<td>	Under 8 Yrs</td>
<td>	After 06-01-2017			</td>
 </tr>
 <tr>
<td rowSpan={4}>8W Walk</td>
<td>MEN</td>
<td>	40 Years & above</td>
<td>	Before 06-01-1985</td>
<td>	500</td>	
<td>	7.20 AM</td>
<td>	7.30 AM</td>
 </tr>
 <tr>

  <td>WOMEN</td>
  <td>	40 Years & above</td>
  <td>Before 06-01-1985</td>
 </tr>
 <tr>
<td>MEN</td>
<td>	60 Years & above</td>
<td>	Before 06-01-1965</td>
 </tr>
				<tr>
          <td>WOMEN</td>
          <td>	60 Years & above</td>
          <td>	Before 06-01-1965</td>
        </tr>
				

 
</tbody>

			
</table>
<h1 className="text-20 fw-600 mt-3">EXPO DAY:</h1>

<p className="text-15 mt-5">Please bring this payment receipt to JPR Mahal, Vaikundam, Salem-Coimbatore Highway, Salem Dt on Saturday January 4th 2025, from 10am to 7pm. Here, please</p>

<p className="text-15 mt-5">a) Show valid photo ID. Only Govt IDs showing date of birth and residential address are acceptable. Example: Driving license, Aadhaar card, Voter Id etc. For Tamil Nadu school students, current School ID can be used.</p>

<p className="text-15 mt-5">b) Submit the medical fitness (Alternatively, proof of running a similar distance race during the last year). Help may be provided to get a fitness certificate at JPR Mahal, vaikundam.</p>

<p className="text-15 mt-5">c) Collect the T-shirt and BIB number.</p>

<p className="text-15 mt-5">d) Note: T-shirts will be issued on first-registered-first-served basis, and not guaranteed for late comers. Contact us at <a href="mailto:mutthumarathon@gmail.com" className='text-blue-1'>mutthumarathon@gmail.com</a> Passes cannot be exchanged or refunded.</p>

<p className="text-15 mt-5">Novarace enables a transaction between you and the organizers of this event.</p>

<p className="text-15 mt-5">For any refunds, grievances, claims and questions related to the event and its execution please contact the event organizer.</p>

</div>
        </div>
        </div>
        </div>
    )
  }
  </>
  );
};