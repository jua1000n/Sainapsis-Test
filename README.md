The project requires Python 3.12.6 or higher and Django 5.1.3 or higher. To run the project, you need to set up your environment by installing the required packages listed in the requirements.txt file. You can install them using the command:

    ```
    pip install -r requirements.txt

After that, run the command:

    ```
    python manage.py migrate

This will initialize the default tables created by Django. Then, execute:

    ```
    python manage.py runserver

to start the service. By default, it will be available at http://127.0.0.1:8000/.