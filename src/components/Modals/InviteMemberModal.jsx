import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  if (!search) {
    return [];
  }

  console.log('Searching for:', search);
  console.log('Current members:', curMembers);

  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('keywords', 'array-contains', search.toLowerCase()),
      orderBy('displayName'),
      limit(20)
    );

    const snapshot = await getDocs(q);
    console.log('Found users:', snapshot.docs.length);
    
    const results = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        console.log('User data:', data);
        return {
          label: data.displayName,
          value: data.uid,
          photoURL: data.photoURL,
        };
      })
      .filter((opt) => !curMembers.includes(opt.value));
    
    console.log('Filtered results:', results);
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // reset form value
      form.resetFields();
      setValue([]);

      // update members in current room
      const roomRef = doc(db, 'rooms', selectedRoomId);
      const newMemberIds = value.map((val) => val.value);

      await updateDoc(roomRef, {
        members: arrayUnion(...newMemberIds),
      });

      setIsInviteMemberVisible(false);
    } catch (error) {
      console.error('Error adding members:', error);
    }
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}