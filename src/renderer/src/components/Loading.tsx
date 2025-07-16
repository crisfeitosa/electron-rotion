export function Loading() {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-rotion-900">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rotion-300"></div>
        <h1 className="text-2xl font-semibold text-rotion-200">
          Loading Rotion...
        </h1>
        <p className="text-rotion-400 text-sm">Preparing your workspace</p>
      </div>
    </div>
  )
}
