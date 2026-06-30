## Controlled Elements

Controlled elements are form elements where React manages the value through state instead of letting the DOM manage it independently.

The basic pattern for a controlled element is:

1. Define a piece of state.
2. Connect that state to the form element using the `value` attribute.
3. Update the state with an `onChange` handler.

Example:

```jsx
const [description, setDescription] = useState("");

<input value={description} onChange={(e) => setDescription(e.target.value)} />;
```

The `onChange` event runs every time the user types into the input.

The inline function:

```jsx
(e) => setDescription(e.target.value);
```

gets the current input value from `e.target.value` and saves it into React state.

Important note: `e.target.value` is always returned as a string, even when working with numbers. If the value needs to be stored as a number, convert it first:

```jsx
onChange={(e) => setQuantity(Number(e.target.value))}
```

---

## State vs. Props

### State

State is internal data owned by a component.

A good way to think about state is as the component's memory. It represents data that can change over time and cause the component to re-render.

State:

1. Is internal data owned by the component.
2. Acts like component memory.
3. Can be updated by the component itself.
4. Causes the component to re-render when updated.
5. Is used to make components interactive.

Example:

```jsx
const [description, setDescription] = useState("");
```

In this example, `description` is the current state value, and `setDescription` is the function used to update that state.

### Props

Props are external data passed from a parent component to a child component.

A good way to think about props is that they are similar to function parameters. The parent component gives the child component the information it needs.

Props:

1. Are external data owned by the parent component.
2. Are passed down to child components.
3. Are read-only inside the child component.
4. Can cause a child component to re-render when the parent passes updated props.
5. Are used by a parent to configure child components.

Example:

```jsx
<PackingList items={items} />
```

In this example, the parent component passes the `items` state down to `PackingList` as a prop.

Something important to keep in mind: whenever a piece of state is passed as a prop, updating that state causes both the component that owns the state and the component receiving that state as a prop to re-render.

---

## Lifting State Up

Lifting state up means moving state to the closest parent component that needs to share that state with multiple child components.

In the travel list app, the `Form` component needs to create new items, while the `PackingList` component needs to display those items. Since these components are siblings, the shared `items` state should live in their parent component, `App`.

Example:

```jsx
function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((currentItems) => [...currentItems, item]);
  }

  return (
    <div className="app">
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
    </div>
  );
}
```

In this example:

1. `App` owns the `items` state.
2. `Form` receives the `handleAddItems` function as a prop.
3. `PackingList` receives the `items` array as a prop.
4. When the form submits a new item, it sends that item up to `App`.
5. `App` updates the `items` state.
6. React re-renders the UI with the updated list.

This allows multiple components to work with the same data in a predictable way.

---

## Updating Arrays Immutably

React state should be treated as immutable. This means we should not directly change the existing state value.

Instead of mutating the original array, we create a new array and give that new array to React.

### Adding an Item

To add an item to an array in state, we can use the spread operator:

```jsx
function handleAddItems(item) {
  setItems((currentItems) => [...currentItems, item]);
}
```

This means:

1. Take the current `items` array.
2. Create a new array.
3. Copy all existing items into the new array.
4. Add the new item to the end.
5. Set state to the new array.

This does not mutate the original array.

---

## Deleting an Item with `filter()`

To delete an item from an array in state, we can use the `filter()` method.

Example:

```jsx
function handleDeleteItem(idToDelete) {
  setItems((currentItems) =>
    currentItems.filter((item) => item.id !== idToDelete),
  );
}
```

This means:

1. `handleDeleteItem` receives the `id` of the item to delete.
2. `setItems` updates the `items` state.
3. React provides the current state array as `currentItems`.
4. `filter()` creates a new array.
5. Each item is checked to see if its `id` does not match `idToDelete`.
6. Items that do not match are kept.
7. The item with the matching `id` is removed from the new array.
8. React sets `items` to the new filtered array.

A longer version of the same logic is:

```jsx
function handleDeleteItem(idToDelete) {
  setItems((currentItems) => {
    const updatedItems = currentItems.filter((item) => {
      return item.id !== idToDelete;
    });

    return updatedItems;
  });
}
```

This longer version makes it easier to see what is happening:

- `currentItems` is the current state array.
- `updatedItems` is the new array returned by `filter()`.
- The returned array becomes the new `items` state.

The important idea is that we are not directly deleting from the original array. We are creating a new array that contains every item except the one we want to remove.

---

## Understanding `currentItems`

In this pattern:

```jsx
setItems((currentItems) =>
  currentItems.filter((item) => item.id !== idToDelete),
);
```

`currentItems` is a parameter name. It represents the current value of the `items` state at the moment React performs the update.

It is not a special React keyword. It could technically be named anything, but `currentItems` is a clear name because it describes what the value represents.

For example, this would also work, but it would be less clear:

```jsx
setItems((array) => array.filter((item) => item.id !== idToDelete));
```

The better version is:

```jsx
setItems((currentItems) =>
  currentItems.filter((item) => item.id !== idToDelete),
);
```

because it clearly communicates that we are working with the current version of the `items` state.

---

## Key Takeaway

The travel list became interactive by moving the `items` array into React state and lifting that state up to the `App` component.

The `Form` component creates new items and sends them up to `App`. The `PackingList` component receives the current items as props and renders them. When items are added or deleted, React updates state using a new array instead of mutating the existing one.

The core pattern is:

```txt
Current state array
→ create a new array
→ update state
→ React re-renders the UI
```
