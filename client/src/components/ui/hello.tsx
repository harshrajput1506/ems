const Hello = () => {
    const date = new Date();
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <div className='flex justify-between h-14 items-center border-b border-zinc-200'>
          <div
            className='flex z-40 font-semibold text-lg'>
            <h1>Hello Admin.</h1>
          </div>

          <div className="flex z-40 text-sm">{date.toLocaleDateString()}</div>
          
        </div>
    
    </nav>
  )
}

export default Hello