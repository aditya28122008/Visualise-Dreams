Make Sure NodeJS, Python, Xampp and Virtualenv(Python Library) are Installed
Steps:
    I) Create a new Database 'mpsajmer' in XAMPP's PHPMYADMIN
    II) Import the SQL file associated in the folder.

    III) Run the following commands in the project folder using terminal:
        1) npm i
        2) npm run start

    IV) Open a New terminal in the same folder and run the following command to view the output:
        1) virtualenv nenv - To Create A New Virtual Environment Accordin To Your PC. Replace 'nenv' with the name you want to give to your virtual environment 
        2) .\( Name Of Your Virtual Environment )\Scripts\activate.ps1 
        3) pip install -r requirements.txt
        4) python manage.py runserver