import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>🤔 What do you need for your trip? 🧐</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((itemObj) => (
          <Item itemProp={itemObj} key={itemObj.id} />
        ))}
        {/* Inside the map method, each of the elements will be an itemObj. 
        For each itemObj, what we want to render is an Item component. 
        Then, we pass in as a prop the entire itemObj. 
        So, Name of the component, Name of the prop={the object itself, which is also the argument for the callback function that iterates over this array} 
        (itemObj) => (
          <Item itemProp={itemObj} />
        )*/}
        {/* Another way to think of it:
        For each object inside initialItems,
       temporarily call the current object itemObj.
        Then render an Item component 
        and pass that current object into the component 
        using a prop named itemProp. */}
      </ul>
    </div>
  );
}

function Item({ itemProp }) {
  return (
    <li>
      <span style={itemProp.packed ? { textDecoration: "line-through" } : {}}>
        {itemProp.quantity} {itemProp.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed Y (Z%)</em>
    </footer>
  );
}
