import React, { useEffect } from "react";
import { auth, db, myTimeStamp } from "../firebase";
import { Redirect } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import { RoomModal } from "./RoomModal";
import { RoomCard } from "./RoomCard";

export const HomePage = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isModalOn, setIsModalOn] = useState(false);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const toggleModalOn = async (e) => {
    e.preventDefault();
    setIsModalOn(!isModalOn);
  };

  const handleClickAddRooms = (e) => {
    e.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      db.collection("rooms")
        .doc()
        .set({
          participants: [userId, selectedUserId],
          createdAt: myTimeStamp,
        });
      setIsModalOn(false);
    } catch (error) {
      alert("エラーが発生しました！");
    }
  };

  /* ログイン中のユーザーの取得 */
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

  /* usersの取得 */
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

  /* roomsの取得：currentUserIdが取得済みの場合に実行 */
  useEffect(() => {
    if (currentUserId) {
      const unsubscribe = db
        .collection("rooms")
        .where("participants", "array-contains", currentUserId)
        .onSnapshot((snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({
              ...doc.data({ serverTimestamps: "estimate" }),
              id: doc.id,
            });
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
          <SHeader>
            <ModalButton onClick={toggleModalOn}>
              チャットルームを作る
            </ModalButton>
          </SHeader>
          {isModalOn && (
            <RoomModal
              users={users.filter((doc) => doc.id !== currentUserId)}
              rooms={rooms}
              setSelectedUserId={setSelectedUserId}
              handleClickAddRooms={handleClickAddRooms}
              handleClickModalOff={toggleModalOn}
            />
          )}
          <Container>
            <Title>チャットルーム</Title>
            <CardContainer>
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  user={users.find((user) => {
                    return (
                      room.participants.includes(user.id) &&
                      user.id !== currentUserId
                    );
                  })}
                />
              ))}
            </CardContainer>
          </Container>
        </>
      )}
      {!isSignedIn && <Redirect to="/signup" />}
    </>
  );
};

const ModalButton = styled.button`
  width: 160px;
  color: #fff;
  background-color: #0f8fd0;
  padding: 10px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: #666;
    background-color: rgba(119, 230, 242, 0.7);
    box-shadow: 2px 2px;
  }
`;

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 1);
`;

const SHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 30px 100px 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const CardContainer = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  &::after {
    content: "";
    width: 350px;
    margin: 30px 0;
    padding: 20px;
    display: block;
    width: 350px;
    height: 0;
  }
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 30px;
`;
