/* =========================================
   PATIENTCARE DOCTOR DASHBOARD
========================================= */

const API_URL = "http://127.0.0.1:8000";


/* =========================================
   DOCTOR DATABASE
========================================= */

const doctors = {

    "Priyanshu Modi": {
        fullName: "Dr. Priyanshu Modi",
        specialization: "General Medicine"
    },

    "Priyanshu Bartwal": {
        fullName: "Dr. Priyanshu Bartwal",
        specialization: "ENT"
    },

    "Shruti Sharma": {
        fullName: "Dr. Shruti Sharma",
        specialization: "Gynaecology"
    },

    "Shubh Dakshika": {
        fullName: "Dr. Shubh Dakshika",
        specialization: "Homeopathy"
    },

    "Sahil Bisht": {
        fullName: "Dr. Sahil Bisht",
        specialization: "Pediatrics"
    },

    "Varun Pujara": {
        fullName: "Dr. Varun Pujara",
        specialization: "Ophthalmology"
    }

};


/* =========================================
   DEMO CASE DATA
========================================= */

/*
   These cases are for frontend testing.

   Later these will come from:
   FastAPI → MySQL
*/

let cases = [

    {
        case_id: 1001,

        patient_id: 501,

        patient_name: "Rahul Sharma",

        age: 28,

        gender: "Male",

        complaint: "Ear pain and reduced hearing",

        symptoms: "Ear pain, mild fever and blocked ear",

        duration: "3 days",

        severity: "moderate",

        specialization: "ENT",

        consultant_doctor: "Priyanshu Bartwal",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",

        prescription: ""
    },


    {
        case_id: 1002,

        patient_id: 502,

        patient_name: "Anjali Verma",

        age: 31,

        gender: "Female",

        complaint: "Irregular menstrual cycle",

        symptoms: "Abdominal pain and irregular periods",

        duration: "2 months",

        severity: "moderate",

        specialization: "Gynaecology",

        consultant_doctor: "Shruti Sharma",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",

        prescription: ""
    },


    {
        case_id: 1003,

        patient_id: 503,

        patient_name: "Aman Singh",

        age: 42,

        gender: "Male",

        complaint: "High fever and weakness",

        symptoms: "Fever, body pain and fatigue",

        duration: "4 days",

        severity: "severe",

        specialization: "General Medicine",

        consultant_doctor: "Priyanshu Modi",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",

        prescription: ""
    },


    {
        case_id: 1004,

        patient_id: 504,

        patient_name: "Riya Kapoor",

        age: 8,

        gender: "Female",

        complaint: "Cold and fever",

        symptoms: "Cough, fever and sore throat",

        duration: "2 days",

        severity: "mild",

        specialization: "Pediatrics",

        consultant_doctor: "Sahil Bisht",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",

        prescription: ""
    },


    {
        case_id: 1005,

        patient_id: 505,

        patient_name: "Vikas Joshi",

        age: 35,

        gender: "Male",

        complaint: "Blurred vision",

        symptoms: "Blurred vision and eye irritation",

        duration: "1 week",

        severity: "moderate",

        specialization: "Ophthalmology",

        consultant_doctor: "Varun Pujara",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",

        prescription: ""
    },


    {
        case_id: 1006,

        patient_id: 506,

        patient_name: "Neha Rawat",

        age: 26,

        gender: "Female",

        complaint: "Stress and sleep problems",

        symptoms: "Poor sleep, anxiety and fatigue",

        duration: "1 month",

        severity: "moderate",

        specialization: "Homeopathy",

        consultant_doctor: "Shubh Dakshika",

        status: "Pending",

        accepted_by: null,

        diagnosis: "",

        notes: "",
        prescription: ""
    }

];


/* =========================================
   CURRENT DOCTOR
========================================= */

let currentDoctor =
    "Priyanshu Modi";


/* =========================================
   DOM ELEMENTS
========================================= */

const doctorSelect =
    document.getElementById("doctorSelect");

const pendingContainer =
    document.getElementById(
        "pendingCasesContainer"
    );

const acceptedContainer =
    document.getElementById(
        "acceptedCasesContainer"
    );

const patientTableBody =
    document.getElementById(
        "patientTableBody"
    );

const pendingCount =
    document.getElementById(
        "pendingCount"
    );

const acceptedCount =
    document.getElementById(
        "acceptedCount"
    );

const reviewCount =
    document.getElementById(
        "reviewCount"
    );

const completedCount =
    document.getElementById(
        "completedCount"
    );


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDoctor();

        renderDashboard();

    }
);


/* =========================================
   CHANGE DOCTOR
========================================= */

doctorSelect.addEventListener(
    "change",
    function () {

        currentDoctor =
            this.value;

        loadDoctor();

        renderDashboard();

        closeCaseDetails();

    }
);


/* =========================================
   LOAD DOCTOR INFORMATION
========================================= */

function loadDoctor() {

    const doctor =
        doctors[currentDoctor];

    if (!doctor) {
        return;
    }


    document.getElementById(
        "headerDoctorName"
    ).textContent =
        doctor.fullName;


    document.getElementById(
        "headerDoctorSpecialization"
    ).textContent =
        doctor.specialization +
        " Specialist";


    document.getElementById(
        "welcomeDoctorName"
    ).textContent =
        doctor.fullName;


    document.getElementById(
        "welcomeDoctorSpecialization"
    ).textContent =
        doctor.specialization +
        " Specialist";

}


/* =========================================
   SPECIALIZATION MATCH
========================================= */

function isMatchingCase(caseData) {

    const doctor =
        doctors[currentDoctor];

    if (!doctor) {
        return false;
    }


    return (
        caseData.specialization
            .toLowerCase()
            .trim()
        ===
        doctor.specialization
            .toLowerCase()
            .trim()
    );

}


/* =========================================
   RENDER DASHBOARD
========================================= */

function renderDashboard() {

    renderPendingCases();

    renderAcceptedCases();

    renderPatients();

    updateStatistics();

}


/* =========================================
   PENDING CASES
========================================= */

function renderPendingCases() {

    pendingContainer.innerHTML = "";


    /*
       IMPORTANT:

       We only show cases belonging to
       the doctor's specialization.
    */

    const matchingCases =
        cases.filter(caseData => {

            return (
                isMatchingCase(caseData)
                &&
                caseData.status === "Pending"
            );

        });


    if (matchingCases.length === 0) {

        pendingContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📭
                </div>

                <h3>
                    No Matching Cases
                </h3>

                <p>
                    There are currently no pending
                    cases for ${doctors[currentDoctor].specialization}.
                </p>

            </div>

        `;

        return;
    }


    matchingCases.forEach(
        caseData => {

            pendingContainer.innerHTML +=
                createCaseCard(caseData);

        }
    );

}


/* =========================================
   CREATE CASE CARD
========================================= */

function createCaseCard(caseData) {

    const matching =
        isMatchingCase(caseData);


    return `

        <div class="case-card">

            <div class="case-top">

                <span class="case-id">
                    CASE #${caseData.case_id}
                </span>

                <span class="status-badge">
                    ${caseData.status}
                </span>

            </div>


            <h3>
                ${escapeHTML(caseData.patient_name)}
            </h3>


            <div class="case-specialization">

                ${escapeHTML(caseData.specialization)}

            </div>


            <p>

                ${escapeHTML(caseData.complaint)}

            </p>


            <div class="case-info">

                <div>

                    <span>
                        Age
                    </span>

                    <span>
                        ${caseData.age}
                    </span>

                </div>


                <div>

                    <span>
                        Gender
                    </span>

                    <span>
                        ${escapeHTML(caseData.gender)}
                    </span>

                </div>


                <div>

                    <span>
                        Severity
                    </span>

                    <span>
                        ${escapeHTML(caseData.severity)}
                    </span>

                </div>


                <div>

                    <span>
                        Consultant
                    </span>

                    <span>
                        Dr. ${escapeHTML(caseData.consultant_doctor)}
                    </span>

                </div>

            </div>


            ${
                matching
                ?
                `

                <button
                    class="accept-btn"
                    onclick="acceptCase(${caseData.case_id})"
                >
                    ✅ Accept Case
                </button>

                `
                :
                `

                <div class="not-matching-message">

                    ❌ This case does not match
                    your specialization.

                </div>

                `
            }

        </div>

    `;

}


/* =========================================
   ACCEPT CASE
========================================= */

function acceptCase(caseId) {

    const caseData =
        cases.find(
            item =>
                item.case_id === caseId
        );


    if (!caseData) {

        alert(
            "Case not found."
        );

        return;
    }


    /*
       SECURITY CHECK

       Even though the UI already filters
       cases, we check again before accepting.
    */

    if (!isMatchingCase(caseData)) {

        alert(
            "❌ You cannot accept this case because it does not match your specialization."
        );

        return;
    }


    if (caseData.status !== "Pending") {

        alert(
            "This case has already been processed."
        );

        return;
    }


    caseData.status =
        "Accepted";

    caseData.accepted_by =
        currentDoctor;


    alert(
        `✅ Case #${caseId} accepted by ${doctors[currentDoctor].fullName}`
    );


    renderDashboard();

}


/* =========================================
   ACCEPTED CASES
========================================= */

function renderAcceptedCases() {

    acceptedContainer.innerHTML = "";


    const myCases =
        cases.filter(caseData => {

            return (
                caseData.accepted_by
                ===
                currentDoctor
            );

        });


    if (myCases.length === 0) {

        acceptedContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🩺
                </div>

                <h3>
                    No Accepted Cases
                </h3>

                <p>
                    Cases accepted by
                    ${doctors[currentDoctor].fullName}
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    myCases.forEach(
        caseData => {

            acceptedContainer.innerHTML += `

                <div class="case-card">

                    <div class="case-top">

                        <span class="case-id">
                            CASE #${caseData.case_id}
                        </span>

                        <span class="status-badge">
                            ${escapeHTML(caseData.status)}
                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(caseData.patient_name)}
                    </h3>


                    <div class="case-specialization">
                        ${escapeHTML(caseData.specialization)}
                    </div>


                    <p>
                        ${escapeHTML(caseData.complaint)}
                    </p>


                    <div class="case-info">

                        <div>

                            <span>
                                Accepted By
                            </span>

                            <span>
                                Dr. ${escapeHTML(caseData.accepted_by)}
                            </span>

                        </div>


                        <div>

                            <span>
                                Severity
                            </span>

                            <span>
                                ${escapeHTML(caseData.severity)}
                            </span>

                        </div>

                    </div>


                    <button
                        class="accept-btn"
                        onclick="openCaseDetails(${caseData.case_id})"
                    >
                        👁️ Review Case
                    </button>

                </div>

            `;

        }
    );

}


/* =========================================
   PATIENT TABLE
========================================= */

function renderPatients() {

    patientTableBody.innerHTML = "";


    cases.forEach(caseData => {

        patientTableBody.innerHTML += `

            <tr>

                <td>
                    ${escapeHTML(caseData.patient_name)}
                </td>

                <td>
                    ${caseData.age}
                </td>

                <td>
                    ${escapeHTML(caseData.gender)}
                </td>

                <td>
                    ${escapeHTML(caseData.complaint)}
                </td>

                <td>
                    ${escapeHTML(caseData.specialization)}
                </td>

                <td class="table-status">
                    ${escapeHTML(caseData.status)}
                </td>

            </tr>

        `;

    });

}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    const doctorCases =
        cases.filter(caseData =>
            isMatchingCase(caseData)
        );


    const myCases =
        cases.filter(caseData =>
            caseData.accepted_by
            ===
            currentDoctor
        );


    const matchingPending =
        doctorCases.filter(
            caseData =>
                caseData.status === "Pending"
        );


    const inReview =
        myCases.filter(
            caseData =>
                caseData.status === "In Review"
        );


    const completed =
        myCases.filter(
            caseData =>
                caseData.status === "Completed"
        );


    pendingCount.textContent =
        matchingPending.length;


    acceptedCount.textContent =
        myCases.length;


    reviewCount.textContent =
        inReview.length;


    completedCount.textContent =
        completed.length;

}


/* =========================================
   OPEN CASE DETAILS
========================================= */

function openCaseDetails(caseId) {

    const caseData =
        cases.find(
            item =>
                item.case_id === caseId
        );


    if (!caseData) {
        return;
    }


    /*
       Only the doctor who accepted
       the case can open it.
    */

    if (
        caseData.accepted_by
        !==
        currentDoctor
    ) {

        alert(
            "You can only review cases accepted by you."
        );

        return;
    }


    document
        .getElementById(
            "caseDetailsSection"
        )
        .classList.remove("hidden");


    document
        .getElementById("caseId")
        .value =
        caseData.case_id;


    document
        .getElementById("caseStatus")
        .value =
        caseData.status;


    document
        .getElementById("diagnosis")
        .value =
        caseData.diagnosis || "";


    document
        .getElementById("doctorNote")
        .value =
        caseData.notes || "";


    document
        .getElementById("prescription")
        .value =
        caseData.prescription || "";


    document
        .getElementById(
            "patientDetails"
        )
        .innerHTML = `

            <div class="detail-row">

                <span>
                    Patient Name
                </span>

                <span>
                    ${escapeHTML(caseData.patient_name)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Age
                </span>

                <span>
                    ${caseData.age}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Gender
                </span>

                <span>
                    ${escapeHTML(caseData.gender)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Patient ID
                </span>

                <span>
                    ${caseData.patient_id}
                </span>

            </div>

        `;


    document
        .getElementById(
            "medicalDetails"
        )
        .innerHTML = `

            <div class="detail-row">

                <span>
                    Main Complaint
                </span>

                <span>
                    ${escapeHTML(caseData.complaint)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Symptoms
                </span>

                <span>
                    ${escapeHTML(caseData.symptoms)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Duration
                </span>

                <span>
                    ${escapeHTML(caseData.duration)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Severity
                </span>

                <span>
                    ${escapeHTML(caseData.severity)}
                </span>

            </div>


            <div class="detail-row">

                <span>
                    Required Specialist
                </span>

                <span>
                    ${escapeHTML(caseData.specialization)}
                </span>

            </div>

        `;


    document
        .getElementById(
            "caseDetailsSection"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CLOSE CASE
========================================= */

function closeCaseDetails() {

    document
        .getElementById(
            "caseDetailsSection"
        )
        .classList.add("hidden");

}


document
    .getElementById("closeCaseBtn")
    .addEventListener(
        "click",
        closeCaseDetails
    );


/* =========================================
   SAVE DOCTOR NOTES
========================================= */

document
    .getElementById("doctorNotesForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const caseId =
                parseInt(
                    document
                        .getElementById("caseId")
                        .value
                );


            const caseData =
                cases.find(
                    item =>
                        item.case_id === caseId
                );


            if (!caseData) {

                alert(
                    "Case not found."
                );

                return;
            }


            if (
                caseData.accepted_by
                !==
                currentDoctor
            ) {

                alert(
                    "You are not authorized to edit this case."
                );

                return;
            }


            caseData.status =
                document
                    .getElementById("caseStatus")
                    .value;


            caseData.diagnosis =
                document
                    .getElementById("diagnosis")
                    .value
                    .trim();


            caseData.notes =
                document
                    .getElementById("doctorNote")
                    .value
                    .trim();


            caseData.prescription =
                document
                    .getElementById("prescription")
                    .value
                    .trim();


            alert(
                "✅ Doctor notes saved successfully."
            );


            renderDashboard();

        }
    );


/* =========================================
   REFRESH BUTTON
========================================= */

document
    .getElementById("refreshCasesBtn")
    .addEventListener(
        "click",
        function () {

            renderDashboard();

            alert(
                "🔄 Cases refreshed."
            );

        }
    );


/* =========================================
   HTML ESCAPE
========================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   LANGUAGE
========================================= */

const languageSelect =
    document.getElementById(
        "languageSelect"
    );


languageSelect.addEventListener(
    "change",
    function () {

        if (this.value === "hi") {

            alert(
                "हिन्दी भाषा समर्थन जल्द ही जोड़ा जाएगा।"
            );

            this.value = "en";

        }

    }
);


/* =========================================
   CONSOLE
========================================= */

console.log(
    "PatientCare Doctor Dashboard Loaded."
);

console.log(
    "Current Doctor:",
    currentDoctor
);