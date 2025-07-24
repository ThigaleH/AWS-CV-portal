
-- =====================================================
-- Table: Users
-- Description: Stores system users and their roles
-- =====================================================
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Admin', 'Recruiter', 'Viewer')),
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON Users(email);


-- =====================================================
-- Table: Candidates
-- Description: Stores candidate profile information
-- =====================================================
CREATE TABLE Candidates (
    candidate_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    location VARCHAR(100),
    summary TEXT
);

CREATE INDEX idx_candidates_location ON Candidates(location);


-- =====================================================
-- Table: CV_Files
-- Description: Uploaded CV files and metadata
-- =====================================================
CREATE TABLE CV_Files (
    cv_id SERIAL PRIMARY KEY,
    candidate_id INT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_cv_candidate ON CV_Files(candidate_id);


-- =====================================================
-- Table: Skills
-- Description: Master table for technical and soft skills
-- =====================================================
CREATE TABLE Skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50)
);

CREATE INDEX idx_skills_name ON Skills(skill_name);


-- =====================================================
-- Table: Candidate_Skills
-- Description: Mapping between candidates and their skills
-- =====================================================
CREATE TABLE Candidate_Skills (
    candidate_id INT NOT NULL,
    skill_id INT NOT NULL,
    confidence_score DECIMAL(5,2) CHECK (confidence_score >= 0.00 AND confidence_score <= 1.00),

    PRIMARY KEY (candidate_id, skill_id),
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);


-- =====================================================
-- Table: Jobs
-- Description: Job postings added by recruiters
-- =====================================================
CREATE TABLE Jobs (
    job_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    required_skills TEXT,
    posted_by INT NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (posted_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_jobs_location ON Jobs(location);


-- =====================================================
-- Table: Audit_Logs
-- Description: Tracks user actions for auditing purposes
-- =====================================================
CREATE TABLE Audit_Logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,

    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_logs_user ON Audit_Logs(user_id);
