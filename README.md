# 📊 Data Analyst Portfolio — Ilham Hafizt

Welcome to my portfolio project!  
This website showcases my work, skills, and projects as a **Data Analyst**, including data processing, analysis, and backend integration using Python and SQL Server.

---

## 🚀 About This Project

This portfolio is not just a static website — it integrates:

- 📈 Data handling using Python (Flask)
- 🗄️ Database management with SQL Server
- 🔗 API integration for real-time data submission
- 🌐 Frontend visualization using HTML, CSS, JavaScript

The contact form is connected to a database, simulating a real-world data collection system.

---

## 🧠 Skills Highlighted

- **Data Analysis**: Python (basic processing logic, Pandas)
- **Database**: SQL Server (query)
- **Backend**: Flask API development
- **Data Collection**: Form → API → Database pipeline
- **Tools**: SSMS, VS Code, GitHub

---

## 📂 Project Structure
portfolio-data-analyst/
│
├── index.html              # Frontend UI
├── css/
│   └── style.css           # Styling
├── js/
│   └── script.js           # API integration
├── assets/                 # Images & assets
│
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── setup_database.sql      # Database setup
├── .gitignore              # Ignored files
└── README.md               # Project documentation

## ⚙️ How It Works (Data Flow)

1. User submits contact form  
2. Data sent via API (Flask)  
3. Backend processes & validates data  
4. Data stored in SQL Server  
5. Data can be retrieved via API  

➡️ This simulates a **real data pipeline (collection → storage → access)**

---

## 🛠️ Setup Instructions

## Setup Database

Run `setup_database.sql` in SQL Server (SSMS)

This will create:
- Database: `portfolio_db`
- Table: `pesan_kontak`

---

## ⚙️ Configure Environment

Create a `.env` file in the root directory and add the following configuration:

DB_AUTH_MODE=sql  
DB_DRIVER=ODBC Driver 17 for SQL Server  
DB_SERVER=localhost\SQLEXPRESS  
DB_NAME=portfolio_db  
DB_USER=sa  
DB_PASSWORD=your_password  

⚠️ Important: Do not upload `.env` to GitHub. Make sure it is included in `.gitignore`.

---

## 📦 Install Dependencies

Run the following command to install all required Python libraries:

```bash
pip install -r requirements.txt
```

---

## 🚀 Run Backend
```bash
python app.py
```

---

## 🌐 Run Frontend
Open index.html using Live Server (recommended in VS Code) or open it directly in your browser.


