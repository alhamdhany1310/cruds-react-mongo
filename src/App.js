import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashbord from './pages/Dashbord';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Tambah from './pages/Tambah';

const App = () => {
  const [product, setProduct] = useState([]);
  const [search, setSeacrch] = useState('');
  const [dataList, setDataList] = useState({});

  const getDataApi = async () => {
    if (search) {
      const respons = await axios.get(`http://localhost:3000/api/v2/product?search=${search}`);
      setProduct(respons.data);
    } else {
      const respons = await axios.get(`http://localhost:3000/api/v2/product`);
      setProduct(respons.data);
    }
  };

  const postToApi = (adddata) => {
    console.log(adddata);
    axios
      .post(`http://localhost:3000/api/v2/product`, adddata)
      .then((res) => {
        setDataList(adddata);
        console.log(res);
      })
      .catch((er) => console.log(er));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v2/product/${id._id}`).then((res) => {
      getDataApi();
    });
  };

  const handleSearch = (ev) => {
    setSeacrch(ev.target.value);
  };
  useEffect(() => {
    getDataApi();
  }, [dataList, search]);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" exact={true} element={<Dashbord product={product} change={handleSearch} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/tambah" element={<Tambah product={product} change={handleSearch} diDelete={handleDelete} adddata={postToApi} />} />
      </Routes>
    </div>
  );
};

export default App;
