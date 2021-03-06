import useInput from "../../hooks/useInput";
import {
  Button,
  Error,
  Form,
  Header,
  Input,
  Label,
  LinkContainer,
  Success,
} from "./styles";

import axios, { AxiosResponse } from "axios";
import { ChangeEvent, UIEvent, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const SignUp = () => {
  const { data: userData } = useSWR("/api/users", fetcher);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, setPassword]
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(password !== e.target.value);
    },
    [password, setPasswordCheck]
  );

  const onSubmit = useCallback(
    (e: UIEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!nickname || !nickname.trim()) {
        return;
      }
      if (!mismatchError) {
        setSignUpError(false);
        setSignupSuccess(false);
        axios
          .post<
            { email: string; nickname: string; password: string },
            AxiosResponse
          >("/api/users", {
            email,
            nickname,
            password,
          })
          .then((res) => {
            setSignupSuccess(true);
          })
          .catch((error) => {
            setSignUpError(error.response?.data?.code === 403);
          });
      }
    },
    [email, mismatchError, nickname, password]
  );

  if (userData) {
    return <Redirect to="/workspace/sleact" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>????????? ??????</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>?????????</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>????????????</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>???????????? ??????</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
          {!nickname && <Error>???????????? ??????????????????.</Error>}
          {signUpError && <Error>?????? ????????? ??????????????????.</Error>}
          {signUpSuccess && (
            <Success>???????????????????????????! ?????????????????????.</Success>
          )}
        </Label>
        <Button type="submit">????????????</Button>
      </Form>
      <LinkContainer>
        ?????? ???????????????????&nbsp;
        <a href="/login">????????? ????????????</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
