import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { auth, db, myTimeStamp } from "../firebase";
import RoomCard from "./RoomCard";
import RoomModal from "./RoomModal";

export const HomePage = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isModalOn, setIsModalOn] = useState(false);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const toggleModalOn = (e) => {
    e.preventDefault();
    setIsModalOn(!isModalOn);
  };

  const handleClickAddRooms = async (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      await db
        .collection("rooms")
        .doc()
        .set({
          participants: [userId, selectedUserId],
          createdAt: myTimeStamp.toDate(),
        });
      setIsModalOn(false);
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました！");
    }
  };

  // ログイン中のユーザーの取得
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        setIsSignedIn(true);
      } else {
        setCurrentUserId("");
        setIsSignedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  // usersの取得
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setUsers(docs);
    });
    return unsubscribe;
  }, []);

  // roomsの取得：currentUserIdが取得済みの場合に実行
  useEffect(() => {
    if (currentUserId) {
      const unsubscribe = db
        .collection("rooms")
        .where("participants", "array-contains", currentUserId)
        .onSnapshot((snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setRooms(docs);
        });
      return unsubscribe;
    }
  }, [currentUserId]);

  return (
    <>
      {currentUserId && (
        <>
          <ModalButton onClick={toggleModalOn}>チャットを始める</ModalButton>
          {isModalOn && (
            <RoomModal
              users={users.filter((doc) => doc.id !== currentUserId)}
              setSelectedUserId={setSelectedUserId}
              handleClickAddRooms={handleClickAddRooms}
              handleClickModalOff={toggleModalOn}
            />
          )}
          {rooms.map((room) => (
            <RoomCard
              room={room}
              user={users.find((user) => {
                console.log(user, room);
                console.log(room.participants);
                return (
                  room.participants.includes(user.id) &&
                  user.id !== currentUserId
                );
              })}
            />
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
