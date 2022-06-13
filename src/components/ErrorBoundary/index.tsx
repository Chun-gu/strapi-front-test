import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: Props | Readonly<Props>) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  public static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log('에러바운더리 에러', { error, errorInfo });
  }
  public render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
