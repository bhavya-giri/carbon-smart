import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Game from './pages/Game';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

  
const App = () => {
    // const user = useContext(UserContext);
  return (
        <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Homepage/>}/>
            <Route path={"/play"} element={<Game/>}/>
        </Routes>
      </BrowserRouter>
       <ReactQueryDevtools initialIsOpen={false} />
       <Toaster/>
    </QueryClientProvider>
  )
}

export default App;