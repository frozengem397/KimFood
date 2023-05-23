import React from 'react'
import { MenuItemList } from '../Components/Page/MenuItems'
import { Banner } from '../Components/Page/MenuItems/Common'

function Home() {
  return (
    <div>
        <div className = "container p-2">
          <Banner />
          <MenuItemList />

        </div>
    </div>
  )
}

export default Home