import { Routes, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Chat } from './components/chat/Chat';
import { NotFound } from './components/not-found/NotFound';
import { EditUser } from './components/chat/users/EditUser';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <div className="App">
          <Routes>
          <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/chat' element={<Chat />} />
              <Route path='/edit' element={<EditUser />} />
            </Route>
          </Routes>
        </div>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
