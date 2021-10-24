import { useEffect, useState } from "react";
import { db, myTimeStamp } from "../firebase";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SenderMessageBox } from "./SenderMessageBox";
import { ReceiverMessageBox } from "./ReceiverMessageBox";

export const RoomPage = () => {
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const params = useParams();

  const handleAddText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const addLoginUserMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(params.roomId).collection("messages").doc().set({
      createdAt: myTimeStamp,
      createdBy: currentUserId,
      text: text,
    });
    setText("");
  };

  /* messageの取得 */
  useEffect(() => {
    const message = db
      .collection("rooms")
      .doc(params.roomId)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({
            ...doc.data({ serverTimestamps: "estimate" }),
            id: doc.id,
          });
        });
        setMessages(docs);
      });

    return message;
  }, [params.roomId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId("");
      }
    });
    return unsubscribe;
  }, []);

  
  return (
    <Container>
      <MessageAreaDiv>
        {messages.map((message) =>
          message.createdBy === currentUserId ? (
            <SenderMessageContainer key={message.id}>
              <SenderMessageBox message={message} />
            </SenderMessageContainer>
          ) : (
            <ReceiverMessageContainer key={messages.id}>
              <ReceiverMessageBox message={message} />
            </ReceiverMessageContainer>
          )
        )}
      </MessageAreaDiv>

      <FormDiv>
        <MessaggInput
          placeholder="メッセージを入力"
          value={text}
          onChange={handleAddText}
        />
        <MessageButton onClick={addLoginUserMessage}>送信</MessageButton>
      </FormDiv>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MessageAreaDiv = styled.div`
  margin-top: 20px;
`;

const SenderMessageContainer = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ReceiverMessageContainer = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormDiv = styled.div`
  width: 100%;
  margin: 0 auto 40px;
  text-align: center;
`;

const MessaggInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  background-color: #eee;
  width: 90%;
  border: none;
`;

const MessageButton = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  color: #0f8fd0;
  border-radius: 50%;
  border: none;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    background-color: #0f8fd0;
    color: #fff;
  }
`;
