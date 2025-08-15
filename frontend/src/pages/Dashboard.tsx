import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function Dashboard() {
  const { user, signout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const load = async () => {
    const { data } = await api.get('/tasks');
    setTasks(data);
  };

  useEffect(() => { load(); }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/tasks', { title, description });
    setTitle(''); setDescription('');
    await load();
  };

  const toggle = async (t: Task) => {
    await api.put(`/tasks/${t.id}`, { completed: !t.completed });
    await load();
  };

  const remove = async (t: Task) => {
    await api.delete(`/tasks/${t.id}`);
    await load();
  };

  const startEdit = (t: Task) => {
    setEditingTask(t.id);
    setEditTitle(t.title);
    setEditDescription(t.description || '');
  };

  const saveEdit = async (id: number) => {
    await api.put(`/tasks/${id}`, {
      title: editTitle,
      description: editDescription
    });
    setEditingTask(null);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.fullName}</h1>
        <button className="text-sm underline" onClick={signout}>Logout</button>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="bg-white p-4 rounded-2xl shadow mb-6 space-y-2">
        <input
          className="w-full border rounded-xl p-2"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded-xl p-2"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="bg-black text-white rounded-xl px-4 py-2">Add Task</button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t)} />
            <div className="flex-1">
              {editingTask === t.id ? (
                <>
                  <input
                    className="w-full border rounded-xl p-1 mb-1"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full border rounded-xl p-1"
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-xl"
                      onClick={() => saveEdit(t.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-3 py-1 rounded-xl"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={"font-medium " + (t.completed ? "line-through text-gray-500" : "")}>
                    {t.title}
                  </div>
                  {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
                  <button
                    className="text-sm text-blue-600 mr-2"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600"
                    onClick={() => remove(t)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
