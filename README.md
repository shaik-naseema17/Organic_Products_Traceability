# 🌿 Organic Products Traceability System (MERN Stack)

A blockchain-inspired system for tracing the authenticity of organic vegetables from farm to consumer using the MERN stack (MongoDB, Express, React, Node.js).

---

## 🧩 Tech Stack

| Component      | Technology Used      |
|----------------|----------------------|
| 🎨 Frontend     | React.js             |
| 🧠 Backend      | Node.js + Express    |
| 🗄️ Database     | MongoDB              |
| 🔐 Auth         | JWT Authentication   |
| 🔗 Hashing      | SHA-256 (block hash) |
| 📸 QR Code      | QR Generation & Scan |

---

## ❗ Problem Statement

Consumers lack trust in the organic label due to no verifiable proof of a product's journey from farm to shelf.

---

## ✅ Solution Overview

A traceability platform where each role (Farmer → Distributor → Retailer → Customer) contributes a **block** to the chain:

- 👤 Role
- 📄 Data (Product info)
- ⏱️ Timestamp
- 🔁 Previous Hash
- 🔐 Current Hash (SHA-256)

If any data is altered, the chain breaks, and the product is marked **❌ Not Organic**.

---

## 👥 User Roles & Flow

| Role        | Actions                                                                 |
|-------------|-------------------------------------------------------------------------|
| 🧑‍🌾 Farmer     | Register → Login → Add Vegetables → 🧱 Create Initial Block             |
| 🚚 Distributor | Register → Login → Add Ingredients → 🔗 Link to Farmer’s Block          |
| 🛍️ Retailer    | Register → Login → Generate QR Code → Mark as Sold → 🔗 Link to Block |
| 👤 Customer    | Register → Login → Scan/View QR → Trace History → Purchase             |

---

## 🧱 Blockchain Logic

Each block includes:
- 👤 Role
- 📄 Data
- ⏱️ Timestamp
- 🔁 Previous Hash
- 🔐 Current Hash = `SHA256(Role + Data + Timestamp + PreviousHash)`

🔗 All blocks are linked; tampering invalidates the chain.

---

## 🚀 MVP Features

- ✅ Role-based user authentication (JWT)
- 🧑‍🌾 Add Vegetables (Farmer)
- 🚚 Add Ingredients (Distributor)
- 🛍️ Generate QR & Mark Sold (Retailer)
- 👨‍👩‍👧‍👦 Scan/View Product History (Customer)
- ⛓️ Blockchain Engine with SHA-256 Hashing
- 🔍 Blockchain Viewer by Vegetable ID

---

## 🖼️ Screenshots

### 🧑‍🌾 Add Vegetables  
![Add Vegetables](https://github.com/user-attachments/assets/1bd05bee-fb2c-4eb9-bc9a-5f0ea6c43c5f)

### 🚚 Add Ingredients  
![Add Ingredients](https://github.com/user-attachments/assets/ec937039-a807-4460-8028-235f7b894dd3)

### 🛍️ Vegetables & Ingredients Page  
![Vegetables and ingredients](https://github.com/user-attachments/assets/540ff224-0822-4a39-94a3-24ab3b8e1bdc)

### 📲 QR Code Display  
![QR Text](https://github.com/user-attachments/assets/7b589a89-2aed-4e0a-b564-19ad822783d6)

### 🔍 Scanning and Trace View  
![QR Scan Result](https://github.com/user-attachments/assets/44a59160-9db6-43be-97a1-ccf393574bea)

---

## 🔮 Future Scope

- 🔒 Admin Panel & User Approvals
- 📦 Ethereum / Hyperledger Integration
- 🧾 PDF Traceability Reports
- 🔔 Tampering Notifications
- 📊 Analytics & Dashboards
- 🌍 Multi-language Support

---

## 👩‍💻 Team Members

- **Navya** – Farmer Module  
- **Meghana** – Distributor Module  
- **Naseema** – Blockchain Logic, Retailer & Customer Modules *(Team Leader)*

---

## 📂 How to Run

```bash
# Clone Repo
git clone https://github.com/yourusername/organic-traceability.git
cd organic-traceability

# Backend
cd backend
npm install
npm start

# Frontend (in a new terminal)
cd frontend
npm install
npm start
