import type { GetServerSideProps, NextPage } from 'next'
import { FooterBanner, Product } from '../components'
import HeroBanner from '../components/HeroBanner'
import { client } from '../lib/client'



const Home = ({products, bannerData}: any) => (
    <>
    <HeroBanner heroBanner={bannerData[0]} />
    <div className='products-heading'>
      <h2>best selling products</h2>
      <p>Speakers of many variations</p>
    </div>
    <div className='products-container'>
    {
    products.map((product: any) => <Product key={product._id} product={product} />)
    }
    </div> 
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )


export const getServerSideProps: GetServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);




  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);


  return {
    props: { products, bannerData }
  }
}

export default Home
