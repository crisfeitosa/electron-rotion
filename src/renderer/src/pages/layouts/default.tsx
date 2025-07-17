import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Loading } from '../../components/Loading'
import { useSimulateLoading } from '../../hooks/useSimulateLoading'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Simula loading por 3 segundos (remova esta linha em produção)
  const isLoading = useSimulateLoading(3000)

  if (isLoading) {
    return <Loading />
  }

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen bg-rotion-900 text-rotion-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
