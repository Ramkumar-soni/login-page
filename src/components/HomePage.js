import React from 'react'

const HomePage = () => {
  return (
    <div className='home-page-wrapper'>
      {
        window.innerWidth < 772 ? <img className='banner-img' src="https://thehouseofrare.com/cdn/shop/files/linen_MWEB_da7ca099-dc04-4c4f-b154-bc28cd214622.png?v=1745573179" alt='mobile-banner-image' /> : <img className='banner-img' src="https://thehouseofrare.com/cdn/shop/files/trousers_88ebeb43-8fcc-41f7-b64b-7790436754d3_1900x.png?v=1735288556" alt='desktop-banner-image' />
      }
    </div>
  )
}

export default HomePage