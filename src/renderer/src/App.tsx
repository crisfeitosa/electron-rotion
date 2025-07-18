import './styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

import { Routes } from './Routes'

export function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
