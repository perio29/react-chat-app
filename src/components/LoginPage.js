import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <Container>
      <FormDiv>
        <Title>Login</Title>

        <InputBox>
          <AiOutlineMail />
          <Input
            value={email}
            placeholder="メール"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <RiLockPasswordLine />
          <Input
            type="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <ButtonDiv>
          <Button
            onClick={handleClickLogin}
            disabled={email === "" || password === ""}
          >
            Login
          </Button>
          <SLink>
            <Link to="/signup">登録がまだの方はこちら</Link>
          </SLink>
        </ButtonDiv>
      </FormDiv>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
  width: 100%;
  background-color: #005c99;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormDiv = styled.form`
  margin: 0 auto;
  width: 40%;
  border: 2px solid #333;
  padding: 35px 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  margin: 0 auto 30px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  margin: 0 auto;
  width: 40%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-flow: column;
    width: 80%;
  }
`;

const Input = styled.input`
  margin-left: 5px;
  width: 280px;
  height: 50px;
  border-radius: 100px;
  border: 1px solid #333;
  letter-spacing: 0.8px;
  color: #757575;
  padding: 3px 15px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
    padding: 0px 10px;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border-radius: 5px;
  padding: 3px 10px;
  border: 1px solid #333;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #0000cc;
  }
`;

const SLink = styled.p`
  font-size: 10px;

  @media screen and (max-width: 768px) {
    font-size: 5px;
    margin-top: 10px;
  }
`;
