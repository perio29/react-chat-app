import styled from "styled-components";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { BiLogIn } from "react-icons/bi";
import { IconContext } from "react-icons";

export const RoomCard = ({ room, user }) => {
  const history = useHistory();

  const handleClickRoom = (e) => {
    e.preventDefault();
    history.push(`/rooms/${room.id}`);
  };
  return (
    <>
      <CardDiv onClick={handleClickRoom}>
        <DisplayName>{user && user.displayName}</DisplayName>
        <SubDiv>
          <DateP>{`${dayjs(room.createdAt.toDate().toString()).format(
            "YYYY/MM/DD HH:mm"
          )}に生成`}</DateP>
          <ButtonDiv>
            <IconContext.Provider value={{ size: "20px" }}>
              <BiLogIn />
            </IconContext.Provider>
            <RoomButton>入室</RoomButton>
          </ButtonDiv>
        </SubDiv>
      </CardDiv>
    </>
  );
};

const CardDiv = styled.div`
  width: 350px;
  margin: 30px 0;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 7px 0px rgb(145 126 126 / 34%);
  cursor: pointer;
`;

const DisplayName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 30px;
`;

const SubDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateP = styled.p`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
`;
const RoomButton = styled.button`
  border: none;
  padding: 3px 6px;
  background-color: #fff;
  color: #13daf0;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;
