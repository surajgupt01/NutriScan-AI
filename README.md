# 🥗 Label Scan AI

AI-powered food label and ingredient analyzer that helps users understand packaged food products by scanning labels and receiving scientifically grounded insights.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue)
![Python](https://img.shields.io/badge/Python-3.11-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📸 Scan and analyze food labels
- 🧠 AI-powered ingredient interpretation
- ⚠️ Detect additives, preservatives, and emulsifiers
- 🥦 Explain nutritional impact of ingredients
- 💬 Context-aware AI chat for follow-up questions
- 📱 Responsive and mobile-friendly UI
- ⚡ Fast analysis with structured JSON responses

---

## 🚀 Demo

Add your deployed application link here:

```text
Frontend: https://github.com/surajgupt01/NutriScan-AI
Backend:  https://github.com/surajgupt01/PulseBackend
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- FastAPI
- Python
- Pydantic
- Uvicorn

### AI
- Google Gemini API
- Structured JSON Outputs

---

## 🏗️ Architecture

```text
User Uploads Image
        │
        ▼
 Next.js Frontend
        │
        ▼
 FastAPI Backend
        │
        ▼
 Gemini API
        │
        ▼
 Ingredient Analysis
        │
        ▼
 Interactive Chat UI
```

---

## 📂 Project Structure

```text
label-scan-ai/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── prompts/
│   └── main.py
│
└── README.md
```

---

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/surajgupt01/NutriScan-AI
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

## 🔑 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/analyze
```

### Backend (`.env`)

```env
HT_TOEKN=your_api_key
```

---

## 💡 How It Works

1. User uploads a food label image.
2. The image is processed by the backend.
3. Gemini analyzes ingredients and additives.
4. Structured JSON is generated.
5. The frontend renders interactive blocks.
6. Users can continue chatting with context.

---

## 📸 Screenshots

Add screenshots here:

```markdown
![Home](./screenshots/home.png)
![Scan](./screenshots/scan.png)
![Analysis](./screenshots/analysis.png)
```

---

## 🔮 Future Improvements

- [ ] Streaming responses
- [ ] User authentication
- [ ] Scan history
- [ ] Barcode scanner integration
- [ ] Personalized dietary recommendations
- [ ] Ingredient safety scoring
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

```bash
git checkout -b feature/my-feature
git commit -m "Add new feature"
git push origin feature/my-feature
```

Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Suraj Gupta**

- GitHub: https://github.com/your-github-username
- LinkedIn: https://linkedin.com/in/your-linkedin-profile

If you found this project useful, please give it a ⭐ on GitHub!
