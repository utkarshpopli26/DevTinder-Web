import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import Feed from "./components/feed";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
          <Route path="/" element={<Body/>}>
                <Route path="/" element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
              <Route path="/login" element={<Login/>} />
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;