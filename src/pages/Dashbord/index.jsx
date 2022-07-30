import React from 'react';
import './style.css';
import { numberWithCommas } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const Dashbord = (props) => {
  let navigasi = useNavigate();
  return (
    <div className="main">
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={props.change} />
      </div>
      <section className="cards1">
        {props.product.map((product, index) => (
          <article key={index} className="card1 card--1">
            <div className="card__info-hover">
              <svg className="card__like" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                />
              </svg>
            </div>
            <div className="card__img"></div>
            <a href="#" className="card_link">
              <img src={product.image_url} className="card__img--hover" alt="" />
            </a>
            <div className="card__info">
              <h3 className="card__title">{product.name}</h3>
              <span className="card__category">Rp. {numberWithCommas(product.price)}</span>
              <p>stock : {product.stock}</p>
              <button onClick={() => navigasi(`/detail/${product._id}`)} className="button b-orange">
                Lihat Product
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Dashbord;
