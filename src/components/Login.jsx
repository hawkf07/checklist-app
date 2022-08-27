import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const API_URL = 'http://94.74.86.174:8080/api';
const Login = ({ token, setToken }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });
  const mutation = useMutation((loginUser) => {
    try {
      return axios.post(`${API_URL}/login`, loginUser);
    } catch (e) {
      console.log(e);
    }
  });
  useEffect(() => {
    if (mutation.isSuccess) setToken(mutation.data.data.data.token);
    return () => {
    };
  }, [mutation]);

  const userInputHandler = (e) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({
            password: userInput.password,
            username: userInput.username
          });
        }}
      >
        <h1> Login </h1>
        <input
          className="p-3 border-2 border-slate-400 w-full"
          type="text"
          onChange={userInputHandler}
          value={userInput.username}
          name="username"
          placeholder="please enter the username"
        />
        <input
          type="password"
          placeholder="please enter the password"
          className="p-3 border-2 border-slate-400 w-full"
          onChange={userInputHandler}
          value={userInput.password}
          name="password"
        />
        <button className="p-3 bg-blue-400 w-full" type="submit">
          Submit
        </button>
        {mutation.isError ? 'Error' + mutation.error : null}
        {mutation.isSuccess ? 'Success' : null}
      </form>
    </>
  );
};
export { Login };
