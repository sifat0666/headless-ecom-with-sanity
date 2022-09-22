import { Http2ServerResponse } from 'http2'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

type HeroBannerInterface = {
  _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    buttonText: string,
    desc: string,
    discount: string,
    image: { _type: string, asset: [Object] },
    largeText1: string
    largeText2: string,
    midText: string,
    product: string,
    saleTime: string,
    smallText: string
}

const HeroBanner = ({ heroBanner }: any) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image).url()} alt="headphones" className="hero-banner-image" />

        <div>
          {/* <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link> */}
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner