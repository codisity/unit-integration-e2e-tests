export default function PageLayout({ children }) {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-80 min-h-[16rem]">
          <h1 className="text-3xl font-bold text-center">Rejestracja</h1>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </>
  )
}
