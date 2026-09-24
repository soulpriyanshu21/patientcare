-- =====================================================
-- PATIENTCARE DATABASE
-- SIH26047 - Patient Case Taking Software
-- =====================================================

CREATE DATABASE IF NOT EXISTS patientcare;

USE patientcare;


-- =====================================================
-- 1. DOCTORS
-- =====================================================

CREATE TABLE IF NOT EXISTS doctors (

    doctor_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    specialization VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE,

    phone VARCHAR(20),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =====================================================
-- 2. PATIENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS patients (

    patient_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    age INT NOT NULL,

    gender VARCHAR(20) NOT NULL,

    phone VARCHAR(20),

    email VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =====================================================
-- 3. MEDICAL CASES
-- =====================================================

CREATE TABLE IF NOT EXISTS medical_cases (

    case_id INT AUTO_INCREMENT PRIMARY KEY,

    patient_id INT NOT NULL,

    doctor_id INT NULL,

    main_complaint TEXT NOT NULL,

    symptoms TEXT,

    symptom_duration VARCHAR(100),

    severity ENUM(
        'mild',
        'moderate',
        'severe'
    ) DEFAULT 'moderate',

    existing_conditions TEXT,

    current_medications TEXT,

    allergies TEXT,

    past_medical_history TEXT,

    diet VARCHAR(50),

    sleep_hours VARCHAR(50),

    physical_activity VARCHAR(50),

    status ENUM(
        'Pending',
        'Accepted',
        'In Review',
        'Completed'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    accepted_at TIMESTAMP NULL,

    FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON DELETE SET NULL

);


-- =====================================================
-- 4. DOCTOR NOTES
-- =====================================================

CREATE TABLE IF NOT EXISTS doctor_notes (

    note_id INT AUTO_INCREMENT PRIMARY KEY,

    case_id INT NOT NULL,

    doctor_id INT NOT NULL,

    diagnosis TEXT,

    notes TEXT,

    prescription TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (case_id)
        REFERENCES medical_cases(case_id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
        ON DELETE CASCADE

);


-- =====================================================
-- INSERT DOCTORS
-- =====================================================

INSERT INTO doctors
    (full_name, specialization, email, phone)
VALUES

(
    'Dr. Priyanshu Modi',
    'General Medicine',
    'priyanshu.modi@patientcare.com',
    '9000000001'
),

(
    'Dr. Priyanshu Bartwal',
    'ENT',
    'priyanshu.bartwal@patientcare.com',
    '9000000002'
),

(
    'Dr. Shruti Sharma',
    'Gynaecology',
    'shruti.sharma@patientcare.com',
    '9000000003'
),

(
    'Dr. Shubh Dakshika',
    'Homeopathy',
    'shubh.dakshika@patientcare.com',
    '9000000004'
),

(
    'Dr. Sahil Bisht',
    'Pediatrics',
    'sahil.bisht@patientcare.com',
    '9000000005'
),

(
    'Dr. Varun Pujara',
    'Ophthalmology',
    'varun.pujara@patientcare.com',
    '9000000006'
);


-- =====================================================
-- CHECK DATABASE
-- =====================================================

SHOW TABLES;


-- =====================================================
-- CHECK DOCTORS
-- =====================================================

SELECT
    doctor_id,
    full_name,
    specialization
FROM doctors;