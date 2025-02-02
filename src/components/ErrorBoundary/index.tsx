import React, { Component, ErrorInfo, ReactNode } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong. 🚨</h2>
          <p>Please refresh the page or try again later.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = () => {
  const error = useRouteError(); // Get the error from React Router

  console.error('Caught by ErrorBoundary:', error);

  let errorMessage = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    // Error comes from a failed route request
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    // Error is a JavaScript Error object
    errorMessage = error.message;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Oops! Something went wrong. 😢🩺</h2>
      <p>{errorMessage}</p>
      <a href='/'>Go back home</a>
    </div>
  );
};
