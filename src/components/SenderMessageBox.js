import styled from "styled-components";
import dayjs from "dayjs";

export const SenderMessageBox = ({ message }) => {
  return (
    
      <Wrapper>
        <MainText>{message.text}</MainText>
        <SendDateLabel>{`${dayjs(message.createdAt.toDate().toString()).format(
          "YYYY年MM月DD日 HH:mm"
        )}に送信済み`}</SendDateLabel>
      </Wrapper>
    
  );
};

const Wrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  flex-shrink: 0;
`;

const MainText  = styled.p`
  color: #fff;
  font-size: 22px;
  background-color: #0f8fd0;
  padding: 8px 5px;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const SendDateLabel = styled.p`
  color: gray;
  font-size: 10px;
  text-align: right;
`;
