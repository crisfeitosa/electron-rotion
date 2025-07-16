import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Loading } from '../../components/Loading'
import { useSimulateLoading } from '../../hooks/useSimulateLoading'

export function Default() {
  // Simula loading por 3 segundos (remova esta linha em produção)
  const isLoading = useSimulateLoading(3000)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="h-screen w-screen text-rotion-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
