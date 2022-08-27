const CheckList = ({
  getCheckList,
  nameValue,
  renameItemByCheckListId,
  inputHandler,
  updateCheckListStatus,
  deleteChecklistItemById,
  renameInputHandler,
  createNewCheckListByItem,
  renameItemValue,
  setRenameItemValue,
}) => {
  return (
    <>
      {getCheckList &&
        getCheckList?.data?.data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex border-2 border-blue-500 gap-5 flex-col p-3 my-3 shadow-lg"
            >
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createNewCheckListByItem.mutate({
                      id: item?.id,
                      itemName: nameValue.createListByItem
                    });
                  }}
            className="flex flex-col p-3 shadow "
                >
                  <header>
                    {' '}
                    <h1 className="text-xl">
                      {' '}
                      Create checklist For This item{' '}
                    </h1>{' '}
                  </header>
                  <input
                    type="text"
                    className="p-3 border-2 border-slate-500 w-full"
                    name="createListByItem"
                    placeholder="create new item"
                    onChange={inputHandler}
                  />

                  <button type="submit" className="p-3 border-2 bg-teal-400">
                    create item{' '}
                  </button>
                </form>
                <span>
                  {' '}
                  item name :{item?.name},item id {item?.id}
                </span>
                {item?.items &&
                  item?.items.map((checkListItems) => {
                    return (
                      <>
                        <ul className="flex flex-col border-4  border-slate-400 gap-3 3">
                          <li className="text-xl"> list item </li>
                          <li> checklist item name : {checkListItems.name} </li>
                          <li> checklist item id : {checkListItems.id} </li>
                          <li>
                            {' '}
                            checklist item status :{' '}
                            {checkListItems.itemCompletionStatus? "Completed" : "Uncompleted"}{' '}
                          </li>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              renameItemByCheckListId.mutate({
                                checkListId: item.id,
                                checkListItemId: checkListItems.id,
                                itemName: renameItemValue
                              });
                              setRenameItemValue("")
                              
                            }}
                          >
                            <input
                              type="text"
                              className="p-3  mx-3 border-2 border-slate-500"
                              name="renameItem"
                              placeholder="rename item"
                              onChange={renameInputHandler}
                              value={renameItemValue}
                            />
                            <button className="p-2 bg-teal-400">rename</button>
                          </form>
                          <button
                            className="bg-teal-400"
                            onClick={() =>
                              updateCheckListStatus.mutate({
                                checkListId: item.id,
                                checkListItemId: checkListItems.id
                              })
                            }
                          >
                            update{' '}
                          </button>
                          <button
                            className="bg-red-400"
                            onClick={() =>
                              deleteChecklistItemById.mutate({
                                checkListId: item.id,
                                checkListItemId: checkListItems.id
                              })
                            }
                          >
                            Delete Item
                          </button>
                        </ul>
                      </>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
};
export { CheckList };
