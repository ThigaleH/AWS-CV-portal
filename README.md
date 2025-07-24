
---

## Features Implemented

### Recruiter Functions
- Upload CVs (PDF/DOCX/TXT)
- View parsed candidate info (skills, education, experience)
- Search & filter by skills, experience, and location
- Match candidates to jobs with scoring
- Candidate CRUD operations
- Candidate analytics & reporting

### Admin Functions
- User management & permissions
- Skill categories/job templates
- System metrics & error logs

### Non-Functional Goals
- 100 concurrent users
- CV upload in < 30 seconds
- 99.9% uptime SLA
- GDPR-compliant, secure architecture
- MFA, RBAC, and encryption included

---

## Tech Stack

| Layer        | Technology Used                          |
|--------------|-------------------------------------------|
| Frontend     | ReactJS (with Bootstrap)     |
| Backend      | Python Flask, Bcrypt, JWT                 |
| Database     | MySQL                                     |
| Storage      | Amazon S3                                 |
| Authentication | JWT, TOTP (MFA), Rate Limiting         |
| Cloud        | AWS (S3, RDS, Lambda, Cognito, CloudWatch)|
| DevOps       | GitHub                                   |

---

## AWS Solution Architecture

Located in `/architecture/aws_architecture_diagram.png`.

- **UI Layer:** React frontend hosted on Amazon S3 with CloudFront
- **Application Layer:** Flask backend API hosted on AWS Lambda with API Gateway
- **Processing Layer:** AWS Textract for CV parsing, Lambda for transformation
- **Database Layer:** Amazon RDS (MySQL) + Amazon S3 for file storage
- **Security Layer:** Cognito (Auth), IAM, KMS, WAF, SSL, JWT, MFA
- **Monitoring Layer:** CloudWatch Logs, X-Ray, AWS Config

---

## Database Design

- Fully normalized to 3NF
- Foreign keys and indexing for optimization
- `schema.sql` located in `/database/`
- ER diagram in `database/er_diagram.png`

Entities:
- Users
- Candidates
- CV Files
- Skills
- Jobs
- Audit Logs

---

## Login Page & Security

### Frontend Features (React)
- Responsive mobile/desktop UI
- Form validation with password strength meter
- "Remember Me" option
- Forgot password flow
- WCAG 2.1 accessibility

### Backend Security (Flask)
- Input sanitization
- Bcrypt password hashing + Regex policy
- CSRF protection using Flask-WTF
- JWT token authentication
- MFA with OTP (simulated)
- Rate limiting + Account lockout logic

---

 1. Run Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
# Frontend runs on: http://localhost:3000

2.Run Backend (Flask)
bash
Copy
Edit
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# Backend runs on: http://localhost:5000

