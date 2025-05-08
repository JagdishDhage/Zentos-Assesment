import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, X, Edit, Check, Trash2 } from 'lucide-react';
import AddList from '../List/AddList';

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [tasksByList, setTasksByList] = useState({});
  const [loading, setLoading] = useState(true);
  const [newTaskText, setNewTaskText] = useState({});
  const [addingTaskToList, setAddingTaskToList] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [addingList, setAddingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const fetchBoardAndTasks = async () => {
      try {
        const boardRes = await axios.get(`http://localhost:3000/boards/${id}`, {
          withCredentials: true,
        });
        const boardData = boardRes.data.board || boardRes.data;
        setBoard(boardData);

        const tasksData = {};
        await Promise.all(
          boardData.lists.map(async (list) => {
            const taskRes = await axios.get(`http://localhost:3000/lists/${list._id}/tasks`);
            tasksData[list._id] = taskRes.data;
          })
        );

        setTasksByList(tasksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching board or tasks:', error);
        setLoading(false);
      }
    };

    fetchBoardAndTasks();
  }, [id]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const sourceListId = source.droppableId;
    const destListId = destination.droppableId;

    const sourceTasks = [...tasksByList[sourceListId]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceListId === destListId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasksByList({
        ...tasksByList,
        [sourceListId]: sourceTasks,
      });
    } else {
      const destTasks = [...tasksByList[destListId]];
      destTasks.splice(destination.index, 0, movedTask);
      setTasksByList({
        ...tasksByList,
        [sourceListId]: sourceTasks,
        [destListId]: destTasks,
      });
    }
  };

  const startAddingTask = (listId) => {
    setAddingTaskToList(listId);
    setNewTaskText({ ...newTaskText, [listId]: '' });
  };

  const cancelAddTask = () => {
    setAddingTaskToList(null);
  };

  const handleAddTask = (listId) => {
    const newTask = {
      _id: `temp-${Date.now()}`,
      title: newTaskText[listId],
      description: '',
      listId: listId,
    };

    setTasksByList({
      ...tasksByList,
      [listId]: [...(tasksByList[listId] || []), newTask],
    });

    setAddingTaskToList(null);
    setNewTaskText({ ...newTaskText, [listId]: '' });
  };

  const startEditingTask = (task) => {
    setEditingTask(task._id);
    setEditTaskText(task.title);
    setEditTaskDesc(task.description || '');
  };

  const cancelEditTask = () => {
    setEditingTask(null);
  };

  const handleEditTask = (listId, taskId) => {
    const updatedTasks = tasksByList[listId].map((task) =>
      task._id === taskId
        ? { ...task, title: editTaskText, description: editTaskDesc }
        : task
    );
    setTasksByList({
      ...tasksByList,
      [listId]: updatedTasks,
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (listId, taskId) => {
    const updatedTasks = tasksByList[listId].filter((task) => task._id !== taskId);
    setTasksByList({
      ...tasksByList,
      [listId]: updatedTasks,
    });
  };

  const handleAddList = () => {
    if (!newListName.trim()) return;

    const newList = {
      _id: `temp-list-${Date.now()}`,
      name: newListName,
    };

    setBoard({
      ...board,
      lists: [...board.lists, newList],
    });

    setTasksByList({
      ...tasksByList,
      [newList._id]: [],
    });

    setAddingList(false);
    setNewListName('');
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="text-xl text-blue-600 font-medium">Loading board...</div>
      </div>
    );

  if (!board)
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-xl text-red-600 font-medium">Board not found.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{board.name}</h2>
            {board.description && <p className="mt-1 text-gray-600">{board.description}</p>}
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <MoreHorizontal size={18} className="mr-1" />
            <span>Board Settings</span>
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {board.lists.map((list) => (
              <div key={list._id} className="flex-shrink-0 w-72">
                <div className="bg-gray-100 rounded-md shadow">
                  <div className="p-3 bg-gray-200 rounded-t-md flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">{list.name}</h3>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <Droppable droppableId={list._id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-2 min-h-64"
                      >
                        {tasksByList[list._id] && tasksByList[list._id].length > 0 ? (
                          tasksByList[list._id].map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white p-3 rounded mb-2 shadow-sm hover:shadow"
                                >
                                  {editingTask === task._id ? (
                                    <div className="space-y-2">
                                      <input
                                        type="text"
                                        value={editTaskText}
                                        onChange={(e) => setEditTaskText(e.target.value)}
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Task title"
                                      />
                                      <textarea
                                        value={editTaskDesc}
                                        onChange={(e) => setEditTaskDesc(e.target.value)}
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Description (optional)"
                                        rows="2"
                                      />
                                      <div className="flex justify-end space-x-2">
                                        <button
                                          onClick={cancelEditTask}
                                          className="p-1 text-gray-500 hover:text-gray-700"
                                        >
                                          <X size={16} />
                                        </button>
                                        <button
                                          onClick={() => handleEditTask(list._id, task._id)}
                                          className="p-1 text-green-500 hover:text-green-700"
                                        >
                                          <Check size={16} />
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="font-medium mb-1">{task.title}</div>
                                      {task.description && (
                                        <div className="text-sm text-gray-600 mb-2">
                                          {task.description}
                                        </div>
                                      )}
                                      <div className="flex justify-end space-x-2 mt-2">
                                        <button
                                          onClick={() => startEditingTask(task)}
                                          className="text-gray-400 hover:text-gray-700"
                                        >
                                          <Edit size={14} />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteTask(list._id, task._id)}
                                          className="text-gray-400 hover:text-red-500"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <div className="text-gray-500 text-sm text-center py-4">
                            No tasks in this list.
                          </div>
                        )}
                        {provided.placeholder}

                        {addingTaskToList === list._id ? (
                          <div className="bg-white p-3 rounded mb-2 shadow">
                            <input
                              type="text"
                              value={newTaskText[list._id] || ''}
                              onChange={(e) =>
                                setNewTaskText({
                                  ...newTaskText,
                                  [list._id]: e.target.value,
                                })
                              }
                              className="w-full p-2 border rounded text-sm mb-2"
                              placeholder="Enter task title"
                              autoFocus
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={cancelAddTask}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAddTask(list._id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={!newTaskText[list._id]}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => startAddingTask(list._id)}
                            className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-200 rounded text-sm"
                          >
                            <Plus size={16} className="mr-1" />
                            <span>Add a task</span>
                          </button>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}

            <div className="flex-shrink-0 w-72">
              {addingList ? (
                <div className="bg-gray-100 p-3 rounded-md shadow space-y-2">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="List name"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setAddingList(false)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddList}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      disabled={!newListName.trim()}
                    >
                      Add List
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingList(true)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-md p-3 w-full flex items-center text-gray-700"
                >
                  <Plus size={18} className="mr-2" />
                  <span>Add another list</span>
                </button>
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDetail;
