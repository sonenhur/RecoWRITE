import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


import Nav from './Nav';
import Home from './Home';
import Reco from './Reco';
import Print from './Print';
import Loading from './Loading';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className='relative w-full'>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Reco' element={<Reco />} />
            <Route path='/Print' element={<Print />} />
            <Route path='/Loading' element={<Loading />} />
          </Routes>       
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
