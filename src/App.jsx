import { RenderAuthProvider } from './AuthContext.jsx';
import { RenderAuthForm } from './AuthForm.jsx';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <RenderAuthProvider>
        <RenderAuthForm />
      </RenderAuthProvider>
    </>
  )
}

export default App
