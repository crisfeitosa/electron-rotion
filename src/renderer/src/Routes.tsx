import { Route } from 'react-router-dom'
import { Router } from '../../lib/electron-router-dom'

import { Blank } from './pages/blank'
import { Document } from './pages/document'
import { Loading } from './components/Loading'
import { Default } from './pages/layouts/default'

export function Routes() {
  return (
    <Router
      _providerProps={{
        fallbackElement: <Loading />,
      }}
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  )
}
