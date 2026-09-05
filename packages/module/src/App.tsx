import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestRoot from './entries/TestRoot';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestRoot />} />
      </Routes>
    </BrowserRouter>
  );
}
