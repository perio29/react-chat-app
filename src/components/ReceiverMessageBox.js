import styled from "styled-components";
import dayjs from "dayjs";

export const ReceiverMessageBox = ({message}) => {
  return (
    <div>
      <MessageDiv>
        <MessageP>{message.text}</MessageP>
        <SendDateP>{`${dayjs(message.createdAt.toDate().toString()).format(
          "YYYY年MM月DD日 HH:mm"
        )}に送信済み`}</SendDateP>
      </MessageDiv>
    </div>
  )
}

const MessageDiv = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const MessageP = styled.p`
  color: #fff;
  font-size: 22px;
  background-color: #0f8fd0;
  padding: 8px 5px;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const SendDateP = styled.p`
  color: gray;
  font-size: 10px;
  text-align: right;
`;
