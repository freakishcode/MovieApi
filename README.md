# 🎬 MovieApi — React Movie Trailer App

A modern movie trailer web app built with **React**, **Material UI**, and **React Query**. It fetches movie data from [TMDB](https://www.themoviedb.org/) and supports user authentication via a PHP backend (with MySQL + JWT). Features include search, pagination, theming, and video previews.

---

## 🚀 Features

- 🔍 **Search** for movies by title
- 🎞️ **Watch trailers** (YouTube embed)
- 📄 **Movie details**: overview, release date, poster
- 🗂️ **Grid/List view toggle**
- ⏩ **Pagination** (up to 500 pages)
- 🌗 **Light/Dark theme** (context-based)
- 👤 **User authentication** (register/login/logout)
- 📝 **Profile page** (JWT-based)
- 📦 **File upload** demo
- ⚡ **Fast data fetching** with React Query
- 🛠️ **PHP/MySQL backend** for user management

---

## 📦 Project Structure

```
movie-api/
├── public/                  # Public files
│   ├── index.html           # Main HTML file
│   └── favicon.ico          # Favicon
├── src/                     # Source files
│   ├── api/                 # API calls and configurations
│   ├── assets/              # Images, fonts, and other assets
│   ├── components/          # Reusable components
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   ├── styles/              # Global styles and theme
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # NPM dependencies and scripts
└── README.md                # Project documentation
```

---

## 🚧 Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/movie-api.git
   ```

2. **Install dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your configuration:

   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

4. **Start the development server**

   Run the following command:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI documentation](https://mui.com/getting-started/installation/)
- [React Query documentation](https://react-query.tanstack.com/overview)
- [TMDB API documentation](https://developers.themoviedb.org/3/getting-started/introduction)
- [PHP documentation](https://www.php.net/manual/en/index.php)
- [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name** - [yourusername](https://github.com/yourusername)

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

---

## 📄 Acknowledgements

- [Create React App](https://github.com/facebook/create-react-app) - Bootstrapping the project
- [TMDB](https://www.themoviedb.org/) - Movie data API
- [React Query](https://react-query.tanstack.com/) - Data fetching and state management
- [Material UI](https://mui.com/) - React components for faster and easier web development
- [PHP](https://www.php.net/) - Server-side scripting language
- [MySQL](https://www.mysql.com/) - Database management system
