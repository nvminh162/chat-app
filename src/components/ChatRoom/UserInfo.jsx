import React, { useEffect } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
//   const { clearState } = React.useContext(AppContext);

  useEffect(() => {
    // tham chiếu tới collection users
    const colRef = collection(db, "users");

    // lắng nghe realtime
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log({ data, snapshot, docs: snapshot.docs });
    });

    // cleanup listener khi component unmount
    return () => unsubscribe();
  }, []);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          // clear state in App Provider when logout
          // clearState();
          signOut(auth);
        }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}