import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "../pages/Demo";
import Layout from "../pages/Layout";
import Kernel from "../pages/Kernel";
import Model from "../pages/Model";
import TrainTest from "../pages/TrainTest";
import Visualization from "../pages/Visualization";
import Counter from "../pages/Counter"
import TextInput from "../pages/TextInput";
import Timer from "../pages/Timer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Demo />} />
        <Route path="/" element={<Layout />}>
          <Route path="kernel" element={<Kernel />} />
          <Route path="model" element={<Model />} />
          <Route path="traintest" element={<TrainTest />} />
          <Route path="visualize" element={<Visualization />} />
          <Route path="counter" element={<Counter />} />
          <Route path="textinput" element={<TextInput />} />
          <Route path="timer" element={<Timer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
