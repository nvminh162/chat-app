# Chat App 💬

Ứng dụng chat real-time được xây dựng với React và Firebase, cho phép người dùng tạo phòng chat, mời thành viên và nhắn tin thời gian thực.

## ✨ Tính năng

- 🔐 **Xác thực người dùng** với Firebase Authentication
- 💬 **Chat real-time** với Firestore
- 🏠 **Tạo và quản lý phòng chat**
- 👥 **Mời thành viên vào phòng**
- 📱 **Giao diện responsive** với Ant Design
- 🎨 **UI hiện đại** với Styled Components
- 🔧 **Firebase Emulator** hỗ trợ development

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 19, Vite
- **UI Framework:** Ant Design
- **Styling:** Styled Components
- **Backend:** Firebase (Firestore, Authentication)
- **Routing:** React Router DOM
- **Date Handling:** date-fns
- **Build Tool:** Vite
- **Linting:** ESLint

## 📋 Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm hoặc yarn
- Firebase CLI (cho emulator)

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/nvminh162/chat-app-realtime.git
cd chat-app-realtime
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình Firebase

#### Bước 1: Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Kích hoạt **Authentication** và **Firestore Database**
4. Trong Project Settings > General, tạo Web App và copy Firebase config

#### Bước 2: Setup Firebase Config (Quan trọng! 🔐)
```bash
# Copy template file thành config file
cp src/firebase/config.template.js src/firebase/config.js
```

#### Bước 3: Cập nhật Firebase Config
Mở file `src/firebase/config.js` và thay thế các giá trị trong `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

> ⚠️ **Lưu ý bảo mật:** File `config.js` đã được thêm vào `.gitignore` để tránh commit Firebase keys lên repository. Chỉ sử dụng `config.template.js` làm template.

### 4. Chạy Firebase Emulator (Development)

```bash
cd emulators
firebase emulators:start
```

Firebase Emulator sẽ chạy tại:
- **Authentication:** http://localhost:9099
- **Firestore:** http://localhost:8080
- **Emulator UI:** http://localhost:4000

### 5. Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## 📁 Cấu trúc dự án

```
chat-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ChatRoom/          # Components phòng chat
│   │   │   ├── ChatWindow.jsx  # Cửa sổ chat chính
│   │   │   ├── Message.jsx     # Component tin nhắn
│   │   │   ├── RoomList.jsx    # Danh sách phòng
│   │   │   ├── Sidebar.jsx     # Thanh bên
│   │   │   └── UserInfo.jsx    # Thông tin người dùng
│   │   ├── Login/             # Components đăng nhập
│   │   └── Modals/            # Các modal
│   │       ├── AddRoomModal.jsx
│   │       └── InviteMemberModal.jsx
│   ├── context/               # React Context
│   │   ├── AppProvider.jsx    # App context
│   │   └── AuthProvider.jsx   # Authentication context
│   ├── firebase/              # Firebase configuration
│   │   ├── config.js          # Firebase config
│   │   └── services.js        # Firebase services
│   ├── hooks/                 # Custom hooks
│   │   └── useFirestore.js    # Firestore hook
│   ├── assets/                # Static assets
│   ├── App.jsx               # Component chính
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── emulators/                # Firebase emulator config
│   ├── firebase.json
│   ├── firestore.rules
│   └── firestore.indexes.json
├── package.json
├── vite.config.js
└── README.md
```

## 📜 Scripts có sẵn

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 🔧 Cấu hình Firebase Emulator

Firebase Emulator được cấu hình trong file `emulators/firebase.json`:

- **Authentication Emulator:** Port 9099
- **Firestore Emulator:** Port 8080
- **Emulator UI:** Enabled

## 🌟 Tính năng chính

### Xác thực người dùng
- Đăng nhập/đăng ký với Firebase Auth
- Tự động chuyển hướng sau khi đăng nhập
- Quản lý trạng thái authentication

### Quản lý phòng chat
- Tạo phòng chat mới
- Hiển thị danh sách phòng
- Mời thành viên vào phòng
- Quản lý quyền truy cập

### Chat real-time
- Gửi và nhận tin nhắn real-time
- Hiển thị thông tin người gửi
- Timestamp cho mỗi tin nhắn
- Auto-scroll đến tin nhắn mới

## 🎨 UI/UX

- **Ant Design Components:** Button, Input, Modal, List, etc.
- **Styled Components:** Custom styling
- **Responsive Design:** Tương thích mobile và desktop
- **Dark/Light Theme:** Hỗ trợ theme switching

## 🔐 Bảo mật

### Firebase Configuration Security
- ✅ File `src/firebase/config.js` được ignore trong `.gitignore`
- ✅ Sử dụng `config.template.js` để hướng dẫn setup
- ✅ Không commit Firebase keys lên repository public
- ✅ Environment variables cho production deployment

### Firebase Security Rules
- Firebase Security Rules cho Firestore
- Authentication required cho tất cả operations
- Validation dữ liệu client-side và server-side

### Best Practices
- Sử dụng Firebase Emulator cho development
- Setup Firebase Security Rules phù hợp
- Không expose sensitive data trong frontend
- Regular security audit cho Firebase project

## 🚀 Deploy

### Deploy lên Firebase Hosting

```bash
# Build project
npm run build

# Deploy
firebase deploy
```

### Deploy lên Vercel/Netlify

**Quan trọng:** Trước khi deploy, cần setup Firebase config:

1. **Tạo file config từ template:**
```bash
cp src/firebase/config.template.js src/firebase/config.js
```

2. **Cập nhật Firebase config trong `src/firebase/config.js`:**
   - Thay thế tất cả giá trị rỗng `""` bằng Firebase config thực tế từ project của bạn
   - Đảm bảo tất cả fields đều được điền đầy đủ

3. **Build và deploy:**
```bash
# Build project
npm run build

# Upload folder dist/ lên hosting platform
```

> ⚠️ **Lưu ý:** File `config.js` sẽ không được commit lên repository (đã có trong `.gitignore`). Mỗi developer cần tạo file config riêng từ template.

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Tác giả

**nvminh162**

- GitHub: [@nvminh162](https://github.com/nvminh162)
- Facebook: [@nvminh162](https://facebook.com/nvminh162)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)
- [Styled Components](https://styled-components.com/)

---

⭐ Đừng quên star project nếu bạn thấy hữu ích!