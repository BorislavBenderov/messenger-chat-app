import { Routes, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Chat } from './components/chat/Chat';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <div className="App">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </div>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
