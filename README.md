User Directory Dashboard

A simple and clean React application that displays a list of users with search, sorting, and detailed views. The data is fetched from a public API and presented in an easy-to-use interface.

---

🔧 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- React Router
- CSS (custom styling)

---

📌 Features

- View users in a structured table layout
- Search users by name or email (case-insensitive)
- Sort users by name or company (ascending/descending)
- Click on a user to view detailed information
- Highlight matching search results
- Responsive and clean UI
- Keyboard-accessible navigation
- Loading and error handling states

---

🚀 Getting Started

Clone the repository:

git clone https://github.com/YOUR_USERNAME/user-dashboard.git
cd user-dashboard

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:5173

---

📁 Project Structure

src/
  components/   → reusable UI components  
  pages/        → main screens (Dashboard, User Detail)  
  services/     → API calls  
  App.jsx       → routes setup  
  main.jsx      → app entry point  

---

🌐 API Used

Data is fetched from:

https://jsonplaceholder.typicode.com/users

---

⚙️ Build for Production

npm run build
npm run preview

---

📖 Notes

- Search is debounced for better performance
- Sorting does not mutate original data
- Safe checks are used for optional fields
- Data is client-side only (no backend integration)

---

🔗 Live Demo

(Add your Render deployment link here)

---

✍️ Author

Pavan Katari