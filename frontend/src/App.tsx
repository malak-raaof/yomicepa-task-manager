import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <nav className="p-4 border-b bg-white flex items-center gap-4">
          <Link to="/" className="font-semibold">Task Manager</Link>
          <div className="ml-auto text-sm text-gray-500">Demo</div>
        </nav>
        <div className="p-4 max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}
