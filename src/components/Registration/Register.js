
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../apiConfig";
import { useFormik } from "formik";
import {Toast} from "react-bootstrap";
//import { useDispatch, useSelector } from "react-redux";
//import { setFormData, selectFormData } from "../../../features/form/formSlice";
import CustomerInfo from "./CustomerInfo";
import { getEvents } from "../../api/events";
import * as Yup from "yup";
const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(null);
const location = useLocation();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {randomString} = useParams();
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");
  const [regsitrationUrl, setRegistrationUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [categoryMinimumAge, setCategoryMinimumAge] = useState(0);
  const [categoryMaximumAge, setCategoryMaximumAge] = useState(0);

useEffect(()=> {
const fetchData = async()=>{
const res = await axios.get(`${baseUrl}users/get-specialurl/${randomString}`)
setRegistrationUrl(res.data);
}
fetchData();
},[randomString])

useEffect(() => {
  const fetchData = async () => {
    try {
      setEventsError("");
      setEventsLoading(true);
      let allEvents = [];
      let currentPage = 1;
      const perPage = 10;
      let totalEvents = 0;
      const response = await getEvents({ page: currentPage, perPage });
      const totalCountHeader = response.headers.get('x-total-count');
      console.log('Total Count Header:', totalCountHeader);
  
      totalEvents = parseInt(totalCountHeader, 10);
      const totalPages = Math.ceil(totalEvents / perPage);
      console.log(`Total Pages to fetch: ${totalPages}`);

      allEvents = response.data;
      while (currentPage < totalPages) {
        currentPage++;
        const pageResponse = await getEvents({ page: currentPage, perPage });
        allEvents = allEvents.concat(pageResponse.data);
      }
      setEvents(allEvents);
    } catch (error) {
      console.log("Error during fetching events", error);
      setEventsError(error.message);
    }
    finally {
      setEventsLoading(false);
    }
  }
  fetchData();
}, []);
const [runnerClubData, setRunnerClubData] = useState([]);
const fetchRunnerClub = async () => {
  const response = await axios.get(`${baseUrl}users/getAllRunnerClub`);
  setRunnerClubData(response.data)
}
useEffect(()=> {
fetchRunnerClub();
}, []);
console.log(events, ":events")
const event = events?.find(event=>event.id === regsitrationUrl?.eventId)
const runnerClub = runnerClubData?.find(item=>item.id === regsitrationUrl?.runnerClubId);
console.log(event, "event")
  useEffect(() => {
    const eventId = event ? event?.id : null;
      formik.setFieldValue("eventId", eventId);
    const runnerClubId = runnerClub ? runnerClub?.id : null;
    formik.setFieldValue("runnerClubId", runnerClubId);
    formik.setFieldValue("runnerClub", runnerClub?.name);
    formik.setFieldValue("isOfflineTransaction", true);
  }, [event, runnerClub]);
  const calculateAge = useMemo(() => {
    return (dateOfBirth) => {
      const birthDate = new Date(dateOfBirth);
      const currentDate = event ? new Date(event?.date) : null;
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
  }, [event?.date]);

  const createGenderObject = (categories) => {
    const genderObject = {};
    
    categories?.forEach(category => {
      genderObject[category.name] = category.gender;
    });
    return genderObject;
  };
  const genderObject = createGenderObject(event?.category);
  const generateCouponError = (message) => new Yup.ValidationError(message, null, 'couponCode');
  const validationSchema = Yup.lazy(() => {
    let schema = Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      categoryName: Yup.string().required("Category Name is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
        mobileNumber: Yup.string()
        .required("Mobile Number is required")
        .matches(/^(?!0|(\+91))\d{10}$/, {
          message: "Mobile Number should not start with 0 or +91 and should be 10 digits"
        }),
        gender: Yup.string()
        .test(
          "valid-gender",
          function (gender) {
            const dateOfBirth = formik.values.dateOfBirth;
      
            const selectedCategory = event?.category?.find(cat => cat.name === formik.values.categoryName);
            if (!selectedCategory) {
              return this.createError({
                message: "Please select a category first.",
              });
            }
      
            const ageBracket = selectedCategory?.ageBracket;
            const age = calculateAge(dateOfBirth);
      
            if (!ageBracket || ageBracket.length === 0) {
              return this.createError({
                message: `No age brackets available for category ${formik.values.categoryName}.`,
              });
            }
            const genderNormalized = gender?.toUpperCase();
            const matchedBracket = ageBracket.find(bracket => {
              const isAgeInRange = age >= bracket.minimumAge && age <= bracket.maximumAge;
              return isAgeInRange;
            });
            const allowedGender = matchedBracket && matchedBracket.gender;
            if (genderNormalized !== allowedGender && allowedGender !== "BOTH" && matchedBracket) {
              return this.createError({
                message: `For selected Age: ${age}, the allowed gender in category ${formik.values.categoryName} is: ${allowedGender}.`,
              });
            }
            return true;
          }
        )
        .required("Gender is required"),
      dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth must be in the past")
      .test(
        "valid-age",
        function (date) {
          const selectedCategory = event?.category?.find(cat => cat.name === formik.values.categoryName);
          const ageBracket = selectedCategory?.ageBracket;
          const age = calculateAge(date);
          if (!ageBracket || ageBracket.length === 0) {
            return this.createError({
              message: `No age brackets available for category ${formik.values.categoryName}.`,
            });
          }
          const matchedBracket = ageBracket && ageBracket.find(bracket => {
            const isAgeInRange = age >= bracket.minimumAge && age <= bracket.maximumAge;
            return isAgeInRange;
          });
          if (!matchedBracket) {
            const ageRanges = ageBracket?.map(bracket => `${bracket.minimumAge}-${bracket.maximumAge}`).join(', ');
            return this.createError({
              message: `No matching age bracket for category ${formik.values.categoryName}. Allowed age ranges: ${ageRanges}`,
            });
          }
          
          return true;
        }
      )
      .required("Date of Birth is required"),
      nameOfTheBib: Yup.string().required("Name on the Bib is required"),
      bloodGroup: Yup.string().required("Blood Group is required"),
      contactName: Yup.string().required("Contact Name is required"),
      contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^(?!0|(\+91))\d{10}$/, {
      message: "Contact Number should not start with 0 or +91 and should be 10 digits"
    })
    .test('not-same-as-mobile', "Contact number and emergency contact number cannot be the same.", function(value) {
      return value !== this.parent.mobileNumber;
    }),
      //street: Yup.string().required("This field is required"),
      //city: Yup.string().required("This field is required"),
      pincode: Yup.string().required("Pincode is required"),
      state: Yup.string().required("State is required"),
      //country: Yup.string().required("This field is required"),
      address: Yup.string().required('Address is required'),
medicalIssue: Yup.string(),
      acceptedTerms: Yup.boolean()
        .oneOf([true], "You must agree to the terms")
        .required("You must agree to the terms"),
        ...(event?.slug === "mutthu-marathon-2025"
          ? {
              additionalTermsAndConditions: Yup.boolean()
                .oneOf([true], "You must agree to an additional terms and conditions")
                .required("You must agree to an additional terms and conditions"),
            }
          : {}),
      // couponCode: Yup.string().max(15, 'Coupon code must not exceed more than 10 letters'),
      
      chronicIssues: Yup.string(),
      disorders: Yup.string(),
    });
    if (event?.slug !== "rmkv-saree-walkathon-2024") {
      schema = schema.concat(
        Yup.object().shape({
          tShirtSize: Yup.string().required("T-Shirt Size is required"),
          })
          )
    }
    return schema;
  });

    const formik = useFormik({
      initialValues: {
        firstName: formValues?.firstName || "",
        lastName: formValues?.lastName || "",
        email: formValues?.email || "",
        mobileNumber: formValues?.mobileNumber || "",
        gender: formValues?.gender || "",
        dateOfBirth: formValues?.dateOfBirth || "",
        tShirtSize: formValues?.tShirtSize || "",
        nameOfTheBib: formValues?.nameOfTheBib || "",
        bloodGroup: formValues?.bloodGroup || "",
        contactName: formValues?.contactName || "",
        contactNumber: formValues?.contactNumber || "",
        street: "",
        address: formValues?.address || "",
        city: formValues?.city || "",
        pincode: formValues?.pincode || "",
        state: formValues?.state || "",
        country: "",
        medicalIssue: formValues?.medicalIssue || "",
        categoryName: formValues?.categoryName || "",
        acceptedTerms: formValues?.acceptedTerms || "",
        additionalTermsAndConditions: formValues?.additionalTermsAndConditions || false,
        couponCode: formValues?.couponCode || "",
        addNewQuestion: formValues?.addNewQuestion || "",
      },
  validationSchema: validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        setIsSubmittingForm(true);
        setIsLoading(true);
        const age = calculateAge(values.dateOfBirth);
        values.dateOfBirth = `${values.dateOfBirth.getFullYear()}-${values.dateOfBirth.getMonth() + 1}-${values.dateOfBirth.getDate()}`
        const response = await axios.post(`http://localhost:3001/api/users/runner-registration/${randomString}`, { ...values, age });   
          const data = response.data;

            setToastVariant("success");
            setToastMessage("Runner registration successful!");
            setShowToast(true);
            setFormSubmitted(true);
      
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
            window.location.href = `https://www.novarace.in/pages/success/${data.id}`;
        } catch (error) {
          console.error("Error in form submission:", error);
      
          setToastVariant("danger");
          setToastMessage(
            error.response?.data?.error || "An unexpected error occurred. Please try again."
          );
          setShowToast(true);
          setFormSubmitted(false);
        } finally {
          setIsLoading(false);
          setIsSubmittingForm(false);
          setSubmitting(false);
        }
      },
    
  });


  useEffect(() => {
    if (event && formik.values.categoryName) {
      const selectedCategory = event.category.find(cat => cat.name === formik?.values?.categoryName);
      if (selectedCategory) {
        setCategoryMinimumAge(selectedCategory.minimumAge);
        setCategoryMaximumAge(selectedCategory.maximumAge);
const distance = selectedCategory.distance;
formik.setFieldValue("distance", distance);

      }
    }
  }, [event, formik.values.categoryName]);
  const [matchedAgeBracket, setMatchedAgeBracket] = useState('');
  useEffect(() => {
    const age = formik.values.dateOfBirth && calculateAge(formik.values.dateOfBirth);
    const gender = formik.values.gender;
if (event?.category) {
  const selectedCategory = event.category.find((cat) => cat.name === formik.values.categoryName);

  if (selectedCategory && selectedCategory.ageBracket && formik.values.dateOfBirth) {
    const matchedBracket = selectedCategory.ageBracket.find((bracket) => {
      const isAgeInRange = age >= bracket.minimumAge && age <= bracket.maximumAge;
      const isGenderMatch = bracket.gender === "BOTH" || bracket.gender === gender.toUpperCase();

      return isAgeInRange && isGenderMatch;
    });
          if (matchedBracket) {
            setMatchedAgeBracket(`You are registering in the ${matchedBracket.name} category of ${formik.values.categoryName}`);
          }
          else
          {
            setMatchedAgeBracket(`You are ineligible for ${formik.values.categoryName}. Please choose a different category`)
          }
  }
      
    }

  }, [formik.values.dateOfBirth, formik.values.gender, event]);
  useEffect(() => {
    setMatchedAgeBracket('');
  }, [formik.values.categoryName]);
  const isMatched = matchedAgeBracket?.startsWith('You are registering in');
//   const handleFormSubmit = (data) => {
//     setCompletedAllSteps(true);

// setCurrentStep(currentStep + 1);
//   };
const renderSpinner = () => {
  return (
    <div className="loading-overlay text-center d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
     <div className="spinner"></div>
    </div>
  );
};
  const steps = [
    {
      title: "Personal Details",
      stepNo: "1",
      stepBar: (
        <>
        </>
      ),
      content:  <CustomerInfo
         eventCategory = {event}
         categoryMinimumAge={categoryMinimumAge}
         formik={formik}
         categoryNames={categoryNames} 
         customSlug={event?.slug}         
         matchedAgeBracket={matchedAgeBracket}     
         isMatched={isMatched}    
         runnerClub={runnerClub}    
         />
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

  const nextStep = () => {
    if (formik.isValid) {
      formik.handleSubmit();
      //setCurrentStep(currentStep +1)
    }
  };
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
 

  const handleClickStep = (index) => {
    setCurrentStep(index);
  };
  useEffect(()=>{
    {isLoading && 
    window.scrollTo({ top: 0, behavior: "smooth" });
    }
  })
  const [errorList, setErrorList] = React.useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleRegisterClick = () => {
    setButtonClicked(true);
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        nextStep();
      } else {
        formik.setTouched({
          ...formik.touched,
          ...Object.keys(errors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        });
      }
    });
  };

  useEffect(() => {
    const updatedErrors = Object.keys(formik.errors);
    setErrorList(updatedErrors);
  }, [formik.errors]);
  return (
    <>
    <style>
      {
        `@media (max-width: 768px) {
  .mobile-width {
    width: 100%;
  }
}
        `
      }
    </style>
      {/*<div className="row x-gap-40 y-gap-30 items-center mt-3">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-4">
              <div
                className="d-flex items-center transition">
                <div
                  className={
                    currentStep === index
                      ? "active size-40 rounded-full flex-center bg-blue-1"
                      : "size-40 rounded-full flex-center bg-blue-1-05 text-blue-1 fw-500"
                  }
                >
                  {currentStep === index ? (
                    <>
                      <i className="icon-check text-16 text-white"></i>
                    </>
                  ) : (
                    <>
                      <span>{step.stepNo}</span>
                    </>
                  )}
                </div>

                <div className="text-18 fw-500 ml-10"> {step.title}</div>
              </div>
            </div>

            {step.stepBar}
          </React.Fragment>
        ))}
                  </div> */}
   {isLoading ? (
     <> {renderSpinner()}</>
      ):
      <>
      <div className="row " >{renderStep()}</div>   
      
      <div className="row x-gap-20 y-gap-20 pt-10">
 
        {/*<div className="col-auto">
          <button
            className="button h-60 px-24 -blue-1 bg-light-2"
            disabled={currentStep === 0}
            onClick={previousStep}
          >
            Previous
          </button>
                  </div> */}
      
          {currentStep === 0  &&
                  <div className="">
               {buttonClicked && errorList.length > 0 && (
            <div className="error-list">
              <ul className="list-disc">
                {errorList.map((field, index) => (
                  <li className="text-danger" key={index}>
        {formik.errors[field] ? formik.errors[field] : `${field} is required`}
      </li>
                ))}
              </ul>
            </div>
          )}
               <button
      className="btn btn-primary mobile-width h-60 px-24 -dark-1 bg-blue-1 text-white mt-10"
      onClick={handleRegisterClick}
                    >
                    Register
    </button>
                  </div>    
          }
      </div>
      <div style={{ position: "absolute", top: "100px", right: "10px" }}>
    <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        className={`bg-${toastVariant}`}
      >
        <Toast.Header closeButton={true} className="d-flex justify-content-between align-items-center">
          <strong className="mr-auto">Registration</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      </div>
</>
}
      </>
  );
};

export default Register;
