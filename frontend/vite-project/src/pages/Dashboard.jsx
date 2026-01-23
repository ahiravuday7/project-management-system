import React, { useState, useEffect } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [activeColumnId, setActiveColumnId] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success, danger
  });

  // Fetch boards
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await api.get("/boards");
        setBoards(res.data);
      } catch (error) {
        setError(`Failed to fetch boards ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  // Fetch columns + tasks
  useEffect(() => {
    if (!selectedBoard) return;

    const fetchBoardData = async () => {
      try {
        setTaskLoading(true);
        const [colRes, taskRes] = await Promise.all([
          api.get(`/columns/${selectedBoard._id}`),
          api.get(`/tasks/${selectedBoard._id}`),
        ]);
        setColumns(colRes.data);
        setTasks(taskRes.data);
      } catch (error) {
        setError(`Failed to load board data`);
      } finally {
        setTaskLoading(false);
      }
    };
    fetchBoardData();
  }, [selectedBoard]);

  // Create a new board
  const handleCreateBoard = async () => {
    if (!boardName.trim()) return;

    try {
      const res = await api.post("/boards", {
        name: boardName,
        description: boardDescription,
      });

      setBoards([...boards, res.data]);
      setToast({
        show: true,
        message: "Board created successfully",
        type: "success",
      });
      setBoardName("");
      setBoardDescription("");
      setShowModal(false);
    } catch (error) {
      setToast({
        show: true,
        message: `Failed to create board: ${error.message}`,
        type: "danger",
      });
    }

    // Close the toast after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 3000);
  };

  // Filter tasks by column
  const getTasksByColumn = (columnId) => {
    return tasks.filter((task) => task.columnId === columnId);
  };

  //create task handler (create task in column)
  const handleCreateTask = async (columnId) => {
    if (!taskTitle.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: taskTitle,
        description: taskDescription,
        assignee,
        boardId: selectedBoard._id,
        columnId: activeColumnId,
      });
      setTasks((prev) => [...prev, res.data]);

      // reset task
      setTaskTitle("");
      setTaskDescription("");
      setAssignee("");
      setActiveColumnId(null);
      setShowModal(false);
    } catch (error) {
      setToast({
        show: true,
        message: `Failed to create task!`,
        type: "danger",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "calc(100vh - 56px)" }}>
        {/* {sidebar} */}
        <div className="col-3 bg-light border-end p-3">
          <h5 className="mb-5">Boards</h5>

          {loading && <p>Loading boards...</p>}
          {error && <p className="text-danger">{error}</p>}

          {/* {Empty State Message} */}
          {!loading && boards.length === 0 && (
            <p className="text-muted">
              No boards found. Create one to get started!
            </p>
          )}

          <ul className="list-group mt-3">
            {boards.map((board) => (
              <li
                key={board._id}
                className={`list-group-item ${
                  selectedBoard?._id === board._id ? "active" : ""
                }`}
                onClick={() => setSelectedBoard(board)}
                style={{ cursor: "pointer" }}
              >
                {board.name}
              </li>
            ))}
          </ul>

          <button
            className="btn btn-warning w-100 mt-3 "
            onClick={() => setShowModal(true)}
          >
            + Create Board
          </button>
        </div>

        {/* {main content} */}
        <div className="col-9 p-4">
          {!selectedBoard ? (
            <h4>Select a board to view task</h4>
          ) : (
            <>
              <h4>{selectedBoard.name}</h4>
              <p className="text-muted">{selectedBoard.description}</p>

              {/* {design to get column and tasks} */}
              <div className="row mt-3">
                {columns.map((col) => (
                  <div className="col-4" key={col._id}>
                    <div className="card">
                      <div className="card-header fw-bold text-center">
                        {col.name}
                      </div>
                      <div className="card-body" style={{ minHeight: "300px" }}>
                        {/* {Create a button to add a task} */}
                        <button
                          className="btn btn-sm btn-outline-primary w-100 mb-3"
                          onClick={() => {
                            setActiveColumnId(col._id);
                            setShowTaskModel(true);
                          }}
                        >
                          + Add Task
                        </button>
                        {taskLoading ? (
                          <p className="text-center text-muted">
                            Loading tasks...
                          </p>
                        ) : getTasksByColumn(col._id).length === 0 ? (
                          <p className="text-center text-muted">
                            No tasks found
                          </p>
                        ) : (
                          getTasksByColumn(col._id).map((task) => (
                            <div key={task._id} className="card mb-2 shadow-sm">
                              <div className="card-body p-2">
                                <h6 className="mb-1">{task.title}</h6>
                                <p className="text-muted">{task.description}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* {board create logic} */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Board</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={boardName}
                    placeholder="Board Name"
                    onChange={(e) => setBoardName(e.target.value)}
                  />
                  <textarea
                    className="form-control"
                    placeholder="Board Description"
                    rows="3"
                    value={boardDescription}
                    onChange={(e) => setBoardDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="model-footer p-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary ms-2"
                    onClick={handleCreateBoard}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* {Display toast} */}
      {toast.show && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1000 }}
        >
          <div className={`toast show text-bg-${toast.type}`}>
            <div className="toast-body">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
