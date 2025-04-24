import CenterSide from '@/components/ChatBox/CenterSide'
import LeftSide from '@/components/ChatBox/LeftSide'
import RightSide from '@/components/ChatBox/RightSide'
import React from 'react'

function ChatPage() {
  return (
    <section className="flex flex-row h-screen w-screen bg-gray-50">
      {/* Left sidebar - Contacts/Conversations list */}
      <div className="w-[25%] border-r border-gray-200 bg-white overflow-y-auto">
        <LeftSide />
      </div>

      {/* Main chat area */}
      <div className="w-[50%] flex flex-col border-r border-gray-200">
        <CenterSide />
      </div>

      {/* Right sidebar - User profile/chat details */}
      <div className="w-[25%] overflow-y-auto">
        <RightSide />
      </div>
    </section>
  )
}

export default ChatPage