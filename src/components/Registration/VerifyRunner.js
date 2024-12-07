import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './modal.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from "../../apiConfig";

const metadata = {
  title: 'Verify Runner || Novarace',
  description: 'Novarace',
};

const VerifyRunner = ({
  closeModal,
  onVerify,
  isEmailVerificationEnabled,
  isSmsVerificationEnabled,
}) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [smsOtp, setSmsOtp] = useState('');
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
  const [isSmsButtonDisabled, setIsSmsButtonDisabled] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [showSmsOtp, setShowSmsOtp] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [phoneNumberInputDisabled, setPhoneNumberInputDisabled] =
    useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isSmsLoading, setIsSmsLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email format')
        .required('Email is required')
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Invalid Email format'
        ),
      phoneNumber: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          'Mobile Number should not start with 0 or +91 and should be 10 digits'
        )
        .required('PhoneNumber is required '),
    }),
    onsubmit: (values) => {
      console.log('Form data', values);
    },
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    formik.handleChange(e);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    formik.setFieldValue('phoneNumber', value, true);
    setPhoneNumber(value);
  };

  const handleEmailOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setEmailOtp(value);
  };

  const handleSmsOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setSmsOtp(value);
  };

  const handleSendEmailOtp = async () => {
    setIsEmailLoading(true);
    try {
      setIsEmailButtonDisabled(true);
      const response = await axios.post(`${baseUrl}users/register/emailOtp`, {
        email: formik.values.email,
      });
      if (response.status === 200) {
        setShowEmailOtp(true);
        setToastMessage('Email OTP sent successfully!');
        setShowToast(true);
      } else {
        console.error('Failed to send OTP:', response.statusText);
        setToastMessage('Failed to send Email OTP');
        setShowToast(true);
        setIsEmailButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setToastMessage('please enter valid Email id');
      setShowToast(true);
      setIsEmailButtonDisabled(false);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleSendSmsOtp = async () => {
    setIsSmsLoading(true);
    try {
      setIsSmsButtonDisabled(true);
      const response = await axios.post(`${baseUrl}users/register/smsOtp`, {
        phoneNumber: formik.values.phoneNumber,
      });
      if (response.status === 200) {
        setShowSmsOtp(true);
        setToastMessage('SMS OTP sent successfully!');
        setShowToast(true);
      } else {
        console.error('Failed to send OTP:', response.statusText);
        setToastMessage('Failed to send SMS OTP');
        setShowToast(true);
        setIsEmailButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setToastMessage('please enter valid phoneNumber');
      setShowToast(true);
      setIsEmailButtonDisabled(false);
    } finally {
      setIsSmsLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}users/register/verifyEmailOtp`,
        { email: formik.values.email, emailOtp }
      );

      if (response.status === 200) {
        setShowEmailOtp(false);
        setToastMessage('Email verified successfully!');
        setShowToast(true);
        setEmailInputDisabled(true);
        setIsEmailButtonDisabled(true);
        setIsEmailVerified(true);
      } else {
        console.error('check the email otp:', response.statusText);
        setToastMessage('check the email otp');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Wrong OTP:', error);
      setToastMessage('Wrong OTP');
      setShowToast(true);
    }
  };

  const handleVerifySmsOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}users/register/verifySmsOtp`,
        { phoneNumber: formik.values.phoneNumber, smsOtp }
      );

      if (response.status === 200) {
        setShowSmsOtp(false);
        setToastMessage('PhoneNumber verified successfully!');
        setShowToast(true);
        setPhoneNumberInputDisabled(true);
        setIsSmsButtonDisabled(true);
        setIsPhoneNumberVerified(true);
      } else {
        console.error('check the sms otp:', response.statusText);
        setToastMessage('check the sms otp');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Wrong OTP:', error);
      setToastMessage('Wrong OTP');
      setShowToast(true);
    }
  };

  const handleExitEmailOtpScreen = () => {
    setShowEmailOtp(false);
  };

  const handleExitSmsOtpScreen = () => {
    setShowSmsOtp(false);
  };

  useEffect(() => {
    if (emailInputDisabled) {
      console.log('Email input disabled');
    }
  }, [emailInputDisabled]);

  useEffect(() => {
    if (phoneNumberInputDisabled) {
      console.log('phoneNumber input disabled');
    }
  }, [phoneNumberInputDisabled]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleContinueRegistration = () => {
   
    if (isEmailVerified && isPhoneNumberVerified) {
      console.log(isEmailVerified, isPhoneNumberVerified, "verified")
      onVerify({
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
      });
      closeModal();

 } else if (isEmailVerificationEnabled) {
    
      if (isEmailVerified) {
        

        onVerify({
          email: formik.values.email,
        });
        closeModal();
      } else {
        setToastMessage('Please verify your email to continue');
        setShowToast(true);
      }
    } else if (isSmsVerificationEnabled) {
      if (isPhoneNumberVerified) {
        onVerify({
          phoneNumber: formik.values.phoneNumber,
        });
        closeModal();
      } else {
        setToastMessage('Please verify your phone number to continue');
        setShowToast(true);
      }
    }
  };

//   useEffect(() => {
//     if (isPhoneNumberVerified || isEmailVerified) {
//       const timer = setTimeout(() => {
//         handleContinueRegistration();
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [isPhoneNumberVerified, isEmailVerified, handleContinueRegistration]);

useEffect(() => {
    if ((isEmailVerificationEnabled && !isEmailVerified) || (isSmsVerificationEnabled && !isPhoneNumberVerified)) {
 
      return; 
    }
  
    if (isPhoneNumberVerified || isEmailVerified) {
      const timer = setTimeout(() => {
        handleContinueRegistration();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPhoneNumberVerified, isEmailVerified, handleContinueRegistration, isEmailVerificationEnabled, isSmsVerificationEnabled]);

  
  return (
    <>
      {/* Email send OTP*/}

      <section className="pt-10">
        <div className="">
          <div className=" m-4">
            <form onSubmit={formik.handleSubmit}>
              {isEmailVerificationEnabled && (
                <div
                  className={`email-container ${
                    showEmailOtp || showSmsOtp ? 'blurred' : ''
                  } `}
                >
                  <label className="label-text">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="flex-grow-1">
                      <input
                        type="email"
                        className='form-control'
                        value={formik.values.email}
                        onChange={handleEmailChange}
                        onBlur={formik.handleBlur}
                        disabled={emailInputDisabled}
                        name="email"
                      />
                    </div>

                    {!isEmailVerified && (
                      <button
                        type="button"
                        className="m-2 btn btn-primary"
                        onClick={handleSendEmailOtp}
                        disabled={
                          !formik.touched.email ||
                          formik.errors.email ||
                          isEmailVerified ||
                          isEmailLoading
                        }
                        style={{
                          backgroundColor:
                            !formik.touched.email ||
                            formik.errors.email ||
                            isEmailVerified ||
                            isEmailLoading
                              ? 'grey'
                              : '',
                        }}
                      >
                        {isEmailLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'SendOtp'
                        )}
                      </button>
                    )}

                    {isEmailVerified && (
                      <span className="text-success ms-2 pt-2">Verified</span>
                    )}
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger pt-2">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              )}

              {/* Sms send OTP*/}
              {isSmsVerificationEnabled && (
                <div className="my-5">
                  <div
                    className={`phoneNumber-container ${
                      showEmailOtp || showSmsOtp ? 'blurred' : ''
                    }`}
                  >
                    <label className="label-text">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-container d-flex gap-2 align-items-center justify-content-center mt-3 mb-3">
                      <div className="flex-grow-1">
                        <input
                          type="tel"
                          className='form-control'
                          value={formik.values.phoneNumber}
                          onChange={handlePhoneNumberChange}
                          onBlur={formik.handleBlur}
                          disabled={phoneNumberInputDisabled}
                          name="phoneNumber"
                          maxLength={10}
                          pattern="[0-9]*"
                       />
                      </div>
                      {!isPhoneNumberVerified && (
                 
                 <button
                   type="button"
                   className="btn btn-primary"
                   onClick={handleSendSmsOtp}
                   disabled={
                     formik.values.phoneNumber.length !== 10 ||
                     formik.errors.phoneNumber ||
                     isPhoneNumberVerified ||
                     isSmsLoading
                   }
                   style={{
                     backgroundColor:
                       formik.values.phoneNumber.length !== 10 ||
                       formik.errors.phoneNumber ||
                       isPhoneNumberVerified ||
                       isSmsLoading
                         ? 'grey'
                         : '',
                   }}
                 >
                   {isSmsLoading ? (
                     <span
                       className="spinner-border spinner-border-sm"
                       role="status"
                       aria-hidden="true"
                     ></span>
                   ) : (
                     'SendOtp'
                   )}
                 </button>
        
             )}
</div>
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <div className="text-danger pt-2">
                          {formik.errors.phoneNumber}
                        </div>
                      )}

                    {isPhoneNumberVerified && (
                      <span className="text-success ms-2 pt-2">Verified</span>
                    )}

                  
                  </div>
                </div>
              )}
            </form>

            {/* Email otp verification */}
            {showEmailOtp && (
              <div
                className="form-input form-group row py-5"
                style={{
                  marginTop: isSmsVerificationEnabled ?'-100%' : '-60%',
                }}
              >
                <div className="col-12 d-flex justify-content-center">
                  <form className="otp-Form" onSubmit={handleVerifyEmailOtp}>
                    <button
                      className="exitBtn"
                      type="button"
                      onClick={handleExitEmailOtpScreen}
                    >
                      x
                    </button>
                    <span className="mainHeading"> Enter Email OTP </span>
                    <p className="otpSubheading">
                      We have sent a verification code to your Email
                    </p>
                    <div className="">
                      <input
                        type="text"
                        className=""
                        value={emailOtp}
                        maxLength={6}
                        onChange={handleEmailOtpChange}
                      />
                    </div>
                    <button className="verifyButton" type="submit">
                      Verify
                    </button>

                    <p className="resendNote">
                      Didn't receive the Code
                      <button
                        className="resendBtn"
                        type="button"
                        onClick={handleSendEmailOtp}
                      >
                        Resend Code
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            )}
            {/* sms otp verification */}
            {showSmsOtp && (
              <div
                className="form-input form-group row "
                style={{
                  marginTop: isEmailVerificationEnabled ? '-100%' : '-60%',
                }}
              >
                <div className="col-12 d-flex justify-content-center">
                  <form className="otp-Form" onSubmit={handleVerifySmsOtp}>
                    <button
                      className="exitBtn"
                      type="button"
                      onClick={handleExitSmsOtpScreen}
                    >
                      x
                    </button>
                    <span className="mainHeading"> Enter SMS OTP </span>
                    <p className="otpSubheading">
                      We have sent a verification code to your PhoneNumber
                    </p>
                    <div className="">
                      <input
                        type="text"
                        className=""
                        value={smsOtp}
                        maxLength={6}
                        onChange={handleSmsOtpChange}
                      />
                    </div>

                    <button className="verifyButton" type="submit">
                      Verify
                    </button>

                    <p className="resendNote">
                      Didn't receive the Code
                      <button
                        className="resendBtn"
                        type="button"
                        onClick={handleSendSmsOtp}
                      >
                        Resend Code
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showToast && (
        <div
          className="toast align-items-center text-black border-2 position-fixed top-0 end-0 p-1 shadow show"
          role="alert"
          style={{ zIndex: 1050 }}
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}

      {/* <div className="fixed-footer ">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleContinueRegistration}
        >
          Continue
        </button>
      </div> */}
    </>
  );
};
export default VerifyRunner;
