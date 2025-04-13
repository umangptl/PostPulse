# 🌀 PostPulse — AI-Powered Social Media Post Generator

Welcome to **PostPulse** — your free, AI-powered social media post generator built with **Python FastAPI**, **Gemini 2.0 Flash API**, and a clean HTML/JS frontend. 🚀

PostPulse helps you:
- 📝 Generate engaging social media posts in seconds
- 🎨 Customize tone, length, hashtags, and emojis
- ⚡ Get multiple unique posts at once
- 🧩 Easily integrate and extend for your projects

---

## 🚀 Features

- ✅ FastAPI backend with Google Gemini Pro API
- ✅ Customizable prompts: tone, word count, hashtags, emoji toggle
- ✅ Clean frontend built with vanilla JS & HTML
- ✅ One-click "Generate" and "Clear Results" functionality
- ✅ Instant social media post ideas for multiple platforms

---

## 📂 Project Structure

```
.
├── main.py              # FastAPI main app
├── .env                 # Environment variables (API keys)
├── .gitignore           # Git ignore file
├── README.md            # Project readme (this file)
├── static/              # Static frontend files
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   └── img/             # Icons/images
└── venv/                # (virtual environment - gitignored)
```

---

## ⚙️ Setup & Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/postpulse.git
cd postpulse
```

### 2. Create and activate a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Add your Gemini API Key  
Create a `.env` file in the root and add:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Run the FastAPI server
```bash
uvicorn app:app --reload
```

### 6. Open your browser
Go to: [http://localhost:8000](http://localhost:8000)

Enjoy! 🎉

---

## 🛠️ Tech Stack

- **Backend:** FastAPI + Uvicorn
- **AI Model:** Google Gemini Pro
- **Frontend:** HTML, CSS, Vanilla JS
- **Environment:** Python 3.x

---

## 🧩 TODO / Future Improvements
- [ ] Heart emoji button to allow the user to add posts to the "favorites list prompt".
- [ ] Copy to clipboard button for posts
- [ ] Export generated posts to `.txt` or `.csv`
- [ ] Support more post types and templates
- [ ] Add unit tests for API and parsing

