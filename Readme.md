# 🏠 HomeAway

A full-stack vacation rental listing platform inspired by Airbnb, built with Node.js, Express, and MongoDB.

🌐 **Live Demo:** [homeaway-rwac.onrender.com](https://homeaway-rwac.onrender.com)

---

## ✨ Features

- Browse vacation rental listings from around the world
- User authentication (signup, login, logout)
- Create, edit, and delete your own listings
- Upload listing images via Cloudinary
- Leave and delete reviews with star ratings
- Interactive map for each listing using Mapbox
- Session-based authentication with Passport.js
- Flash messages for user feedback
- Responsive UI with EJS templates

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | Passport.js, passport-local-mongoose |
| File Uploads | Multer, Cloudinary |
| Maps | Mapbox SDK |
| Templating | EJS, EJS-Mate |
| Session Store | connect-mongo |
| Validation | Joi |
| Deployment | Render |

---

## 📁 Project Structure

```
HomeAway/
├── controllers/        # Route handler logic
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── listings/
│   └── users/
├── public/             # Static assets (CSS, JS)
├── utils/              # Helper utilities
│   ├── ExpressError.js
│   └── warpAsync.js
├── init/               # Database seed data
│   ├── data.js
│   └── index.js
├── app.js              # Main app entry point
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/karnicksingh/HomeAway.git
cd HomeAway
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** in the root directory
```env
ATLASTDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
MAP_TOKEN=your_mapbox_access_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

4. **Seed the database** (optional)
```bash
node init/index.js
```

5. **Start the server**
```bash
node app.js
```

6. **Visit** `http://localhost:8080`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `ATLASTDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session secret key |
| `MAP_TOKEN` | Mapbox public access token |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `NODE_ENV` | Set to `production` on deployment |

---

## 📦 Deployment

This app is deployed on **Render**. To deploy your own instance:

1. Push your code to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Connect your GitHub repository
4. Set all environment variables in the Render dashboard
5. Set `NODE_VERSION` to `18.19.0` in environment variables
6. Use `node app.js` as the start command

---

## 🙏 Acknowledgements

- [Unsplash](https://unsplash.com) for listing images
- [Mapbox](https://mapbox.com) for maps
- [Cloudinary](https://cloudinary.com) for image hosting
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Render](https://render.com) for deployment
