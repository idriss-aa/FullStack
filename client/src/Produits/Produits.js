import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Produits.css';
import Header from './../Header';
import langue from './../img/i18.png';
import ProduitsListe from './ProduitsListe';
import PopUpProduct from './PopUpProduct';
import { addNewProduct, editaProduct, fetchProducts, deleteaProduct } from '../redux/reducers/products';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categories';
import processPlugins from 'tailwindcss/lib/util/processPlugins';


function Produits() {

  const { id } = useParams();

  const [lang, setSelectedLang] = useState("fr");
  const [currentProduct, setCurrentProduct] = useState(0);
  const [showProduct, setShowProduct] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState({});
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [selectedProductDesc, setSelectedProductDesc] = useState({});
  const [selectedProductCat, setSelectedProductCat] = useState([]);
  const [params, setParams] = useState("");
  const [deleted, setDeleted] = useState(false);

  function handleProductChange(newValue) {
    setCurrentProduct(newValue.id);
    setSelectedProductName(newValue.title);
    setSelectedProductPrice(newValue.price);
    setSelectedProductCat(newValue.categories);
    setSelectedProductDesc(newValue.description);
    setShowProduct(1);
  }

  function handleShowProduct(value) {
    setShowProduct(value);
  }

  //input nom produit
  function handleInputNameChange(newValue) {
    setSelectedProductName(newValue);
  }

  //input prix produit
  function handlePriceChange(newValue) {
    setSelectedProductPrice(newValue);
  }

  //input categories produit
  function handleCatChange(newValue) {
    setSelectedProductCat(newValue);
  }

  //input description produit
  function handleDescChange(newValue) {
    setSelectedProductDesc(newValue);
  }

  //bouton modifier produit
  function editProductDetails(product) {
    editaProduct(product,currentProduct);
    handleShowProduct(0);
  }

  //bouton supprimer produit
  function deleteProduct(id) {
    deleteaProduct(id);
    setDeleted(!deleted);
  }

  //Bouton Ajouter Produit
  function newProduct() {
    handleShowProduct(2);
  }

	const userID = JSON.parse(localStorage.getItem("userID"));
  const user = JSON.parse(localStorage.getItem('userObject'));

  //bouton cree Produit
  function createProduct(prod) {
    let product = {
      "userId": userID,
      "StoreId": id,
      "title": prod.title,
      "description": prod.description,
      "categories": prod.categories,
      "price": prod.price
    }
    addNewProduct(product);
    handleShowProduct(0);
  }

  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const { categories, errors, loadings } = useSelector((state) => state.categories);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      let par = "categorie=" + params + "&";
      dispatch(fetchProducts(id,par));
      dispatch(fetchCategories(id));
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };

  },[params,lang,showProduct,deleted])

  let plainArray= [];

  
    for(let i = 0 ; i < (categories.length) ; i++){
        plainArray.push(categories[i].title)
      }
  

  const handleParam = (event) => {
    setParams(event.target.value);
  }

  return (
    <>
    <div className={`h-screen ${(showProduct === 1 || showProduct === 2) ? ("blur"):("")} `}>

      <Header/>

      <div className='flex items-center mx-10 mt-4'>
        <div className='title'>Voici les produits de la boutique !</div>
        <div className='ml-auto'>
          <Link to={`/categories/${id}`}>
            <button className='greenButton mr-6'>Gérer les catégories</button>
          </Link>
          {(user.isAdmin || user.isVendorDeliveryMan) && (
          <button className='greenButton' onClick={() => {newProduct();}}>Ajouter un produit</button>)}
        </div>
      </div>


      <div className='flex mx-10 mt-4'>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row mb-5'>
            
            <div className='trie'>
              <select name="trie" onChange={handleParam} className='search pl-2'>
                  <option value="">categorie</option>
                  {plainArray && (
                    plainArray.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  )}
              </select>
            </div>
            <img alt='langue' src={langue} onClick={()=>{lang === "fr" ? (setSelectedLang("en")) : (setSelectedLang("fr"))}} className='ml-auto w-6 h-6 cursor-pointer'/>
          </div>
          
          <ProduitsListe onChange={handleProductChange} delete={deleteProduct} produits={products} lang={lang} />
        </div>
        
      </div>

   </div> 
   {showProduct === 1 ? 
   (<PopUpProduct selectedProductName={selectedProductName} nameChange={handleInputNameChange} selectedProductPrice={selectedProductPrice} priceChange={handlePriceChange} selectedProductCat={selectedProductCat} catChange={handleCatChange} selectedProductDesc={selectedProductDesc} descChange={handleDescChange} storeId={id} lang={lang} firstButton={handleShowProduct} secondButton={editProductDetails} action="Modifier" />)
   : (
    showProduct === 2 ?
    (<PopUpProduct selectedProductName={selectedProductName} nameChange={handleInputNameChange} selectedProductPrice={selectedProductPrice} priceChange={handlePriceChange} selectedProductCat={selectedProductCat} catChange={handleCatChange} selectedProductDesc={selectedProductDesc} descChange={handleDescChange} storeId={id} lang={lang} firstButton={handleShowProduct} secondButton={createProduct} action="Créer" />)
    :(null)
   )
   }
   </>
  );
}

export default Produits;
