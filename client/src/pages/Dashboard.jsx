import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
// 2. TỐI ƯU: Dùng api instance thay vì axios thường
import api from "../lib/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsLoading(true);
    try {
      await api.post("/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      toast.success("Thêm công việc thành công!");
      fetchTasks();
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Lỗi khi tạo công việc");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed });
      // UI Update Optimistic: Cập nhật giao diện ngay lập tức cho mượt
      setTasks(tasks.map((t) => (t._id === id ? { ...t, completed } : t)));
      toast.success("Đã cập nhật trạng thái!");
    } catch (error) {
      toast.error("Lỗi cập nhật.");
      console.log(error);
      fetchTasks(); // Nếu lỗi thì load lại data cũ
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id)); // Xóa ngay trên UI
      toast.success("Đã xóa công việc!");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Lỗi khi xóa.");
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Xin chào, {user ? user.username : "Guest"}! 👋
        </h2>
        <p className="text-base-content/70">
          Quản lý công việc của bạn một cách hiệu quả.
        </p>
      </div>

      {/* Form add Task */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h3 className="card-title text-lg mb-2">Thêm công việc mới</h3>
          <form
            onSubmit={handleCreateTask}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Tiêu đề công việc..."
              className="input input-bordered input-primary w-full"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mô tả (tùy chọn)..."
              className="input input-bordered w-full sm:w-1/3"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
            </button>
          </form>
        </div>
      </div>

      {/* Danh sách Task */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b pb-2 mb-4 border-base-300">
          Danh sách ({tasks.length})
        </h3>

        {tasks.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <p>Chưa có công việc nào. Hãy thêm một cái nhé!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`alert shadow-lg transition-all duration-300 ${
                task.completed ? "bg-base-200 opacity-70" : "bg-base-100"
              }`}
            >
              {/* Checkbox */}
              <div className="flex items-start gap-4 w-full">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1"
                  checked={task.completed}
                  onChange={() => handleUpdateTask(task._id, !task.completed)}
                />

                {/* Nội dung */}
                <div className="flex-1">
                  <h4
                    className={`font-bold text-lg ${
                      task.completed ? "line-through text-base-content/50" : ""
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p
                      className={`text-sm ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Badge trạng thái */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {task.completed ? (
                    <div className="badge badge-success gap-2 text-white">
                      Xong
                    </div>
                  ) : (
                    <div className="badge badge-warning gap-2">Chờ</div>
                  )}

                  {/* Nút xóa */}
                  <button
                    className="btn btn-square btn-sm btn-ghost text-error hover:bg-error/10"
                    onClick={() => handleDeleteTask(task._id)}
                    title="Xóa công việc"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
