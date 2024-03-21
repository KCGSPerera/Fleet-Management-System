import Header from './Components/Header';
import { Outlet } from 'react-router-dom';

export default function App() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}