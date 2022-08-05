import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import swal from 'sweetalert';

const Edit = () => {
  const [addProduct, setAddProduct] = useState({
    name: '',
    price: '',
    stock: '',
  });
  // const [addName, setAddName] = useState('');
  // const [addprice, setAddPrice] = useState('');
  // const [addstock, setAddStock] = useState('');
  const [status, setStatus] = useState(false);
  const [addImage, setAddImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    const respons = await axios.get(`http://localhost:3000/api/v2/product/${id}`);
    console.log(respons.data);
    // setAddName(respons.data.name);
    // setAddPrice(respons.data.price);
    // setAddStock(respons.data.stock);
    // setStatus(respons.data.status);
    // setAddImage(respons.data.image_url);
    setAddProduct(respons.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct({ ...addProduct, [name]: value });
    console.log(addProduct);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setAddImage(image);
    // setAddProduct(image);
  };

  const handleChecked = (e) => {
    const statu = e.target.checked;
    setStatus(statu);
    // setAddProduct(statu);
  };

  const updateData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('image', addProduct.image);
    formData.append('name', addProduct.name);
    formData.append('price', addProduct.price);
    formData.append('stock', addProduct.stock);
    // formData.append('status', status);
    formData.append('image', addImage);
    // formData.append('name', addName);
    // formData.append('price', addprice);
    // formData.append('stock', addstock);
    formData.append('status', status);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .put(`https://task-express-mongo.herokuapp.com/api/v2/product/${id}`, formData, config)
      .then((res) => {
        swal({
          title: 'Berhasil!',
          text: `${addProduct.name} Berhasil Di Tambah`,
          icon: 'success',
          button: 'OK',
        });
      })
      .catch((err) => {
        console.log('error ini', err);
      });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" onChange={handleChange} value={addProduct.name} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" onChange={handleChange} value={addProduct.price} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" onChange={handleChange} value={addProduct.stock} />
          <Input name="image" type="file" placeholder="Gambar Product" label="Image" onChange={handleFile} />
          <Input name="status" type="checkbox" label="Active" onChange={handleChecked} />
          <button type="submit" onClick={updateData} className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
