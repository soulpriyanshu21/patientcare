/* =========================================
   PATIENTCARE PATIENT JAVASCRIPT
========================================= */

const API_URL = "http://127.0.0.1:8000";


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        navHome: "HOME",
        navCase: "CASE FORM",
        navDoctors: "DOCTORS",
        navHistory: "HISTORY",
        navAbout: "ABOUT",

        tagline: "DIGITAL PATIENT CASE SYSTEM",

        heroTitle: "Your Health.",
        heroTitleSpan: "Your Record.",

        heroDescription:
            "Provide your medical information securely so healthcare professionals can understand your case and provide better care.",

        startForm: "START CASE FORM",

        patientInfo: "PATIENT INFORMATION",
        caseTaking: "Case Taking Form",

        formDescription:
            "Fill in your details and medical information carefully.",

        personalDetails: "Personal Details",

        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",

        age: "Age",
        agePlaceholder: "Enter your age",

        gender: "Gender",

        male: "Male",
        female: "Female",
        other: "Other",

        phone: "Phone Number",
        phonePlaceholder: "Enter phone number",

        email: "Email",
        emailPlaceholder: "Enter email address",

        medicalInfo: "Medical Information",

        complaint: "Main Complaint",
        complaintPlaceholder:
            "Describe your main health concern...",

        symptoms: "Symptoms",
        symptomsPlaceholder:
            "Describe your symptoms...",

        duration: "Duration of Symptoms",
        durationPlaceholder:
            "e.g. 3 days, 2 weeks",

        severity: "Severity",

        selectSeverity: "Select severity",

        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe",

        medicalHistory: "Medical History",

        conditions: "Existing Medical Conditions",
        conditionsPlaceholder:
            "Diabetes, asthma, hypertension, etc.",

        medications: "Current Medications",
        medicationsPlaceholder:
            "List your current medications...",

        allergies: "Allergies",
        allergiesPlaceholder:
            "Mention any known allergies...",

        pastHistory: "Past Medical History",
        pastHistoryPlaceholder:
            "Previous illnesses, surgeries, hospitalizations...",

        lifestyle: "Lifestyle Information",

        diet: "Diet",

        select: "Select",

        vegetarian: "Vegetarian",
        nonVegetarian: "Non-Vegetarian",
        vegan: "Vegan",

        sleep: "Average Sleep",
        sleepPlaceholder: "e.g. 7 hours",

        activity: "Physical Activity",

        low: "Low",
        moderateActivity: "Moderate",
        high: "High",

        consultantDoctor: "Select Consultant Doctor",

        doctorHelp:
            "Choose the specialist you want your case to be reviewed by.",

        generalMedicine:
            "General Medicine Specialist",

        generalMedicineDesc:
            "General health and primary care",

        entSpecialist:
            "ENT Specialist",

        entDesc:
            "Ear, nose and throat specialist",

        gynaecologist:
            "Gynaecologist",

        gynaecologyDesc:
            "Women's reproductive health",

        homeopathy:
            "Homeopathy Specialist",

        homeopathyDesc:
            "Homeopathic consultation and care",

        pediatrician:
            "Pediatrician",

        pediatricDesc:
            "Children's health and pediatric care",

        eyeDoctor:
            "Eye Doctor / Ophthalmologist",

        eyeDesc:
            "Eye health and vision care",

        selectedDoctor:
            "Selected Doctor",

        noDoctorSelected:
            "No doctor selected",

        submit: "SUBMIT CASE",

        secureText:
            "Your information will be securely stored for healthcare professionals.",

        specialistNetwork:
            "SPECIALIST NETWORK",

        ourDoctors:
            "Our Consultant Doctors",

        doctorSectionDescription:
            "Choose a suitable specialist for your medical case.",

        records:
            "YOUR RECORDS",

        caseHistory:
            "Case History",

        noCases:
            "No Previous Cases",

        noCasesDescription:
            "Your submitted medical cases will appear here.",

        aboutSystem:
            "ABOUT THE SYSTEM",

        patientPortal:
            "Patient Case Portal",

        aboutDescription:
            "PatientCare allows patients to digitally provide their medical information and case history. Healthcare professionals can then review structured patient information through the doctor dashboard.",

        secureRecords:
            "Secure Records",

        digitalCase:
            "Digital Case Taking",

        doctorAccess:
            "Doctor Access",

        medicalHistoryFeature:
            "Medical History",

        footerDescription:
            "Digital Patient Case-Taking System",

        specialistFooter:
            "Multi-Specialist Healthcare Consultation"
    },


    hi: {

        navHome: "होम",
        navCase: "केस फॉर्म",
        navDoctors: "डॉक्टर",
        navHistory: "इतिहास",
        navAbout: "जानकारी",

        tagline: "डिजिटल मरीज केस सिस्टम",

        heroTitle: "आपका स्वास्थ्य।",
        heroTitleSpan: "आपका रिकॉर्ड।",

        heroDescription:
            "अपनी चिकित्सा जानकारी सुरक्षित रूप से दें ताकि स्वास्थ्य विशेषज्ञ आपके केस को बेहतर समझ सकें और उचित देखभाल प्रदान कर सकें।",

        startForm: "केस फॉर्म शुरू करें",

        patientInfo: "मरीज की जानकारी",
        caseTaking: "केस लेने का फॉर्म",

        formDescription:
            "अपनी व्यक्तिगत और चिकित्सा जानकारी ध्यानपूर्वक भरें।",

        personalDetails: "व्यक्तिगत जानकारी",

        fullName: "पूरा नाम",
        fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",

        age: "आयु",
        agePlaceholder: "अपनी आयु दर्ज करें",

        gender: "लिंग",

        male: "पुरुष",
        female: "महिला",
        other: "अन्य",

        phone: "फोन नंबर",
        phonePlaceholder: "फोन नंबर दर्ज करें",

        email: "ईमेल",
        emailPlaceholder: "ईमेल पता दर्ज करें",

        medicalInfo: "चिकित्सा जानकारी",

        complaint: "मुख्य शिकायत",
        complaintPlaceholder:
            "अपनी मुख्य स्वास्थ्य समस्या बताएं...",

        symptoms: "लक्षण",
        symptomsPlaceholder:
            "अपने लक्षणों का वर्णन करें...",

        duration: "लक्षणों की अवधि",
        durationPlaceholder:
            "जैसे 3 दिन, 2 सप्ताह",

        severity: "गंभीरता",

        selectSeverity: "गंभीरता चुनें",

        mild: "हल्की",
        moderate: "मध्यम",
        severe: "गंभीर",

        medicalHistory: "चिकित्सा इतिहास",

        conditions: "मौजूदा चिकित्सा स्थितियां",

        conditionsPlaceholder:
            "मधुमेह, अस्थमा, उच्च रक्तचाप आदि।",

        medications: "वर्तमान दवाएं",

        medicationsPlaceholder:
            "अपनी वर्तमान दवाओं की सूची दें...",

        allergies: "एलर्जी",

        allergiesPlaceholder:
            "ज्ञात एलर्जी का उल्लेख करें...",

        pastHistory: "पिछला चिकित्सा इतिहास",

        pastHistoryPlaceholder:
            "पिछली बीमारियां, ऑपरेशन, अस्पताल में भर्ती आदि...",

        lifestyle: "जीवनशैली की जानकारी",

        diet: "आहार",

        select: "चुनें",

        vegetarian: "शाकाहारी",
        nonVegetarian: "मांसाहारी",
        vegan: "वीगन",

        sleep: "औसत नींद",
        sleepPlaceholder: "जैसे 7 घंटे",

        activity: "शारीरिक गतिविधि",

        low: "कम",
        moderateActivity: "मध्यम",
        high: "अधिक",

        consultantDoctor: "सलाहकार डॉक्टर चुनें",

        doctorHelp:
            "उस विशेषज्ञ को चुनें जिसे आप अपना केस दिखाना चाहते हैं।",

        generalMedicine:
            "जनरल मेडिसिन विशेषज्ञ",

        generalMedicineDesc:
            "सामान्य स्वास्थ्य और प्राथमिक देखभाल",

        entSpecialist:
            "ईएनटी विशेषज्ञ",

        entDesc:
            "कान, नाक और गले के विशेषज्ञ",

        gynaecologist:
            "स्त्री रोग विशेषज्ञ",

        gynaecologyDesc:
            "महिलाओं के प्रजनन स्वास्थ्य विशेषज्ञ",

        homeopathy:
            "होम्योपैथी विशेषज्ञ",

        homeopathyDesc:
            "होम्योपैथिक परामर्श और देखभाल",

        pediatrician:
            "बाल रोग विशेषज्ञ",

        pediatricDesc:
            "बच्चों के स्वास्थ्य और बाल चिकित्सा देखभाल",

        eyeDoctor:
            "नेत्र रोग विशेषज्ञ",

        eyeDesc:
            "आंखों और दृष्टि की देखभाल",

        selectedDoctor:
            "चयनित डॉक्टर",

        noDoctorSelected:
            "कोई डॉक्टर नहीं चुना गया",

        submit: "केस जमा करें",

        secureText:
            "आपकी जानकारी स्वास्थ्य विशेषज्ञों के लिए सुरक्षित रूप से संग्रहीत की जाएगी।",

        specialistNetwork:
            "विशेषज्ञ नेटवर्क",

        ourDoctors:
            "हमारे सलाहकार डॉक्टर",

        doctorSectionDescription:
            "अपने चिकित्सा केस के लिए उपयुक्त विशेषज्ञ चुनें।",

        records:
            "आपके रिकॉर्ड",

        caseHistory:
            "केस इतिहास",

        noCases:
            "कोई पिछला केस नहीं",

        noCasesDescription:
            "आपके द्वारा जमा किए गए चिकित्सा केस यहां दिखाई देंगे।",

        aboutSystem:
            "सिस्टम के बारे में",

        patientPortal:
            "मरीज केस पोर्टल",

        aboutDescription:
            "PatientCare मरीजों को अपनी चिकित्सा जानकारी और केस इतिहास डिजिटल रूप से प्रदान करने की सुविधा देता है। स्वास्थ्य विशेषज्ञ डॉक्टर डैशबोर्ड के माध्यम से इस जानकारी की समीक्षा कर सकते हैं।",

        secureRecords:
            "सुरक्षित रिकॉर्ड",

        digitalCase:
            "डिजिटल केस टेकिंग",

        doctorAccess:
            "डॉक्टर एक्सेस",

        medicalHistoryFeature:
            "चिकित्सा इतिहास",

        footerDescription:
            "डिजिटल मरीज केस-टेकिंग सिस्टम",

        specialistFooter:
            "मल्टी-स्पेशलिस्ट हेल्थकेयर कंसल्टेशन"
    }
};


/* =========================================
   LANGUAGE FUNCTION
========================================= */

function changeLanguage(language) {

    const selectedLanguage = translations[language];

    if (!selectedLanguage) {
        return;
    }

    /* TEXT */

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (selectedLanguage[key]) {

            element.textContent = selectedLanguage[key];

        }

    });


    /* PLACEHOLDERS */

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (selectedLanguage[key]) {

            element.placeholder = selectedLanguage[key];

        }

    });


    document.documentElement.lang = language;

    localStorage.setItem(
        "patientcareLanguage",
        language
    );
}


/* =========================================
   LANGUAGE SELECTOR
========================================= */

const languageSelect =
    document.getElementById("languageSelect");

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            changeLanguage(this.value);

        }
    );

}


/* =========================================
   LOAD SAVED LANGUAGE
========================================= */

const savedLanguage =
    localStorage.getItem("patientcareLanguage");

if (savedLanguage && translations[savedLanguage]) {

    languageSelect.value = savedLanguage;

    changeLanguage(savedLanguage);

}


/* =========================================
   DOCTOR SELECTION
========================================= */

const doctorOptions =
    document.querySelectorAll(
        'input[name="consultant_doctor"]'
    );

const selectedDoctorText =
    document.getElementById(
        "selectedDoctorText"
    );


doctorOptions.forEach(doctor => {

    doctor.addEventListener("change", function () {

        const doctorName = this.value;

        const specialization =
            this.getAttribute(
                "data-doctor-specialization"
            );

        selectedDoctorText.textContent =
            `Dr. ${doctorName} — ${specialization}`;

    });

});


/* =========================================
   PATIENT FORM
========================================= */

const patientForm =
    document.getElementById("patientForm");


if (patientForm) {

    patientForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================
               PERSONAL DATA
            ========================= */

            const fullName =
                document
                    .getElementById("full_name")
                    .value
                    .trim();


            const age =
                document
                    .getElementById("age")
                    .value;


            const genderElement =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            /* =========================
               MEDICAL DATA
            ========================= */

            const complaint =
                document
                    .getElementById("complaint")
                    .value
                    .trim();


            const symptoms =
                document
                    .getElementById("symptoms")
                    .value
                    .trim();


            const duration =
                document
                    .getElementById("duration")
                    .value
                    .trim();


            const severity =
                document
                    .getElementById("severity")
                    .value;


            const conditions =
                document
                    .getElementById("conditions")
                    .value
                    .trim();


            const medications =
                document
                    .getElementById("medications")
                    .value
                    .trim();


            const allergies =
                document
                    .getElementById("allergies")
                    .value
                    .trim();


            const pastHistory =
                document
                    .getElementById("past-history")
                    .value
                    .trim();


            /* =========================
               LIFESTYLE
            ========================= */

            const diet =
                document
                    .getElementById("diet")
                    .value;


            const sleep =
                document
                    .getElementById("sleep")
                    .value
                    .trim();


            const activity =
                document
                    .getElementById("activity")
                    .value;


            /* =========================
               DOCTOR
            ========================= */

            const doctorElement =
                document.querySelector(
                    'input[name="consultant_doctor"]:checked'
                );


            /* =========================
               VALIDATION
            ========================= */

            if (
                !fullName ||
                !age ||
                !genderElement ||
                !complaint
            ) {

                alert(
                    "Please fill all required patient information."
                );

                return;
            }


            if (!doctorElement) {

                alert(
                    "Please select a consultant doctor."
                );

                return;
            }


            /* =========================
               DOCTOR DATA
            ========================= */

            const selectedDoctor =
                doctorElement.value;

            const doctorSpecialization =
                doctorElement.getAttribute(
                    "data-doctor-specialization"
                );


            /* =========================
               COMPLETE DATA OBJECT
            ========================= */

            const patientData = {

                full_name: fullName,

                age: parseInt(age),

                gender: genderElement.value,

                phone: phone,

                email: email,

                main_complaint: complaint,

                symptoms: symptoms,

                symptom_duration: duration,

                severity: severity,

                existing_conditions: conditions,

                current_medications: medications,

                allergies: allergies,

                past_medical_history: pastHistory,

                diet: diet,

                sleep_hours: sleep,

                physical_activity: activity,

                consultant_doctor: selectedDoctor,

                doctor_specialization:
                    doctorSpecialization
            };


            console.log(
                "Patient Case:",
                patientData
            );


            /* =========================
               SUBMIT BUTTON
            ========================= */

            const submitButton =
                patientForm.querySelector(
                    ".submit-btn"
                );

            const originalText =
                submitButton.textContent;


            submitButton.disabled = true;

            submitButton.textContent =
                "SUBMITTING...";


            /* =========================
               API REQUEST
            ========================= */

            try {

                const response =
                    await fetch(
                        `${API_URL}/patients`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    patientData
                                )
                        }
                    );


                /* =========================
                   SERVER ERROR
                ========================= */

                if (!response.ok) {

                    let errorMessage =
                        "Unable to submit case.";

                    try {

                        const errorData =
                            await response.json();

                        if (errorData.detail) {

                            errorMessage =
                                errorData.detail;

                        }

                    } catch (error) {

                        console.log(
                            "Error response was not JSON."
                        );

                    }

                    throw new Error(
                        errorMessage
                    );
                }


                /* =========================
                   SUCCESS RESPONSE
                ========================= */

                const result =
                    await response.json();


                console.log(
                    "Server Response:",
                    result
                );


                alert(
                    "✅ Patient case submitted successfully!"
                );


                /* =========================
                   RESET FORM
                ========================= */

                patientForm.reset();


                selectedDoctorText.textContent =
                    "No doctor selected";


            } catch (error) {

                console.error(
                    "Submission Error:",
                    error
                );


                alert(
                    "❌ " +
                    error.message +
                    "\n\nMake sure your FastAPI backend is running."
                );

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }

        }
    );

}


/* =========================================
   NAVIGATION ACTIVE EFFECT
========================================= */

const navLinks =
    document.querySelectorAll("nav a");


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            this.classList.add("active");

        }
    );

});


/* =========================================
   CONSOLE
========================================= */

console.log(
    "PatientCare Patient Portal Loaded Successfully."
);

console.log(
    "API:",
    API_URL
);