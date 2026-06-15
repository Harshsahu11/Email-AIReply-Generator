# AI Email Reply Generator 🚀

An AI-powered Email Reply Generator built using **Spring Boot**, **React**, **Material UI**, and **Gemini API**.
This application helps users instantly generate professional email replies with different tones like Professional, Friendly, Polite, Formal, and Casual.

---

# ✨ Features

* Generate AI-powered email replies
* Multiple tone options

  * Professional
  * Friendly
  * Polite
  * Formal
  * Casual
* Copy generated reply to clipboard
* Modern responsive UI using Material UI
* Spring Boot REST API backend
* Gemini API integration
* Fast and lightweight architecture

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Material UI (MUI)
* Axios

## Backend

* Spring Boot
* Java
* REST API
* WebClient

## AI

* Google Gemini API

---

# 📂 Project Structure

```bash
AI-Email-Reply-Generator/
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup (Spring Boot)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/AI-Email-Reply-Generator.git
```

---

## 2️⃣ Navigate to Backend

```bash
cd backend
```

---

## 3️⃣ Configure Environment Variables

Create an `.env` file or configure environment variables:

```properties
GEMINI_URL=YOUR_GEMINI_API_URL
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 4️⃣ Configure `application.properties`

```properties
spring.application.name=email-writer

gemini.api.url=${GEMINI_URL}
gemini.api.key=${GEMINI_API_KEY}
```

---

## 5️⃣ Install Dependencies

```bash
mvn clean install
```

---

## 6️⃣ Run Spring Boot Application

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🌐 Frontend Setup (React)

## 1️⃣ Navigate to Frontend

```bash
cd frontend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Install Additional Packages

```bash
npm install axios @mui/material @emotion/react @emotion/styled
```

---

## 4️⃣ Start React App

```bash
npm run dev
```

or

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:5173
```

or

```bash
http://localhost:3000
```

---

# 🔌 API Endpoint

## Generate Email Reply

### POST Request

```http
POST /api/email/generate
```

---

## Request Body

```json
{
  "emailContent": "Can we schedule a meeting tomorrow?",
  "tone": "Professional"
}
```

---

## Response

```text
Dear Sir/Madam,

Thank you for your email. I would be happy to schedule a meeting tomorrow.

Best regards,
John
```

---

# 🧠 Supported Tones

| Tone         | Description                        |
| ------------ | ---------------------------------- |
| Professional | Corporate and formal communication |
| Friendly     | Casual and warm tone               |
| Polite       | Respectful and courteous           |
| Formal       | Strict business communication      |
| Casual       | Relaxed and conversational         |

---

# 🎨 UI Features

* Responsive design
* Material UI components
* Loading spinner while generating reply
* Copy-to-clipboard functionality
* Snackbar notifications
* Modern card layout

---

# 🔐 Environment Variables

## Backend

| Variable       | Description         |
| -------------- | ------------------- |
| GEMINI_API_KEY | Gemini API key      |
| GEMINI_URL     | Gemini API endpoint |

---

# 🚀 Future Improvements

* Authentication system
* Email sending integration
* Email history
* Dark mode
* Export reply as PDF
* Browser extension support
* Multi-language support

---

# 🧪 Testing

## Backend Test

Use Postman or Thunder Client:

```http
POST http://localhost:8080/api/email/generate
```
---

# 🔥 Example Workflow

1. User pastes original email
2. User selects tone
3. Frontend sends request to Spring Boot API
4. Backend calls Gemini API
5. AI generates reply
6. Frontend displays generated response
7. User copies reply instantly

---

# 👨‍💻 Author

## Harsh Sahu

Software Developer passionate about:

* Full Stack Development
* Spring Boot
* React
* AI Integrations
* System Design

