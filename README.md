# Let's Chat App
# Build Week
## Introduction
Let's Chat is a real-time messaging web application built using React JS and Firebase. Users can register, login, chat with other users, create group chats. The app offers a smooth, clean UI with a light/dark theme toggle for user comfort.

## Project Type
Frontend | Backend (Firebase)

## Deployed App
Frontend: https://chats09.netlify.app/
Backend: Powered by Firebase  
Database: Firebase Firestore

## Directory Structure
Chat-app/
|--src/
   |--components
       |--All components files
   |--context
       |--All context files
   |--css
   |--firebase
   |--pages
       |--All jsx pages
   |--routes
   |--App.jsx 
   |--main.jsx 
|--inde.html

## Video Walkthrough of the project
https://youtu.be/i79-qGWCPHQ

## Features
- User Authentication (Sign up, Log in, Log out)
- Create,edit Profile
- One to One chat
- Real-time Chat using Firestore
- View once message feature
- Crete Group chat
- Responsive and clean UI with consistent color palette

## Design Decisions or Assumptions
- Used Firebase for backend to simplify hosting, auth, and database integration
- Chose plain React for quick and easy UI setup without extra framework overhead
- Used normalized Firestore structure for chats and group for scalability
- Prioritized minimalism in UI design to keep focus on core chat feature

## Installation & Getting Started
- To run locally, you can clone git repository
  -cd to folder
- Install dependencies: npm install
- Run app: npm run dev
- To configure Firebase:
   Create a Firebase project
   Enable Firestore and Authentication (Email/Password)
   Create Firestore Database
   Replace config in firebase-config.js with your project credentials

## Usage
- Sign UP with Name, Email and Passowrd & Authenticate for Log In
- After log in you can access the Dasboard 
![image](https://github.com/user-attachments/assets/999181be-0d39-46ff-8f76-a3db0ccc3326)
- Start Conversation with new people
- Send and receive real-time messages with read indicators and timestamps.
- You can Create Group
  ![image](https://github.com/user-attachments/assets/4d851e71-6b41-48d0-9c79-396fa6d3f38d)
- You Can Edit your own profile by click on edit.
- You Can sign out by clicking on Logout button in footer.

## Credentials
Email: d@u.com
Password: 123456

## APIs Used
Firebase Firestore for Backend Purpose
Firebase Auth for Authentication

## API Endpoints
Firebase Authentication methods:
 - createUserWithEmailAndPassword() – Registers a new user using email and password credentials.
 - signInWithEmailAndPassword() – Signs in an existing user with email and password.
 - onAuthStateChanged() – Listens for changes in the user’s authentication state (e.g., login/logout).
 - signOut() – Logs out the currently signed-in user.
Firebase Firestore methods:
 - setDoc() – Creates or replaces a document with a specific ID in a collection.
 - doc() – References a specific document inside a Firestore collection.
 - getDoc() – Retrieves a single document by its reference.
 - updateDoc() – Updates one or more fields in an existing document.
 - addDoc() – Adds a new document with an auto-generated ID to a Firestore collection.
 - collection() – Gets a reference to a Firestore collection.
 - query() – Builds a query with filters to retrieve specific documents from a collection.
 - where() – Adds a conditional filter to a Firestore query (e.g., where "username" == "rohit").
 - getDocs() – Retrieves all documents that match a query or are in a collection.
 - deleteDoc() – Permanently deletes a document from Firestore.
 - arrayUnion() – Adds an item to an array field in Firestore without duplicating existing values.

## Technology Stack
- React JS, HTML, CSS, Javascript
- Firebase (Auth, Firestore)
- Git & GitHub for version control
- Netlify for hosting 
