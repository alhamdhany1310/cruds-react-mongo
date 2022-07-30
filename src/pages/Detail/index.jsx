import './index.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  let id = params.id;
  const getByid = () => {
    axios.get(`https://task-express-mongo.herokuapp.com/api/v2/product/${id}`).then((res) => {
      setDetail(res.data);
    });
  };
  useEffect(() => {
    getByid();
  }, [detail]);

  return (
    <div>
      <section>
        <header></header>
        <div data-product-detail>
          <div class="img-card">
            <div class="img">
              <i class="far fa-heart"></i>
              <img src={detail.image_url} />
            </div>
          </div>
          <div class="product-details">
            <h2>{detail.name}</h2>
            <p>Men Black Silk Bow Tie</p>
            <p>
              <i class="fas fa-star"></i>4.5 | <span>2.5k reviews</span>
            </p>
            <p>Harga</p>
            <p>
              <span>Rp. {detail.price}</span>
            </p>
            <p>Stock Tersedia {detail.stock}</p>
            <button className="buton">Buy Now</button>
            <button className="buton">Add To Bag</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
