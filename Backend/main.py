from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field

import mysql.connector
from mysql.connector import Error

import os
from dotenv import load_dotenv


# =====================================================
# LOAD ENVIRONMENT VARIABLES
# =====================================================

load_dotenv()


# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(
    title="PatientCare API",
    description="SIH26047 - Patient Case Taking Software",
    version="1.0.0"
)


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =====================================================
# DATABASE CONFIGURATION
# =====================================================

DB_CONFIG = {

    "host": os.getenv(
        "DB_HOST",
        "localhost"
    ),

    "port": int(
        os.getenv(
            "DB_PORT",
            "3306"
        )
    ),

    "user": os.getenv(
        "DB_USER",
        "root"
    ),

    "password": os.getenv(
        "DB_PASSWORD",
        ""
    ),

    "database": os.getenv(
        "DB_NAME",
        "patientcare"
    )
}


# =====================================================
# DATABASE CONNECTION
# =====================================================

def get_db_connection():

    try:

        connection = mysql.connector.connect(
            **DB_CONFIG
        )

        return connection

    except Error as error:

        print(
            "Database connection error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Database connection failed."
        )


# =====================================================
# PYDANTIC MODELS
# =====================================================


class PatientCreate(BaseModel):

    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    age: int = Field(
        ...,
        ge=1,
        le=120
    )

    gender: str

    phone: str | None = None

    email: str | None = None


class CaseCreate(BaseModel):

    patient_id: int

    doctor_id: int

    main_complaint: str

    symptoms: str | None = None

    symptom_duration: str | None = None

    severity: str = "moderate"

    existing_conditions: str | None = None

    current_medications: str | None = None

    allergies: str | None = None

    past_medical_history: str | None = None

    diet: str | None = None

    sleep_hours: str | None = None

    physical_activity: str | None = None


class CaseStatusUpdate(BaseModel):

    status: str


class DoctorNoteCreate(BaseModel):

    case_id: int

    doctor_id: int

    diagnosis: str | None = None

    notes: str | None = None

    prescription: str | None = None


# =====================================================
# ROOT
# =====================================================

@app.get("/")
def root():

    return {

        "message": "PatientCare API is running",

        "project": "SIH26047",

        "database": DB_CONFIG["database"]

    }


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
def health_check():

    connection = None

    try:

        connection = get_db_connection()

        return {

            "status": "ok",

            "database": "connected"

        }

    except Exception:

        return {

            "status": "error",

            "database": "not connected"

        }

    finally:

        if connection and connection.is_connected():

            connection.close()


# =====================================================
# CREATE PATIENT
# =====================================================

@app.post("/patients")
def create_patient(
    patient: PatientCreate
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        query = """
            INSERT INTO patients
            (
                full_name,
                age,
                gender,
                phone,
                email
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s
            )
        """

        values = (

            patient.full_name,

            patient.age,

            patient.gender,

            patient.phone,

            patient.email

        )

        cursor.execute(
            query,
            values
        )

        connection.commit()

        patient_id = cursor.lastrowid

        return {

            "message":
                "Patient created successfully",

            "patient_id":
                patient_id

        }

    except Error as error:

        if connection:
            connection.rollback()

        print(
            "Create patient error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to create patient."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET ALL PATIENTS
# =====================================================

@app.get("/patients")
def get_patients():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute("""
            SELECT
                patient_id,
                full_name,
                age,
                gender,
                phone,
                email,
                created_at
            FROM patients
            ORDER BY created_at DESC
        """)

        patients = cursor.fetchall()

        return patients

    except Error as error:

        print(
            "Get patients error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve patients."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET ALL DOCTORS
# =====================================================

@app.get("/doctors")
def get_doctors():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute("""
            SELECT
                doctor_id,
                full_name,
                specialization,
                email,
                phone,
                is_active
            FROM doctors
            WHERE is_active = TRUE
            ORDER BY doctor_id
        """)

        doctors = cursor.fetchall()

        return doctors

    except Error as error:

        print(
            "Get doctors error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve doctors."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET SINGLE DOCTOR
# =====================================================

@app.get("/doctors/{doctor_id}")
def get_doctor(
    doctor_id: int
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT
                doctor_id,
                full_name,
                specialization,
                email,
                phone,
                is_active
            FROM doctors
            WHERE doctor_id = %s
            """,
            (doctor_id,)
        )

        doctor = cursor.fetchone()

        if not doctor:

            raise HTTPException(
                status_code=404,
                detail="Doctor not found."
            )

        return doctor

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# CREATE MEDICAL CASE
# =====================================================

@app.post("/cases")
def create_case(
    case: CaseCreate
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # CHECK PATIENT
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT patient_id
            FROM patients
            WHERE patient_id = %s
            """,
            (case.patient_id,)
        )

        patient = cursor.fetchone()

        if not patient:

            raise HTTPException(
                status_code=404,
                detail="Patient not found."
            )


        # -------------------------------------------------
        # CHECK DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                doctor_id,
                specialization,
                is_active
            FROM doctors
            WHERE doctor_id = %s
            """,
            (case.doctor_id,)
        )

        doctor = cursor.fetchone()

        if not doctor:

            raise HTTPException(
                status_code=404,
                detail="Doctor not found."
            )


        if not doctor["is_active"]:

            raise HTTPException(
                status_code=400,
                detail="Doctor is not active."
            )


        # -------------------------------------------------
        # VALIDATE SEVERITY
        # -------------------------------------------------

        allowed_severity = [
            "mild",
            "moderate",
            "severe"
        ]

        if case.severity not in allowed_severity:

            raise HTTPException(
                status_code=400,
                detail="Invalid severity."
            )


        # -------------------------------------------------
        # CREATE CASE
        # -------------------------------------------------

        query = """
            INSERT INTO medical_cases
            (
                patient_id,
                doctor_id,
                main_complaint,
                symptoms,
                symptom_duration,
                severity,
                existing_conditions,
                current_medications,
                allergies,
                past_medical_history,
                diet,
                sleep_hours,
                physical_activity,
                status
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                'Pending'
            )
        """

        values = (

            case.patient_id,

            case.doctor_id,

            case.main_complaint,

            case.symptoms,

            case.symptom_duration,

            case.severity,

            case.existing_conditions,

            case.current_medications,

            case.allergies,

            case.past_medical_history,

            case.diet,

            case.sleep_hours,

            case.physical_activity

        )

        cursor.execute(
            query,
            values
        )

        connection.commit()

        case_id = cursor.lastrowid

        return {

            "message":
                "Medical case created successfully",

            "case_id":
                case_id,

            "doctor_id":
                case.doctor_id,

            "specialization":
                doctor["specialization"],

            "status":
                "Pending"

        }

    except Error as error:

        if connection:
            connection.rollback()

        print(
            "Create case error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to create medical case."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET ALL CASES
# =====================================================

@app.get("/cases")
def get_cases():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute("""
            SELECT

                mc.case_id,

                mc.patient_id,

                p.full_name AS patient_name,

                p.age,

                p.gender,

                p.phone,

                p.email,

                mc.doctor_id,

                d.full_name AS doctor_name,

                d.specialization,

                mc.main_complaint,

                mc.symptoms,

                mc.symptom_duration,

                mc.severity,

                mc.existing_conditions,

                mc.current_medications,

                mc.allergies,

                mc.past_medical_history,

                mc.diet,

                mc.sleep_hours,

                mc.physical_activity,

                mc.status,

                mc.created_at,

                mc.accepted_at

            FROM medical_cases mc

            INNER JOIN patients p
                ON mc.patient_id = p.patient_id

            LEFT JOIN doctors d
                ON mc.doctor_id = d.doctor_id

            ORDER BY mc.created_at DESC
        """)

        cases = cursor.fetchall()

        return cases

    except Error as error:

        print(
            "Get cases error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve cases."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET CASE BY ID
# =====================================================

@app.get("/cases/{case_id}")
def get_case(
    case_id: int
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT

                mc.case_id,

                mc.patient_id,

                p.full_name AS patient_name,

                p.age,

                p.gender,

                p.phone,

                p.email,

                mc.doctor_id,

                d.full_name AS doctor_name,

                d.specialization,

                mc.main_complaint,

                mc.symptoms,

                mc.symptom_duration,

                mc.severity,

                mc.existing_conditions,

                mc.current_medications,

                mc.allergies,

                mc.past_medical_history,

                mc.diet,

                mc.sleep_hours,

                mc.physical_activity,

                mc.status,

                mc.created_at,

                mc.accepted_at

            FROM medical_cases mc

            INNER JOIN patients p
                ON mc.patient_id = p.patient_id

            LEFT JOIN doctors d
                ON mc.doctor_id = d.doctor_id

            WHERE mc.case_id = %s
            """,
            (case_id,)
        )

        case = cursor.fetchone()

        if not case:

            raise HTTPException(
                status_code=404,
                detail="Case not found."
            )

        return case

    except Error as error:

        print(
            "Get case error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve case."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET CASES FOR SPECIFIC DOCTOR
# =====================================================

@app.get("/doctors/{doctor_id}/cases")
def get_doctor_cases(
    doctor_id: int
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # GET DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                doctor_id,
                full_name,
                specialization
            FROM doctors
            WHERE doctor_id = %s
            AND is_active = TRUE
            """,
            (doctor_id,)
        )

        doctor = cursor.fetchone()

        if not doctor:

            raise HTTPException(
                status_code=404,
                detail="Doctor not found."
            )


        # -------------------------------------------------
        # GET MATCHING CASES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                mc.case_id,

                mc.patient_id,

                p.full_name AS patient_name,

                p.age,

                p.gender,

                p.phone,

                p.email,

                mc.doctor_id,

                d.full_name AS doctor_name,

                d.specialization,

                mc.main_complaint,

                mc.symptoms,

                mc.symptom_duration,

                mc.severity,

                mc.existing_conditions,

                mc.current_medications,

                mc.allergies,

                mc.past_medical_history,

                mc.diet,

                mc.sleep_hours,

                mc.physical_activity,

                mc.status,

                mc.created_at,

                mc.accepted_at

            FROM medical_cases mc

            INNER JOIN patients p
                ON mc.patient_id = p.patient_id

            INNER JOIN doctors d
                ON mc.doctor_id = d.doctor_id

            WHERE mc.doctor_id = %s

            ORDER BY mc.created_at DESC
            """,
            (doctor_id,)
        )

        cases = cursor.fetchall()


        return {

            "doctor": doctor,

            "cases": cases

        }

    except Error as error:

        print(
            "Get doctor cases error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve doctor's cases."
        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# ACCEPT CASE
# =====================================================

@app.post("/cases/{case_id}/accept")
def accept_case(

    case_id: int,

    doctor_id: int

):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # GET DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                doctor_id,
                full_name,
                specialization,
                is_active
            FROM doctors
            WHERE doctor_id = %s
            """,
            (doctor_id,)
        )

        doctor = cursor.fetchone()

        if not doctor:

            raise HTTPException(
                status_code=404,
                detail="Doctor not found."
            )


        if not doctor["is_active"]:

            raise HTTPException(
                status_code=400,
                detail="Doctor is not active."
            )


        # -------------------------------------------------
        # GET CASE + CASE DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                mc.case_id,

                mc.doctor_id,

                mc.status,

                d.specialization AS case_specialization

            FROM medical_cases mc

            INNER JOIN doctors d
                ON mc.doctor_id = d.doctor_id

            WHERE mc.case_id = %s
            """,
            (case_id,)
        )

        case = cursor.fetchone()

        if not case:

            raise HTTPException(
                status_code=404,
                detail="Case not found."
            )


        # -------------------------------------------------
        # SPECIALIZATION SECURITY CHECK
        # -------------------------------------------------

        if (
            doctor["specialization"].strip().lower()
            !=
            case["case_specialization"].strip().lower()
        ):

            raise HTTPException(

                status_code=403,

                detail=(
                    "You cannot accept this case. "
                    "The case does not match your specialization."
                )

            )


        # -------------------------------------------------
        # CHECK CURRENT STATUS
        # -------------------------------------------------

        if case["status"] != "Pending":

            raise HTTPException(

                status_code=400,

                detail=(
                    "This case is no longer pending."
                )

            )


        # -------------------------------------------------
        # ASSIGN CASE TO DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            UPDATE medical_cases
            SET

                doctor_id = %s,

                status = 'Accepted',

                accepted_at = CURRENT_TIMESTAMP

            WHERE case_id = %s

            AND status = 'Pending'
            """,
            (
                doctor_id,
                case_id
            )
        )


        if cursor.rowcount == 0:

            connection.rollback()

            raise HTTPException(

                status_code=409,

                detail=(
                    "Case was already accepted "
                    "by another doctor."
                )

            )


        connection.commit()


        return {

            "message":
                "Case accepted successfully",

            "case_id":
                case_id,

            "doctor_id":
                doctor_id,

            "doctor":
                doctor["full_name"],

            "specialization":
                doctor["specialization"],

            "status":
                "Accepted"

        }

    except HTTPException:

        raise

    except Error as error:

        if connection:
            connection.rollback()

        print(
            "Accept case error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail="Unable to accept case."

        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# UPDATE CASE STATUS
# =====================================================

@app.put("/cases/{case_id}/status")
def update_case_status(

    case_id: int,

    doctor_id: int,

    status: str

):

    allowed_statuses = [

        "Accepted",

        "In Review",

        "Completed"

    ]


    if status not in allowed_statuses:

        raise HTTPException(

            status_code=400,

            detail="Invalid case status."

        )


    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # CHECK CASE BELONGS TO DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                case_id,
                doctor_id
            FROM medical_cases
            WHERE case_id = %s
            """,
            (case_id,)
        )

        case = cursor.fetchone()

        if not case:

            raise HTTPException(

                status_code=404,

                detail="Case not found."

            )


        if case["doctor_id"] != doctor_id:

            raise HTTPException(

                status_code=403,

                detail=(
                    "You are not authorized "
                    "to update this case."
                )

            )


        # -------------------------------------------------
        # UPDATE
        # -------------------------------------------------

        cursor.execute(
            """
            UPDATE medical_cases

            SET status = %s

            WHERE case_id = %s
            """,
            (
                status,
                case_id
            )
        )


        connection.commit()


        return {

            "message":
                "Case status updated successfully",

            "case_id":
                case_id,

            "status":
                status

        }

    except HTTPException:

        raise

    except Error as error:

        if connection:
            connection.rollback()

        print(
            "Status update error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail="Unable to update case status."

        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# ADD DOCTOR NOTES
# =====================================================

@app.post("/doctor-notes")
def create_doctor_note(

    note: DoctorNoteCreate

):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # -------------------------------------------------
        # CHECK DOCTOR
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                doctor_id,
                specialization
            FROM doctors
            WHERE doctor_id = %s
            """,
            (note.doctor_id,)
        )

        doctor = cursor.fetchone()

        if not doctor:

            raise HTTPException(

                status_code=404,

                detail="Doctor not found."

            )


        # -------------------------------------------------
        # CHECK CASE
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                case_id,

                doctor_id,

                status

            FROM medical_cases

            WHERE case_id = %s
            """,
            (note.case_id,)
        )

        case = cursor.fetchone()

        if not case:

            raise HTTPException(

                status_code=404,

                detail="Case not found."

            )


        # -------------------------------------------------
        # AUTHORIZATION
        # -------------------------------------------------

        if case["doctor_id"] != note.doctor_id:

            raise HTTPException(

                status_code=403,

                detail=(
                    "You can only add notes "
                    "to your accepted cases."
                )

            )


        # -------------------------------------------------
        # INSERT NOTE
        # -------------------------------------------------

        cursor.execute(
            """
            INSERT INTO doctor_notes
            (
                case_id,
                doctor_id,
                diagnosis,
                notes,
                prescription
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                note.case_id,

                note.doctor_id,

                note.diagnosis,

                note.notes,

                note.prescription
            )
        )


        connection.commit()

        note_id = cursor.lastrowid


        return {

            "message":
                "Doctor notes saved successfully",

            "note_id":
                note_id,

            "case_id":
                note.case_id,

            "doctor_id":
                note.doctor_id

        }

    except HTTPException:

        raise

    except Error as error:

        if connection:
            connection.rollback()

        print(
            "Doctor notes error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail="Unable to save doctor notes."

        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# GET NOTES FOR CASE
# =====================================================

@app.get("/cases/{case_id}/notes")
def get_case_notes(

    case_id: int

):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT

                dn.note_id,

                dn.case_id,

                dn.doctor_id,

                d.full_name AS doctor_name,

                d.specialization,

                dn.diagnosis,

                dn.notes,

                dn.prescription,

                dn.created_at,

                dn.updated_at

            FROM doctor_notes dn

            INNER JOIN doctors d
                ON dn.doctor_id = d.doctor_id

            WHERE dn.case_id = %s

            ORDER BY dn.created_at DESC
            """,
            (case_id,)
        )

        notes = cursor.fetchall()

        return notes

    except Error as error:

        print(
            "Get notes error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail="Unable to retrieve doctor notes."

        )

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =====================================================
# STARTUP MESSAGE
# =====================================================

@app.on_event("startup")
def startup_event():

    print(
        "======================================"
    )

    print(
        "PatientCare API Started"
    )

    print(
        "SIH26047"
    )

    print(
        "Database:",
        DB_CONFIG["database"]
    )

    print(
        "======================================"
    )