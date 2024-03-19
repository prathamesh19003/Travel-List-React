import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";

function App() {
  const [item, setItem] = useState([]);
  function HandleAddItem(items) {
    setItem((item) => [...item, items]);
  }
  function deleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function toggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={HandleAddItem} />
      <PackingList
        item={item}
        onDeleteItem={deleteItem}
        onToggleItem={toggleItem}
      />
      <Stats items={item} />
    </div>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100
        ? "You have got everything! Ready to Go ✈️"
        : `You have ${totalItems} items on your list 📃, and you have already packed 
      ${packedItems}🧳 (${percentage}%)`}
    </footer>
  );
}
export default App;
