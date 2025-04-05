# Project Setup Guide

## Prerequisites

Make sure the following are installed on your system:

- **Node.js**
- **Python**
- **XAMPP**
- **Virtualenv** (Python Library)

---

## Steps to Run the Project

### I. Database Setup

1. Open **XAMPP** and start **Apache** and **MySQL**.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Create a new database named:

   ```
   mpsajmer
   ```

4. Import the SQL file provided in the project folder into this database.

---

### II. Start the Node.js Server

Open a terminal in the project folder and run:

```bash
npm i
npm run start
```

---

### III. Run the Python Server

Open a **new terminal** in the same project folder and execute the following commands:

1. Create a virtual environment (replace `nenv` with your preferred name):

   ```bash
   virtualenv nenv
   ```

2. Activate the virtual environment:

   ```powershell
   .\nenv\Scripts\activate.ps1
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Django server:

   ```bash
   python manage.py runserver
   ```

---

## Done!

Now both the Node.js and Python (Django) servers should be running. Visit the appropriate URL (typically `http://127.0.0.1:8000/` for Django) to view the project.

