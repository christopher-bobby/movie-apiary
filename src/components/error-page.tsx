const ErrorPage = ({ message = "" } : { message?: string }) => {
    return (
        <div>
            <h2>{message ? message : "Oh snap, there's an error on our end! We'll get back to you shortly"}</h2>
        </div>
    )
  };
  
  export default ErrorPage;
  