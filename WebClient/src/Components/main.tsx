import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TextField from './TextField.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TextField />
  </StrictMode>,
)
