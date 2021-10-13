import styled from "styled-components";
function RoomModal({
  users,
  setSelectedUserId,
  handleClickAddRooms,
  handleClickModalOff,
}) {
  return (
    <>
      <OverrayDiv>
        <OverrayContent>
          <SelectP>チャットを始める相手を選んでください</SelectP>
          <UserSelect onChange={(e) => setSelectedUserId(e.target.value)}>
            {users.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.data().displayName}
              </option>
            ))}
          </UserSelect>
          <ButtonDiv>
            <CloseButton onClick={handleClickModalOff}>閉じる</CloseButton>
            <ChatStartButton onClick={handleClickAddRooms}>
              チャットを始める
            </ChatStartButton>
          </ButtonDiv>
        </OverrayContent>
      </OverrayDiv>
    </>
  );
}

export default RoomModal;

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

const CloseButton = styled.button`
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
