import CenterSide from '@/components/ChatBox/CenterSide'
import LeftSide from '@/components/ChatBox/LeftSide'
import RightSide from '@/components/ChatBox/RightSide'
import React from 'react'

function ChatPage() {
  return (
    <section className="flex flex-row w-full">
      <div className="w-[25%]">
        <LeftSide />
      </div>

      <div className="w-[70%]">
        <CenterSide />
      </div>

      <div className="w-[15%]">
        <RightSide />
      </div>
    </section>

  )
}

export default ChatPage
