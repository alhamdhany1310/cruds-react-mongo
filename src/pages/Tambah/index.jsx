import Input from '../../components/Input';
import './index.scss';
import '../Home/index.scss';
import '../Detail/index.scss';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/utils';
import { useState } from 'react';

const Tambah = (props) => {
  const [proControl, setProControl] = useState({
    name: '',
    price: '',
    stock: '',
    status: false,
    image: '',
  });
  const [kosong, setKosong] = useState('');

  const handleChange = (e) => {
    let newProControl = { ...proControl };
    newProControl[e.target.name] = e.target.value;
    setProControl(newProControl);
  };

  const handleClick = (e) => {
    let copyAdd = { ...proControl };
    copyAdd[e.target.name] = e.target.checked;
    setProControl(copyAdd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (proControl.name.length === 0) {
      setKosong("Name Can't be Empty!");
    } else if (proControl.price.length === 0) {
      setKosong("Price Can't be Empty!");
    } else if (proControl.stock.length === 0) {
      setKosong("Stock Can't be Empty!");
    } else {
      console.log(proControl);
      props.adddata({ ...proControl, image: '' });
      setProControl({
        name: '',
        price: '',
        stock: '',
        status: false,
        image: '',
      });
      setKosong('');
    }
  };

  return (
    <div className="main">
      <div className="car">
        <h2>Tambah Produk</h2>
        {kosong ? <p className="warning">*{kosong}</p> : ''}
        <br />
        <form>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={proControl.name} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={proControl.price} onChange={handleChange} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={proControl.stock} onChange={handleChange} />
          <Input name="image" type="file" placeholder="Gambar Product" label="Image" value={proControl.image} onChange={handleChange} />
          <Input name="status" type="checkbox" label="Active" onClick={handleClick} value={proControl.status} />
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Simpan
          </button>
        </form>
      </div>
      {/* <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link> */}
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
                <button className="btn btn-sm btn-danger" onClick={() => props.diDelete(product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tambah;
