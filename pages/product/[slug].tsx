import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useStateContext } from './../../context/stateContext';
// import { ParsedUrlQuery } from 'querystring';

const ProductDetails = ({ product, products }: any) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {  onAdd, toggleQuantity } = useStateContext();


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index]).url()} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item: any, i: any) => (
              <img 
                key={i}
                src={urlFor(item).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={()=>toggleQuantity(product, -1)}><AiOutlineMinus /></span>
              <span className="num">{`1`}</span>
              <span className="plus" onClick={()=>toggleQuantity(product, +1)} ><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=> onAdd(product, 1)} >Add to Cart</button>
            <button type="button" className="buy-now" >Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item: any) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}






export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const {slug}: any = params

   const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);



  return {
    props: { products, product }
  }
}

export default ProductDetails
