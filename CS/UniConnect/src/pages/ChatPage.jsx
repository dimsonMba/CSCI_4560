import CenterSide from '@/components/ChatBox/CenterSide'
import LeftSide from '@/components/ChatBox/LeftSide'
import RightSide from '@/components/ChatBox/RightSide'
import React from 'react'

function ChatPage() {
  return (
    <section>
        <div>
            <LeftSide/>
        </div>

        <div>
            <CenterSide/>
        </div>

        <div>
            <RightSide/>
        </div>
    </section>
  )
}

export default ChatPage
