import { useState } from "react";
import "../components/Admin/adminView.css";
import Help from "../components/Admin/Help";
import UserList from "../components/Admin/UserList";
import ProductList from "../components/Admin/ProductList";
import ProductForm from "../components/Admin/ProductForm";

const AdminView = () => {
  const [help, setHelp] = useState(true);
  const [productList, setProductList] = useState(false);
  const [productForm, setProductForm] = useState(false);
  const [userList, setUserList] = useState(false);

  const handleProductList = () => {
    setHelp(false);
    setProductList(true);
    setProductForm(false);
    setUserList(false);
  };

  const handleProductForm = () => {
    setHelp(false);
    setProductList(false);
    setProductForm(true);
    setUserList(false);
  };

  const handleUserList = () => {
    setHelp(false);
    setProductList(false);
    setProductForm(false);
    setUserList(true);
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center container my-2 mt-4">
      <section className="d-flex justify-content-center row w-100">
        <div className="col-12 col-md-6 col-lg-4 m-1 px-1">
          <button
            onClick={handleProductList}
            className="btn btn-admin w-100 h-100"
          >
            Ver productos
          </button>
        </div>
        <div className="col-12 col-md-6 col-lg-4 my-1 px-1">
          <button
            onClick={handleProductForm}
            className="btn btn-admin w-100 h-100"
          >
            Cargar productos
          </button>
        </div>
        <div className="col-12 col-md-6 col-lg-4 my-1 px-1">
          <button
            onClick={handleUserList}
            className="btn btn-admin w-100 h-100"
          >
            Ver usuarios
          </button>
        </div>
      </section>
      <section className="w-100">
        {help === true && <Help />}
        {productList === true && <ProductList />}
        {productForm === true && <ProductForm />}
        {userList === true && <UserList />}
      </section>
    </div>
  );
};

export default AdminView;
