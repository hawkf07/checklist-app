import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Register } from './components/Register';
import { ListCheckList } from './components/getCheckList';
import { Login } from './components/Login';

import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Register token={token} setToken={setToken} />
        <Login token={token} setToken={setToken} />
        <ListCheckList token={token} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
