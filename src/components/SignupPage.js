import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiUser } from "react-icons/hi";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rePassword, setRePassword] = useState("");

  const history = useHistory();

  const handleClickSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      db.collection("users").doc(user.uid).set({ displayName });

      history.push("/");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <Container>
      <FormDiv>
        <Title>Signup</Title>

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
        <InputBox>
          <RiLockPasswordLine />
          <Input
            type="password"
            value={rePassword}
            placeholder="パスワード再入力"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <HiUser />
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="表示名"
          />
        </InputBox>
        <ButtonDiv>
          <Button
            onClick={handleClickSignup}
            disabled={
              password !== rePassword ||
              email === "" ||
              password === "" ||
              rePassword === "" ||
              displayName === ""
            }
          >
            登録
          </Button>
          <SLink>
            <Link to="/login">既にアカウントがある方はこちら</Link>
          </SLink>
        </ButtonDiv>
      </FormDiv>
    </Container>
  );
};

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,300;1,600&display=swap");
  font-family: "Source Sans Pro", sans-serif;
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
  margin: 0 auto 20px;
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
