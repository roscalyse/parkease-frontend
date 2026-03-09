# parkease-frontend
## Project Description

ParkEase Frontend is the initial interface of a parking management system.
It currently implements a login system with role-based redirection and a basic registration page layout.

This project focuses on frontend structure, routing logic, and UI organization using HTML, CSS, and JavaScript.

## Pages

1. index.html (Login Page) – Allows users to log in and redirects them to the dashboard or reports page.

2. dashboard.html – Main dashboard page after successful login for the attendants.

3. register.html – Registration page for parking checkin, also caters for  registration of vehicles and customers.

4. signout.html - For checking out of already parked vehicles and generating receipts

4. Reports.html for the admin to download reports and view statistics

## How to Run

1. Clone the repository: git clone https://github.com/roscalyse/parkease-frontend

2. Open index.html in your browser.

3. (No server required — runs directly in the browser.)

4. login with:

| Username            | Password    | Role         |
|---------------------|-------------|---------------|
| admin               | admin123    | Admin         |
| userpass            | userpass    |Attendant      |
| user2               | password123 | Attendant     |

## Features Implemented

1. Login page with role-based redirect
   Users log in using their credentials. Based on the user role, they are redirected to the appropriate dashboard (Admin or Attendant).

2. Attendant Dashboard
   Displays parking management features including vehicle registration and current parking records.

3. Vehicle Registration with Form Validation
    Allows attendants to register vehicles entering the parking area. Input fields are validated before submission. newly rregister customers and vehicles are automatically populated in the dropdowns of the registered vehicle form

4. Sign-out Page with Fee Calculation
   Calculates the parking fee automatically based on the vehicle’s entry time and exit time. the system uses arrays prefilled with data to enable the search for vehicle to signout more interactive

5. Admin Reports Page with Table Filtering
   Admin users can view parking records in a table and filter/search records for easier management.

## Validation Rules Applied

The following validation rules were implemented to ensure correct user input:

- Required Fields Validation
  All important form fields must be filled before submission.

- Email Validation
  Email addresses must follow a valid email format.

- Password Validation
  Password must meet minimum length requirements.

- Vehicle Plate Number Validation
  Vehicle plate numbers must follow a defined format (uppercase letters and numbers).

- Form Error Messages
  Users are notified when invalid input is entered.

## Known Issues / Assumptions

- Data persistence is handled using arrays

- The system uses user roles that are predefined (Admin and Attendant) in a json file.

- Fee calculation uses a simple hourly rate assumption.

The project is designed for demonstration purposes, so advanced security features (authentication encryption, database storage) are not implemented.

 ## Author: NAMUKASA PROSCOVIA Refactory-CSE 2026