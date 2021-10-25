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
    setText(e.target.value);
  };

  const sendMessage = () => {
    db.collection(`rooms/${params.roomId}/messages`).add({
      createdAt: myTimeStamp,
      createdBy: currentUserId,
      text: text,
    });
    setText("");
  };

  /* messageの取得 */
  useEffect(() => {
    const message = db
      .collection(`rooms/${params.roomId}/messages`)
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
    <>
      <MessageWrapper>
        {messages.map((message) =>
          message.createdBy === currentUserId ? (
            <SenderMessageContainer key={message.id}>
              <SenderMessageBox message={message} />
            </SenderMessageContainer>
          ) : (
            <ReceiverMessageContainer key={message.id}>
              <ReceiverMessageBox message={message} />
            </ReceiverMessageContainer>
          )
        )}
      </MessageWrapper>

      <FormWrapper>
        <MessageInputArea
          placeholder="メッセージを入力"
          value={text}
          onChange={handleAddText}
        />
        <MessageButton onClick={sendMessage}>送信</MessageButton>
      </FormWrapper>
    </>
  );
};

const MessageWrapper = styled.div`
  height: calc(100vh - 50px);
  overflow-y: scroll;
`;

const SenderMessageContainer = styled.div`
  margin-left: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ReceiverMessageContainer = styled.div`
  width: 50%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageInputArea = styled.input`
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
