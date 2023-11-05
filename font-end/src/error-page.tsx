import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: unknown = useRouteError();
  //console.error(error);
  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      console.log(error.statusText)
      // ...
    }
    else if (error.status === 404) {
      console.log(error.status)
      // ...
    }
  }
  
  
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
      <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  );
}