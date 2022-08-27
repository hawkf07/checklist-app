import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { CheckList } from './CheckList';

const API_URL = 'http://94.74.86.174:8080/api';

const ListCheckList = ({ token }) => {
  const [renameItemValue, setRenameItemValue] = useState('');
  const [nameValue, setNameValue] = useState({
    createCheckList: '',
    createListByItem: ''
  });

  const inputHandler = (e) => {
    setNameValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const updateCheckListStatus = useMutation(
    async ({ checkListId, checkListItemId }) => {
      try {
        const axiosData = axios.put(
          `${API_URL}/checklist/${checkListId}/item/${checkListItemId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return axiosData;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const createCheckList = useMutation((name) => {
    try {
      return axios.post(`${API_URL}/checklist`, name, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  const createNewCheckListByItem = useMutation((checklistId) => {
    try {
      console.log(checklistId.itemName);
      return axios.post(
        `${API_URL}/checklist/${checklistId.id}/item`,
        {
          itemName: checklistId.itemName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
  const fetchCheckList = async () => {
    try {
      const getList = await axios.get(`${API_URL}/checklist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return getList?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChecklistItemById = useMutation(
    ({ checkListId, checkListItemId }) => {
      try {
        const deleteItem = axios.delete(
          `${API_URL}/checklist/${checkListId}/item/${checkListItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return deleteItem;
      } catch (error) {
        console.log(error);
      }
    }
  );

  const renameItemByCheckListId = useMutation((itemName) => {
    try {
      const renameItem = axios.put(
        `${API_URL}/checklist/${itemName.checkListId}/item/rename/${itemName.checkListItemId}`,
        {
          itemName:itemName.itemName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return renameItem;
    } catch (error) {
      console.log(error);
    }
  });

  const getCheckList = useQuery(['checklist'], fetchCheckList, {
    refetchInterval: 1000
  });
  const renameInputHandler = (e) => {
    setRenameItemValue(e.target.value);
  };
  // getCheckList,inputHandler,deleteChecklistItemById,renameInputHandler,createNewCheckListByItem,renameItemValue}
  return (
    <>
      <div className="p-5">
        <h1> List Check List </h1>
        <CheckList
          updateCheckListStatus={updateCheckListStatus}
          renameItemByCheckListId={renameItemByCheckListId}
          createNewCheckListByItem={createNewCheckListByItem}
          renameItemValue={renameItemValue}
          renameInputHandler={renameInputHandler}
          getCheckList={getCheckList}
          inputHandler={inputHandler}
          renameItemByCheckListId={renameItemByCheckListId}
          setRenameItemValue={setRenameItemValue}
      nameValue={nameValue}
          deleteChecklistItemById={deleteChecklistItemById}
        />
        <form
          className="flex flex-col"
          onClick={(e) => {
            e.preventDefault();
            createCheckList.mutate({ name: nameValue });
          }}
        >
          <header>
            {' '}
            <h1> Create New CheckList </h1>{' '}
          </header>
          <input
            type="name"
            name="checkList"
            value={nameValue.createList}
            className="border-2 p-3 border-slate-500"
            placeholder="please enter something"
            onChange={inputHandler}
          />
          <button type="submit" className="p-3 bg-blue-400">
            {' '}
            create
          </button>
        </form>
      </div>
    </>
  );
};

export { ListCheckList };
