# 🎉 Event Management System  
A full-stack event scheduling and timezone-aware management platform built using **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**.  
This system supports multi-profile management, timezone conversions, event history logs, and a clean modular architecture.

---

## 🚀 **Features**

### ✅ Multi-Profile Event Management  
- Create, edit, and delete events  
- Assign multiple profiles to a single event   

### 🌍 **Advanced Timezone Engine**  
- User enters time in their selected timezone  
- Converted to **UTC** before storing in DB  
- Converted back to viewer’s timezone on display  
- Logs also auto-adjust to selected timezone  

### 📜 **Event History Logs**  
- Before & after snapshots  
- Tracks who updated what  
- Timestamp follows user’s timezone  
- Complete auditing system  

### 🧩 **Fully Modular Code Structure**
- Clean folder architecture  
- Reusable components  
- Redux slices for global data  
- Utility functions for conversions  

### ⚡ **Optimized with DSA**
- O(n) search for filtering profiles  
- O(1) lookup using HashMap for logs  
- Duplicate prevention logic  
- Immutable state updates  
- Deep comparison for detecting changes  

---

## 🗂️ **Project Structure**

```
/backend
  /controllers
  /models
  /routes
  /utils
  server.js

/frontend
  /src
    /components
    /features
      /events
      /profiles
    /api
    /utils
    /store
    App.js
```

---

## 🛠️ **Tech Stack**

### **Frontend**
- React  
- Redux Toolkit  
- React Router  
- Day.js (for timezone handling)  
- CSS  

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  

---

## 🎛️ **Core Logic Overview**

### ⭐ **1. Timezone Conversion Flow**

```js
// Convert user time → UTC
const utcTime = moment.tz(userTime, userTimezone).utc().format();

// Convert UTC → Viewer Timezone
const localTime = moment.utc(utcTime).tz(viewerTimezone).format();
```

### ⭐ **2. Duplicate Prevention**

```js
const exists = profiles.some(p => p.name === newProfile);
if (exists) return "Profile already exists!";
```

### ⭐ **3. HashMap for O(1) Lookup**

```js
const profilesMap = {};
profiles.forEach(p => profilesMap[p._id] = p.name);

// usage:
profilesMap[event.profileId];
```

### ⭐ **4. Deep Comparison for Logs**

```js
if (JSON.stringify(prev) !== JSON.stringify(curr)) {
   saveLog(prev, curr);
}
```

---

## 🔄 **Event Workflow**

### ✔ **Create Event**
1. User selects profile  
2. User picks timezone  
3. Converts to UTC  
4. Stores in DB  
5. Redux auto-refreshes UI  

### ✔ **Edit Event**
1. Load stored UTC time  
2. Convert to viewer timezone  
3. Modify  
4. Convert back to UTC  
5. Save changes  

### ✔ **Logs System**
- Saves old vs new values  
- Tracks user who updated  
- Auto timezone formatting  
- Full audit record  

---

## 🧰 **Backend Setup**

### Install dependencies
```bash
cd backend
npm install
```

### Create `.env`
```
MONGO_URI=your_mongodb_connection
PORT=5000
```

### Run server
```bash
npm start
```

---

## 🖥️ **Frontend Setup**

### Install dependencies
```bash
cd frontend
npm install
```

### Start project
```bash
npm run dev
```

---

## 🎨 **Frontend Highlights**

### **React Hooks Used**
```js
useState();     // UI and form control
useEffect();    // Auto fetch & timezone updates
useRef();       // Outside click detection
useSelector();  // Get global state
useDispatch();  // Trigger actions
```

### **Redux Structure**
```
/features
  /profiles
    profilesSlice.js
  /events
    eventsSlice.js
```

---

## 🧪 **Sample API Endpoints**

### **Create Event**
```http
POST /api/events
```

### **Get All Events**
```http
GET /api/events
```

### **Update Event**
```http
PUT /api/events/:id
```

### **Get Logs**
```http
GET /api/logs/:eventId
```

---

## 📦 Deployment Notes

- Frontend deployed on **Vercel**  
- Backend deployed on **Render**  
- Environment variables are correctly set  
- Use **CORS** for cross-origin access  

---

## 🏁 **Conclusion**

This Event Management System is:

✔ Timezone-accurate  
✔ Scalable  
✔ Modular  
✔ DSA-optimized  
✔ Production-ready  

It demonstrates strong frontend + backend engineering and real-world problem solving.

---

## ✨ **Author**

**Dibya Ranjan**  
Frontend Developer | React | Full-Stack Developer | Data Analyst 

---

