import React, { Component } from 'react'

/**
 * Global Application Error Boundary
 * Prevents white-screen crashes and renders an elegant recovery UI
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Thamili AI ErrorBoundary]:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#090d16',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            padding: '36px 40px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            maxWidth: '460px',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(135deg, #ff2a85, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Thamili AI Studio
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
              A rendering notice occurred. Click below to continue smoothly.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              style={{
                padding: '12px 32px',
                borderRadius: '999px',
                border: 'none',
                background: 'linear-gradient(135deg, #ec4899, #3b82f6)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(236, 72, 153, 0.35)',
                transition: 'transform 0.2s ease'
              }}
            >
              Reload Studio
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
