import { Link } from 'react-router-dom';
import './index.scss';
import { numberWithCommas } from '../../utils/utils';

const Home = (props) => {
  return (
    <div>
      <div className="main">
        <Link to="/tambah" className="btn btn-primary">
          Tamah Produk
        </Link>
        <div className="search">
          <input type="text" placeholder="Masukan kata kunci..." onChange={props.change} />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Image</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.product.map((product, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{product.name}</td>
                <td className="text-center">Rp. {numberWithCommas(product.price)}</td>
                <td className="text-center">{product.stock}</td>
                <td className="text-center">image</td>
                <td className="text-center">
                  <Link to="/detail" className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to="/edit" className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="#" className="btn btn-sm btn-danger">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
