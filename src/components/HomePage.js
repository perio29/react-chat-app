import React, { useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { Redirect } from "react-router";
// import { useHistory } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import { myTimeStamp } from "../firebase";

export const HomePage = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  // const history = useHistory();

  // const handleClickLogout = (e) => {
  //   e.preventDefault();
  //   auth.signOut();
  //   history.push("/login");
  // };

  const handleClickModalOn = async (e) => {
    e.preventDefault();
    setIsModal(true);

    const userDocuments = await db.collection("users").get();
    setSelectedUser(userDocuments.docs);
  };

  const handleClickModalOff = (e) => {
    e.preventDefault();
    setIsModal(false);
  };

  const handleClickAddRooms = async (e) => {
    e.preventDefault();
    await auth.onAuthStateChanged((user) => {
      db.collection("rooms")
        .doc()
        .set({
          participants: [user.uid, selectedUserId],
          createdAt: myTimeStamp.toDate(),
        });
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isSignedIn && (
        <>
          <ModalButton onClick={handleClickModalOn}>
            チャットを始める
          </ModalButton>
          {isModal && (
            <OverrayDiv>
              <OverrayContent>
                <SelectP>チャットを始める相手を選んでください</SelectP>
                <UserSelect onChange={(e) => setSelectedUserId(e.target.value)}>
                  {selectedUser.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.data().displayName}
                    </option>
                  ))}
                </UserSelect>
                <ButtonDiv>
                  <ClosedButton onClick={handleClickModalOff}>
                    閉じる
                  </ClosedButton>
                  <ChatStartButton onClick={handleClickAddRooms}>
                    チャットを始める
                  </ChatStartButton>
                </ButtonDiv>
              </OverrayContent>
            </OverrayDiv>
          )}
          {/* <button onClick={handleClickLogout}>ログアウト</button> */}
        </>
      )}
      {!isSignedIn && <Redirect to="/signup" />}
    </div>
  );
};

const ModalButton = styled.button`
  margin: 30px 20px 10px 90%;
  display: flex;
  color: #fff;
  background-color: #0f8fd0;
  padding: 10px 12px;
  justify-content: flex-start;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: #666;
    background-color: rgba(119, 230, 242, 0.7);
    box-shadow: 2px 2px;
  }
`;

const OverrayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverrayContent = styled.div`
  z-index: 2;
  width: 20%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 4px 3px 7px 1px rgba(0, 0, 0, 0.3);
`;

const SelectP = styled.p`
  text-align: center;
  margin-bottom: 20px;
`;

const UserSelect = styled.select`
  font-size: 1.2rem;
  width: 80%;
  padding: 4px;
  margin: 0 auto 20px;
  display: block;
  border: none;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0);
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ClosedButton = styled.button`
  background-color: #fff;
  margin-right: 6px;
  padding: 2px;
  border: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ChatStartButton = styled.button`
  background-color: #fff;
  color: #0f8fd0;
  padding: 2px;
  border: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
