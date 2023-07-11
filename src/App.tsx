import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container px-12 py-20">
      <div className="max-w-lg mx-auto">
        <NewTodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
