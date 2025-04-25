import React from 'react'
import LeftSide from '@/components/ChatBox/LeftSide'
import CenterSide from '@/components/ChatBox/CenterSide'
import RightSide from '@/components/ChatBox/RightSide'

function ChatPage() {
  return (
    <section className="flex h-screen w-screen bg-gray-50">
      {/* Left sidebar – contacts */}
      <div className="w-[25%] border-r border-gray-200 bg-white overflow-hidden flex flex-col">
        <LeftSide />
      </div>

      {/* Main chat */}
      <div className="w-[50%] flex flex-col border-r border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100">
        <CenterSide />
      </div>

      {/* Right sidebar – profile */}
      <div className="w-[25%] overflow-hidden bg-white shadow-inner">
        <RightSide />
      </div>
    </section>
  )
}

export default ChatPage