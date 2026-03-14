import { useContext, useEffect, useState, useRef } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import thankyouIcon from "../assets/ThankYou/icon1.png"
import thankyouIconCircle from "../assets/ThankYou/icon2.png"
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { surveySchema } from '../schemas/survey-schema';
import { getLanguage } from '../utils/getLanguage';
import { countries } from '../utils/countries';
import { useTranslation } from '../hooks/useTranslation';

const SurveyModal = ({ onClose }) => {

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  // 1. State for Form Submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setTempToken, waitListEmail, setWaitListEmail } = useContext(AppContext);

  const tr = useTranslation();

  // Get localized country name with proper fallback
  const getCountryName = (country) => {
    const translationKey = `country_${country.code}`;
    const translated = tr(translationKey);
    // If translation returns the key itself, use English name as fallback
    return (translated && translated !== translationKey) ? translated : country.nameEn;
  };

  // Country dropdown state
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);

  // Filter countries based on search - search across localized name, English name, and ISO code
  const filteredCountries = countries.filter(country => {
    const localizedName = getCountryName(country).toLowerCase();
    const searchTerm = countrySearch.toLowerCase();
    return (
      localizedName.includes(searchTerm) ||
      country.nameEn.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm)
    );
  });
  const cookies = new Cookies();
  // 2. State for Inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: waitListEmail || '',
    seeking: '',
    areaOfInterest: [],
    country: '',
    languagePreference: {
      selected: '',
      custom: ''
    },
    grow: [],
    consent: false
  });
  // 3. State for Errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const completed = localStorage.getItem("waitlist_completed");
    if (completed === "true") {
      setAlreadySubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (waitListEmail) {
      setFormData(prev => ({ ...prev, email: waitListEmail }));
    }
  }, [waitListEmail]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }

    if (type === 'checkbox') {
      const currentArray = formData[name] || [];
      if (checked) {
        setFormData({ ...formData, [name]: [...currentArray, value] });
      } else {
        setFormData({ ...formData, [name]: currentArray.filter(item => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = surveySchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      const language = getLanguage();

      setErrors({});

      const finalData = {
        name: formData.fullName,
        email: formData.email,
        seeking: formData.seeking,
        areaOfInterest: formData.areaOfInterest,
        languagePreference:
          formData.languagePreference.selected === "Other"
            ? formData.languagePreference.custom
            : formData.languagePreference.selected,
        grow: formData.grow,
        country: formData.nameEn,
        language
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/addSurveyData`,
        finalData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ); 

      if (response?.data?.status == "success") {
        toast.success(tr('survey_toast_success'));
        setTempToken(response?.data?.data?.token);
        cookies.set('temp_token', response?.data?.data?.token, {
          path: '/',
          maxAge: 604800, // 7 days in seconds
          secure: true,   // Only send over HTTPS
          sameSite: 'lax'
        });

        localStorage.setItem("waitlist_completed", "true");
        setAlreadySubmitted(true);

        setWaitListEmail("");
        setTimeout(() => {
          setIsSubmitted(true);
        }, 1500)
      }
      else {
        toast.error(tr('survey_toast_error'))
      }

    }
    catch (e) {
      // toast.error("Form Submission error.");
      toast.error(e?.response?.data?.message || tr('survey_toast_error'));
    } finally {
      setIsLoading(false);
    }

  };

  // --- VIEW: THANK YOU MODAL ---
  if (isSubmitted || alreadySubmitted) {

    return (
      <div className="fixed z-[9999] overflow-y-hidden inset-0 h-screen w-screen flex items-center justify-center p-2">
        <div className="absolute inset-0 overflow-y-hidden bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>
        <div className="relative  w-[95%] overflow-y-hidden md:w-[60%] max-h-[90vh] overflow-y-auto bg-white rounded-[40px] shadow-2xl p-6 md:p-10 text-center animate-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-14 relative h-14  rounded-full flex items-center justify-center">
              <div>
                <img className='w-14 ' src={thankyouIconCircle} alt="" />
              </div>

              <div>
                <img className='w-6 h-6 top-3/10  opacity-[75%] left-3/10 absolute ' src={thankyouIcon} alt="" />
              </div>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">{tr("thankyou_title")}</h2>
          <p className="text-[#666666] text-center w-full md:w-[60%] md:mx-auto text-[10px] md:text-xs leading-relaxed mb-2">
            {tr("thankyou_subtitle")}
          </p>
          <div className='border-t my-4 border-[#AABD05] '></div>

          <h2 className="text-md md:text-lg font-bold mb-2 bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent">{tr("thankyou_next_step")}</h2>



          <div className="max-w-md mb-2 mx-auto">
            {/* Header Text */}
            <p className="font-Urbanist text-xs md:text-sm font-semibold mb-6 text-center text-gray-800 px-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: tr("thankyou_founder_intro") }} />

            {/* Styled List */}
            <ul className="space-y-4 px-4">
              {[
                tr("thankyou_benefit_1"),
                tr("thankyou_benefit_2"),
                tr("thankyou_benefit_3"),
                tr("thankyou_benefit_4")
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  {/* Custom Green Checkmark Icon */}
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#94BD1C]/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-[#94BD1C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {/* List Content */}
                  <span className="font-Urbanist text-xs md:text-sm text-gray-600 leading-snug text-left rtl:text-right">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex md:flex-row mt-4 flex-col gap-3 justify-center items-center'>
            {/* Maybe Later Button - Styled to match Watch Preview button size and design */}
            <button
              onClick={onClose}
              type="button"
              className="group relative inline-flex items-center justify-center px-10 py-3 rounded-full font-semibold font-Urbanist transition-all duration-300 cursor-pointer overflow-hidden shadow-xl active:scale-95 hover:scale-105 w-full md:w-auto"
            >
              {/* 1. THE GRADIENT BORDER LAYER */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#94BD1C] to-[#29C28C]"></div>

              {/* 2. WHITE BACKGROUND (Inside the border) */}
              <div className="absolute inset-[2px] bg-white rounded-full transition-opacity duration-300 group-hover:opacity-0"></div>

              {/* 3. BUTTON TEXT */}
              <span className="relative z-10 transition-all duration-300 text-sm md:text-md font-bold
              /* Default: Gradient Text */
              bg-gradient-to-r from-[#94BD1C] to-[#29C28C] bg-clip-text text-transparent
              /* Hover: Solid White */
              group-hover:text-white group-hover:bg-none
            ">
                {tr("thankyou_maybe_later")}
              </span>
            </button>

            {/* Unlock Access Button */}
            <NavLink to={"/exclusive"} className="w-full md:w-auto cursor-pointer">
              <button
                className="w-full px-10 py-3 rounded-full text-white cursor-pointer text-sm md:text-md shadow-xl transition-all hover:scale-105 active:scale-95 font-bold font-Urbanist"
                style={{
                  background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)'
                }}
              >
                {tr("thankyou_unlock_access")}
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    // FIX 1: Use h-[100dvh] instead of h-screen. This accounts for the Safari URL bar.
    <div className="fixed z-[100] inset-0 h-[100dvh] w-screen flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>

      {/* FIX 2: Adjusted max-h to 85dvh for mobile to ensure the entire modal + shadow is visible */}
      <div className="relative w-full max-w-2xl bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] md:max-h-[92vh] animate-in zoom-in-95 duration-300">

        {/* Header - Fixed */}
        <div className="w-full mt-0 py-4 md:py-6 text-center shrink-0 relative" style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}>
          <div className='flex items-center justify-start px-5 absolute top-0 left-0 h-full z-10'>
            <button onClick={onClose} type="button">
              <IoMdArrowBack className="text-2xl md:text-3xl text-white hover:text-red-500 transition-all cursor-pointer" />
            </button>
          </div>
          <h2 className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">{tr("survey_header")}</h2>
        </div>

        {/* Form Body - Scrollable */}
        <div className="overflow-y-auto z-20 p-6 md:p-12 custom-scrollbar flex-1">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-xl md:text-3xl font-bold text-[#111111]">{tr("survey_title")}</h3>
            <p className='font-Urbanist text-sm text-gray-500 my-1'>{tr("survey_sub")}</p>
          </div>

          <form id="survey-form" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                name="fullName"
                type="text"
                placeholder={tr("survey_name")}
                className="w-full px-6 font-Urbanist py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none focus:ring-2 focus:ring-[#94BD1C] text-[#111111] placeholder:text-gray-500 text-sm md:text-base"
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.fullName[0]}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder={tr("survey_email")}
                className="w-full px-6 font-Urbanist py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none focus:ring-2 focus:ring-[#94BD1C] text-[#111111] placeholder:text-gray-500 text-sm md:text-base"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <select
                name="seeking"
                className="w-full font-Urbanist px-6 py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none cursor-pointer text-[#111111] text-sm md:text-base"
                onChange={handleChange}
              >
                <option value="" className="text-gray-500">{tr("survey_seeking")}</option>
                <option value="Mentorship">{tr("survey_seek_grow")}</option>
                <option value="Networking">{tr("survey_seek_guide")}</option>
                <option value="Growth">{tr("survey_seek_both")}</option>
              </select>
              {errors.seeking && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.seeking[0]}</p>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-bold text-[#111111] text-xs md:text-sm text-left rtl:text-right rtl:mr-2 font-Urbanist">{tr("survey_interests_label")}</p>
              {[
                tr("survey_interest_career"),
                tr("survey_interest_health"),
                tr("survey_interest_personal"),
                tr("survey_interest_relationships"),
                tr("survey_interest_entrepreneurship"),
                tr("survey_interest_parenting"),
                tr("survey_interest_financial"),
                tr("survey_interest_leadership"),
                tr("survey_interest_other"),
              ].map((interest) => (
                <label key={interest} className="flex font-Urbanist items-center gap-4 p-4 rounded-2xl bg-[#F4F6F2] cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    name="areaOfInterest"
                    value={interest}
                    className="w-5 h-5 font-Urbanist accent-[#94BD1C]"
                    onChange={handleChange}
                  />
                  <span className="text-xs md:text-sm font-medium text-[#111111]">{interest}</span>
                </label>
              ))}
              {errors.areaOfInterest && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.areaOfInterest[0]}</p>
              )}
            </div>

            <div className="relative" ref={countryDropdownRef}>
              <input
                type="text"
                placeholder={tr('survey_country')}
                className="w-full font-Urbanist px-6 py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none focus:ring-2 focus:ring-[#94BD1C] text-[#111111] placeholder:text-gray-500 text-sm md:text-base cursor-pointer"
                value={formData.country ? getCountryName(formData.country) : countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setFormData({ ...formData, country: '' });
                  setIsCountryDropdownOpen(true);
                  if (errors.country) {
                    setErrors({ ...errors, country: undefined });
                  }
                }}
                onFocus={() => setIsCountryDropdownOpen(true)}
                readOnly={formData.country !== ''}
                onClick={() => {
                  if (formData.country) {
                    setFormData({ ...formData, country: '' });
                    setCountrySearch('');
                    setIsCountryDropdownOpen(true);
                  }
                }}
              />

              {/* Dropdown icon */}
              <svg
                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none ltr:right-4 rtl:left-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>

              {/* Dropdown list */}
              {isCountryDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="px-6 py-3 hover:bg-[#F4F6F2] cursor-pointer transition-colors text-sm md:text-base font-Urbanist text-[#111111]"
                        onClick={() => {
                          setFormData({ ...formData, country });
                          setCountrySearch('');
                          setIsCountryDropdownOpen(false);
                          if (errors.country) {
                            setErrors({ ...errors, country: undefined });
                          }
                        }}
                      >
                        {getCountryName(country)}
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-gray-500 text-sm md:text-base font-Urbanist">
                      {tr('survey_no_countries')}
                    </div>
                  )}
                </div>
              )}

              {errors.country && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.country[0]}</p>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-bold text-left rtl:text-right font-Urbanist text-[#111111] text-xs md:text-sm px-2">{tr("survey_language_label")}</p>
              <select
                className="w-full font-Urbanist px-6 py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none cursor-pointer text-[#111111] text-sm md:text-base"
                value={formData.languagePreference.selected}
                onChange={(e) => {
                  if (errors.languagePreference) {
                    setErrors({ ...errors, languagePreference: undefined });
                  }
                  setFormData({
                    ...formData,
                    languagePreference: {
                      selected: e.target.value,
                      custom: ""
                    }
                  });
                }}
              >
                <option value="">{tr("survey_language_select")}</option>
                <option value="English">{tr("survey_lang_english")}</option>
                <option value="Arabic">{tr("survey_lang_arabic")}</option>
                <option value="German">{tr("survey_lang_german")}</option>
                <option value="Both">{tr("survey_lang_both")}</option>
                <option value="Other">{tr("survey_lang_other")}</option>
              </select>

              {formData.languagePreference.selected === "Other" && (
                <input
                  type="text"
                  placeholder={tr("survey_lang_custom")}
                  className="w-full px-6 py-4 rounded-2xl bg-[#F4F6F2] border-none outline-none focus:ring-2 focus:ring-[#94BD1C] text-[#111111] text-sm md:text-base"
                  value={formData.languagePreference.custom}
                  onChange={(e) => {
                    if (errors.languagePreference) {
                      setErrors({ ...errors, languagePreference: undefined });
                    }
                    setFormData({
                      ...formData,
                      languagePreference: {
                        ...formData.languagePreference,
                        custom: e.target.value
                      }
                    });
                  }}
                />
              )}
              {errors.languagePreference && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.languagePreference[0]}</p>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-bold text-left rtl:text-right font-Urbanist text-[#111111] text-xs md:text-sm px-2">{tr("survey_growth_label")}</p>
              {[
                tr("survey_growth_connect"),
                tr("survey_growth_circle"),
                tr("survey_growth_mentorship"),
                tr("survey_growth_explore"),
              ].map((growth) => (
                <label key={growth} className="flex font-Urbanist items-center gap-4 p-4 rounded-2xl bg-[#F4F6F2] cursor-pointer">
                  <input
                    type="checkbox"
                    name="grow"
                    value={growth}
                    className="w-5 h-5 font-Urbanist accent-[#94BD1C] shrink-0"
                    onChange={handleChange}
                  />
                  <span className="text-xs md:text-sm font-medium text-[#111111] text-left rtl:text-right">{growth}</span>
                </label>
              ))}
              {errors.grow && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.grow[0]}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 py-4">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-[#94BD1C] cursor-pointer shrink-0"
                  onChange={(e) => {
                    if (errors.consent) {
                      setErrors({ ...errors, consent: undefined });
                    }
                    setFormData({ ...formData, consent: e.target.checked });
                  }}
                />
                <span className="text-[10px] md:text-xs text-black font-Urbanist leading-relaxed text-left rtl:text-right">{tr("survey_consent")}</span>
              </label>
              {errors.consent && (
                <p className="text-red-500 text-xs mt-1 px-2 text-left">{errors.consent[0]}</p>
              )}
            </div>

            <p className='text-black text-[10px] md:text-xs text-left rtl:text-right font-Urbanist pb-4' dangerouslySetInnerHTML={{ __html: tr("survey_footer") }} />
          </form>
        </div>

        {/* Footer - Fixed/Sticky at Bottom */}
        {/* FIX 3: Added pb-[env(safe-area-inset-bottom)] and explicit padding for iPhone home indicator */}
        <div className="shrink-0 p-5 pb-8 sm:pb-8 md:p-8 bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            form="survey-form"
            disabled={isLoading}
            className="flex-1 py-3 cursor-pointer md:py-4 rounded-full text-white font-bold shadow-lg transition-transform active:scale-95 text-sm md:text-base touch-manipulation disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(90deg, #94BD1C 0%, #29C28C 100%)' }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {tr("survey_submitting")}
              </span>
            ) : (
              tr("survey_submit")
            )}
          </button>
        </div>
      </div>
    </div>
  )
};

export default SurveyModal;