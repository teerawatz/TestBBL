import { Outlet, Link } from "react-router-dom";

export default function Root() {
  //const configValue: string = (process.env.REACT_APP_API_URL as string);
  //console.log(configValue)
    return (
      <>
        <div id="sidebar">
          <h1>React Router</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
           
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`users`}>Users</Link>
              </li>
              <li>
                <Link to={`posts`}>Posts</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">

          <Outlet />
        </div>
      </>
    );
  }