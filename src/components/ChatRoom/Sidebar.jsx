import { Row, Col } from 'antd';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import RoomList from './RoomList';

const SidebarStyled = styled.div`
  background: black;
  color: white;
  height: 100vh;
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  );
}