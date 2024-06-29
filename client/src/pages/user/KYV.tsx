import Hello from '@/components/ui/hello'
import Sidebar  from '../../components/ui/Sidebar'

const KYV = () => {
  return (
    <div className="min-h-screen flex flex-col w-dvw md:flex-row">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="px-4 m-4 w-10/12">
      <div ><Hello /></div>
      
    </div>
    </div>
  )
}

export default KYV