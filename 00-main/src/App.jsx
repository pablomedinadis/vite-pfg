import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessCard } from './AccessCard';
import { RegisterCard } from './RegisterCard';
import { Profile } from './Profile';
import { Contact } from './Contact';


export function App() {
    return (
        <BrowserRouter>
            <Routes>
              <>
                <Route path="/login" element={<AccessCard />} />
                <Route path="/register" element={<RegisterCard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path='/contact' element={<Contact />} />
              </>
            </Routes>
        </BrowserRouter>
    );
}

export default App;