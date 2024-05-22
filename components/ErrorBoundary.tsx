import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  fallback: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  children: ReactNode
}

interface State {
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback(this.state.error, () =>
            this.setState({ error: null }),
          )
        : this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
