# User Registration Application

This is a full-stack User Registration web application developed as part of an internship assignment.  
The application allows users to submit their registration details along with an image, and provides an admin dashboard to review all submissions.

---

## Live Application

https://user-registration-app-nine.vercel.app/


---

## Features

### User Registration Interface
- Users can submit the following details:
  - Name (required)
  - Location (City / State)
  - Description
  - Image upload (JPG / PNG)
- Images are uploaded and stored using Cloudinary
- The form includes validation, loading state, and success or error messages

### Admin Dashboard Interface
- Displays all user submissions
- Shows:
  - User name
  - Description
  - Location
  - Uploaded image thumbnail
  - Submission date
- Confirms that the database connection is active
- Data is retrieved from Firebase Firestore

---

## Technology Stack

Frontend:
- React.js
- Tailwind CSS
- Vite

Cloud and Backend Services:
- Google Firebase Firestore (database)
- Cloudinary (image storage)
- Vercel (hosting)
------
## Project Structure

<img width="556" height="857" alt="image" src="https://github.com/user-attachments/assets/6d170c46-a7f9-4198-9f6d-afce7e72be01" />

<img width="1917" height="1016" alt="image" src="https://github.com/user-attachments/assets/57770aa6-a65c-4c1d-9fe6-e113693c2c1d" />


<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/919b51f4-f45c-49f6-98ac-8af15718bf50" />

<img width="1782" height="930" alt="image" src="https://github.com/user-attachments/assets/94737e80-6b79-4979-8d26-d50f9ed7bafb" />

<img width="1824" height="795" alt="image" src="https://github.com/user-attachments/assets/a587a722-e514-492c-b2e4-a3e86d7457f4" />



---

## How to Run the Project Locally

### Step 1: Clone the Repository
```bash
git clone https://github.com/pooja3122005/User_Registration_app.git
cd user-registration-app
Step 2: Install Dependencies
npm install
This will automatically create the node_modules folder.

Step 3: Configure Environment Variables
Create a .env file in the project root directory and add the following values:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
All environment variables must start with VITE_ when using Vite.

Step 4: Run the Application
npm run dev
The application will run at:

http://localhost:5173
Admin Dashboard:

http://localhost:5173/admin
Deployment
The frontend is deployed using Vercel.
Firebase Firestore and Cloudinary are cloud-hosted services, so no separate backend server deployment is required.
Environment variables are securely configured in Vercel.

Implementation Notes
Images are stored in Cloudinary instead of the database to keep the database lightweight

Firebase Firestore is used for scalable and real-time data storage

Tailwind CSS is used for fast and responsive UI development

Vite is used for faster build and development performance

Author
Pooja Umanath
GitHub: https://github.com/pooja3122005

License
This project is developed for educational and internship evaluation purposes.
