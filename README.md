## Simple Store for React

### Example:

```jsx
import { createStore } from "@arashes/simplestore";
import "./App.css";

const useText = createStore("hello");
const useNumber = createStore(0);

export default function App() {
  return (
    <div className="App">
      <h1>Hello Simple Store</h1>
      <NumberInput />
      <TextInput />
      <hr />
      <DisplayText />
      <DisplayNumber />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useText();

  return <input placeholder="test" type="text" onChange={(e) => setText(e.target.value)} value={text} />;
}

function NumberInput() {
  const [num, setNum] = useNumber();
  return <input type="number" value={num} onChange={(e) => setNum(+e.target.value)} />;
}

function DisplayText() {
  const [text] = useText();

  return <p>{text}</p>;
}

function DisplayNumber() {
  const [number] = useNumber();

  return <p>{number}</p>;
}

```
