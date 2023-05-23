import { Link, Outlet, useLocation } from "react-router-dom";
import { actions } from "../features/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const userInput = useSelector((state) => state.todos.userInput);
  const dispatch = useDispatch();

  const handleCreateTodo = (e) => {
    e.preventDefault();
    dispatch(actions.createTodo());
  };

  const handleSetUserInput = (userInput) => {
    dispatch(actions.setUserInput({ userInput }));
  };

  return (
    <>
      <div className="container mx-auto border-2 ">
        <div className="row text-center p-10 bg-gray-800 text-white mb-3">
          <div className="col">
            <h1 className="text-5xl">What's the plan for today?</h1>
          </div>
        </div>

        <form className="flex gap-2 p-2 font-medium" onSubmit={handleCreateTodo}>
          <input type="text" value={userInput} onChange={(e) => handleSetUserInput(e.target.value)} placeholder="What to do" className="p-2 w-full border-neutral-300 border-solid border-2 rounded" autoFocus />
          <input type="submit" className="btn" value="Add" />
        </form>
        <nav>
          <ul className="flex gap-2 p-2">
            <li className={`bg-gray-500 hover:bg-gray-700 text-white px-3 rounded ${location.pathname === "/" ? "bg-gray-700" : ""}`}>
              <Link to="/">All</Link>
            </li>
            <li className={`bg-gray-500 hover:bg-gray-700 text-white px-3 rounded ${location.pathname === "/active" ? "bg-gray-700" : ""}`}>
              <Link to="/active">Active</Link>
            </li>
            <li className={`bg-gray-500 hover:bg-gray-700 text-white px-3 rounded ${location.pathname === "/completed" ? "bg-gray-700" : ""}`}>
              <Link to="/completed">Completed</Link>
            </li>
          </ul>
        </nav>
        <section className="p-2">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Layout;
