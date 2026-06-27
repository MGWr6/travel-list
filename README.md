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

Difference between state and props?
State vs props

State:

1. Internal data, owned by the component
2. Component "memory"
3. Can be updated by the component itself
4. Updating state cuases the component to re-render
5. Used to make components interactive

Props:

1. External data, owned by the parent component (similar to function parameters)
2. Read-only
3. Receiving new props causes the component to re-render (usually when the parent's state has been updated)
4. Used by parent to configure child components ('settings')

Something to keep in mind - whenever a piece of state is passed as a prop, when that state updates, both components are re-rendered. Both the components owning the state and the component receiving the state as a prop are re-rendered.
