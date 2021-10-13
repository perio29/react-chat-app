import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { auth, db, myTimeStamp } from "../firebase";
import RoomCard from "./RoomCard";
import RoomModal from "./RoomModal";

export const HomePage = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleClickModalOn = async (e) => {
    e.preventDefault();
    setIsModal(true);
    try {
      const userDocuments = await db.collection("users").get();
      const userId = auth.currentUser.uid;
      const selectableUsers = userDocuments.docs.filter(
        (doc) => doc.id !== userId
      );
      setUsers(selectableUsers);
    } catch (error) {
      alert("エラーが発生しました！");
    }
  };

  const handleClickModalOff = (e) => {
    e.preventDefault();
    setIsModal(false);
  };

  const handleClickAddRooms = (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      db.collection("rooms")
        .doc()
        .set({
          participants: [userId, selectedUserId],
          createdAt: myTimeStamp.toDate(),
        });
      alert("roomの作成に成功しました！");
    } catch (error) {
      alert("エラーが発生しました！");
    }
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

  // rooms, usersの取得
  useEffect(() => {
    const unsubscribeRooms = db.collection("rooms").onSnapshot((snapshot) => {
      const roomDocs = [];
      snapshot.forEach((doc) => {
        roomDocs.push({ ...doc.data(), id: doc.id });
      });
      console.log(roomDocs);
      setRooms(roomDocs);
    });
    return unsubscribeRooms;
  }, []);

  return (
    <>
      {isSignedIn && (
        <>
          <ModalButton onClick={handleClickModalOn}>
            チャットを始める
          </ModalButton>
          {isModal && (
            <RoomModal
              users={users}
              setSelectedUserId={setSelectedUserId}
              handleClickAddRooms={handleClickAddRooms}
              handleClickModalOff={handleClickModalOff}
            />
          )}
          {rooms.map((room) => (
            <RoomCard room={room} />
          ))}
        </>
      )}
      {!isSignedIn && <Redirect to="/signup" />}
    </>
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
