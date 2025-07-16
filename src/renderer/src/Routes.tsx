import { Route } from 'react-router-dom'

import { Blank } from './pages/blank'
import { Router } from '../../lib/electron-router-dom'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Blank />} />
        </>
      }
    />
  )
}
