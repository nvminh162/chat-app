import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

// import provider và hàm từ Firebase v9
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";

const { Title } = Typography;

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleLogin = async (provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);

      // Lấy thêm thông tin user mới
      const additionalUserInfo = getAdditionalUserInfo(userCredential);
      const { user } = userCredential;

      if (additionalUserInfo?.isNewUser) {
        await addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName?.toLowerCase()),
        });
      }

      console.log("✅ Login successful:", user.displayName);
    } catch (error) {
      console.error("❌ Error during login: ", error);
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={() => handleLogin(googleProvider)}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={() => handleLogin(fbProvider)}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
