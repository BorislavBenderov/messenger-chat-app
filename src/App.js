import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Chat } from './components/chat/Chat';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Login />
      </div>
    </AuthContextProvider>
  );
}

export default App;
