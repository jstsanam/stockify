# Stockify 📈
A seamless, user-friendly frontend interface for Stockify, enabling users to interact with real-time stock data, manage portfolios, and track transactions effortlessly.

## 📋 <a name="table">Table of Contents</a>
1. 📝 [About the Project](#about)
2. 🔥 [Features](#features)
3. 🛠️ [Tech Stack](#tech-stack)
4. 📁 [Project Structure](#project-structure)
5. ⚙️ [Installation](#installation)
6. 🌍 [Environment Variables](#envs)
7. ✨ [Pages](#pages)
8. 📩 [Contact](#contact)

## <a name="about">About the Project 📝</a>
Stockify - Frontend is the interactive dashboard that powers the Stockify platform, allowing users to track stock prices, manage portfolios, and interact with real-time stock market data.
- **Sign Up & Log In:** Easy user registration and login process with JWT-based authentication.
- **User Profile:** Personalize your profile, update your name, email, and gender.
- **Dashboard:** View live stock data, your watchlist, and recent stock transactions.
- **Stock Details:** Detailed stock data page with live fluctuating prices and stock-specific notifications.
- **Real-Time Updates:** Stock transactions and notifications via Socket.IO for real-time updates.

## <a name="features">Features 🔥</a>
- **User Authentication:** JWT-based login/signup for secure access.
- **User Profile:** Edit and update personal information (name, email, gender).
- **Dashboard:** Real-time stock market data and live price fluctuations.
- **Watchlist:** Add stocks to a user-specific watchlist for easy tracking.
- **Stock Detail Page:** Detailed live data for each stock with fluctuating prices.
- **Transaction History:** View and filter transactions on the user profile page.
- **Real-Time Notifications:** Get live updates of transactions made by other users on the stock you're watching.
- **Search & Filters:** Filter transactions by date and other criteria.
- **Responsive Design:** Mobile-friendly layout ensuring a smooth user experience across devices.

## <a name="tech-stack">Tech Stack 🛠️</a>
- **Frontend:** React.js, TypeScript and Redux Toolkit
- **Real-time Communication:** Socket.IO
- **State Management:** Redux for state management
- **Routing:** React Router for navigation
- **Authentication:** JWT (JSON Web Token)
- **API Integration:** Fetching data from Stockify backend APIs (https://github.com/jstsanam/stockify-backend)
- **Styling:** Custom CSS with SCSS for better maintainability

## <a name="project-structure">Project Structure 📁</a>
```bash
/src
  /components        → Reusable UI components
  /constants         → Application constants 
  /interceptors      → Intercepting HTTP requests/responses for error handling, logging, and adding authorization headers
  /store             → Redux store for state management
```

## <a name="installation">Installation ⚙️</a>
1. Clone the repository:
```bash
git clone https://github.com/jstsanam/stockify.git
```
2. Navigate to the project directory:
```bash
cd stockify
```
3. Install dependencies:
```bash
npm install
```
4. Run the application:
```bash
npm start
```

## <a name="envs">Environment Variables 🌍</a>
| Variable Name           | Description                                      | Example Value         |
|-------------------------|--------------------------------------------------|-----------------------|
| REACT_APP_API_BASE_URL  | The URL for the backend API                      | http://localhost:5000 |

## <a name="pages">Pages ✨</a>
### 1. Authentication (Sign Up / Sign In)
- **Sign Up:** Users can create a new account by providing necessary details (name, email, password, and gender).
- **Sign In:** Registered users can log in with their credentials to access the dashboard.
### 2. Dashboard
- **Stock Data:** Displays a list of all available stocks.
- **Watchlist:** Users can add or remove stocks from their personal watchlist.
### 3. Stock Detail Page
- **Live Data:** Displays real-time fluctuating stock prices.
- **History Tab:** Shows the user’s transaction history related to that specific stock.
- **Notifications:** Using Socket.IO, users receive notifications for any stock transactions made by other users in real-time. These notifications are specific to the stocks that the user is following.
### 4. User Profile
- **Edit Profile:** Users can update their personal information (name, email, gender).
- **Logout:** Users can log out from the app by clicking the logout button at the top-right corner.
### 5. All Transactions Page
- **Filters:** Users can filter transactions by date and other criteria.
- **Search:** Transaction search functionality to find specific transactions.

## <a name="contact">Contact 📩</a>
Sanam Yadav - [jstsanam@gmail.com](mailto:jstsanam@gmail.com)  
GitHub: [jstsanam](https://github.com/jstsanam)
