import Hello from '@/components/ui/hello'
import VotingPage from '@/components/ui/VotingPage'
import { Sidebar } from 'lucide-react'

const ElectionPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="px-4 m-4">
      <div ><Hello /></div>
      <div>
        <VotingPage/>
    </div>
    </div>
    </div>
  )
}

export default ElectionPage