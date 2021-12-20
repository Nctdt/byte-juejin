import React from 'react'

interface Props {
  errView: React.ReactNode
}
export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    console.log('捕获到错误')
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.errView
    }

    return this.props.children
  }
}
