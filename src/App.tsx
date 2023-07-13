import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import { useAppSelector } from "./hooks";

function App() {
  const { error, loading } = useAppSelector((state) => state.todos);

  return (
    <div className="container px-12 py-20">
      <div className="max-w-2xl mx-auto">
        <NewTodoForm />
        {loading && <h2>Loading ...</h2>}
        {error && (
          <h2 className="my-10 font-bold text-2xl text-rose-500">An error occured: {error}</h2>
        )}
        <TodoList />
      </div>
    </div>
  );
}

export default App;
