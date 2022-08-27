import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
const API_URL = 'http://94.74.86.174:8080/api/';

const Register = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    password: '',
    email: ''
  });

  const mutation = useMutation((newUser) => {
    return axios.post(`${API_URL}register`, newUser);
  });
  console.log(mutation.data);

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
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              username: userInput.name,
              email: userInput.email,
              password: userInput.password
            });
          }}
          className="flex flex-col gap-3"
        >
          <h1> Register </h1>

          <input
            type="name"
            className="border-2 border-slate-200 p-5"
            placeholder="please enter the name"
            value={userInput.name}
            onChange={userInputHandler}
            name="name"
          />
          <input
            type="email"
            placeholder="please enter the email"
            className="border-2 border-slate-200 p-5"
            value={userInput.email}
            onChange={userInputHandler}
            name="email"
          />
          <input
            type="password"
            className="border-2 border-slate-200 p-5"
            placeholder="please enter the password"
            onChange={userInputHandler}
            value={userInput.password}
            name="password"
          />
          <button type="submit" className="p-3 bg-blue-400">
            Submit
          </button>
          <span>{mutation.isSuccess ? 'Success' : null} </span>
          <span> {mutation.isError ? 'Error' : null} </span>
        </form>
      </div>
    </>
  );
};
export { Register };
