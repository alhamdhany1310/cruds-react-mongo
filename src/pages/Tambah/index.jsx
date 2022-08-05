import Input from '../../components/Input';
import './index.scss';
import '../Home/index.scss';
import '../Detail/index.scss';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../utils/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Tambah = (props) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    stock: '',
  });
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [addImage, setAddImage] = useState(null);
  const [status, setStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setAddImage(image);
    // setFormValues(image);
  };

  const handleChecked = (e) => {
    const statu = e.target.checked;
    setStatus(statu);
    // setFormValues(statu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(formValues));

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('price', formValues.price);
    formData.append('stock', formValues.stock);
    formData.append('image', addImage);
    formData.append('status', status);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('https://task-express-mongo.herokuapp.com/api/v2/product', formData, config)
      .then(() => {
        swal({
          title: 'Berhasil!',
          text: `${formValues.name} Berhasil Di Tambah`,
          icon: 'success',
          button: 'OK',
        });
      })
      .catch((err) => {
        console.log('ini error disini', err);
      });
    setFormValues({
      name: '',
      price: '',
      stock: '',
    });
    setAddImage(null);
    setStatus(false);
    setSubmit(true);
  };

  useEffect(() => {
    // console.log(error);
    if (Object.keys(error).length === 0 && submit) {
      console.log(formValues);
    }
  });

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = '* Nama Harus di Isi';
    }
    if (!values.price) {
      errors.price = '* Harga Harus di isi';
    }
    if (!values.stock) {
      errors.stock = '* Stock Harus di Isi';
    }
    return errors;
  };
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>

        <br />
        <form>
          <ul>
            <li>
              <Input name="name" type="text" value={formValues.name} onChange={handleChange} placeholder="Nama Produk..." label="nama" />
              <span className="req">{error.name}</span>
            </li>
            <li>
              <Input name="price" type="number" value={formValues.price} onChange={handleChange} placeholder="Harga Produk..." label="Harga" />
              <span className="req">{error.price}</span>
            </li>
          </ul>
          <ul>
            <li>
              <Input name="stock" type="number" value={formValues.stock} onChange={handleChange} placeholder="Stock Produk..." label="Stock" />
              <span className="req">{error.stock}</span>
            </li>
            <li>
              <Input name="image" type="file" placeholder="Gambar Product" onChange={handleFile} label="Image" />
              <span className="req">{error.stock}</span>
            </li>
          </ul>
          <Input name="status" type="checkbox" onChange={handleChecked} label="Active" />
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
              <td className="text-center">
                <img src={product.image_url} alt="ini gambar yaaaaa" />
              </td>
              <td className="text-center">
                {/* <Link to="/detail" className="btn btn-sm btn-info">
                  Detail
                </Link> */}

                <button className="btn btn-sm btn-warning" onClick={() => navigate(`/edit/${product._id}`)}>
                  Edit
                </button>
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
