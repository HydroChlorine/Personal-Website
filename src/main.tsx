import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TypographyProvider } from './components/typography/Typography'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TypographyProvider>
      <App />
    </TypographyProvider>
  </StrictMode>,
)
