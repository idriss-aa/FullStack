import React, { useState, useEffect } from 'react';
import { Multiselect } from "multiselect-react-dropdown";
import './PopUpProduct.css';
import langue from './../img/i18.png';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categories';


function PopUpProduct(props) {

  
  const [lang, setSelectedLang] = useState(props.lang);
  const [selectedProductNameFr, setSelectedProductNameFr] = useState(props.selectedProductName.fr);
  const [selectedProductNameEn, setSelectedProductNameEn] = useState(props.selectedProductName.en);
  const [selectedProductDescFr, setSelectedProductDescFr] = useState(props.selectedProductDesc.fr);
  const [selectedProductDescEn, setSelectedProductDescEn] = useState(props.selectedProductDesc.en);
  const [selectedProductPrice, setSelectedProductPrice] = useState(props.selectedProductPrice);
  const [selectedProductCat, setSelectedProductCat] = useState(props.selectedProductCat);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleProductNameFrChange(event) {
    setSelectedProductNameFr(event.target.value);
  }

  function handleProductNameEnChange(event) {
    setSelectedProductNameEn(event.target.value);
  }

  function handleProductPriceChange(event) {
    setSelectedProductPrice(event.target.value);
  }

  function handleProductDescFrChange(event) {
    setSelectedProductDescFr(event.target.value);
  }


function handleProductDescEnChange(event) {
  setSelectedProductDescEn(event.target.value);
}

  function action() {
    console.log(selectedProductNameFr)
    let name = {
      fr : selectedProductNameFr,
      en : selectedProductNameEn
    }
    props.nameChange(name);
    let desc = {
      fr : selectedProductDescFr,
      en : selectedProductDescEn
    }
    props.descChange(desc);
    props.priceChange(selectedProductPrice);
    let product = {
      "title": name,
      "description": desc,
      "categories": selectedCategories,
      "price": selectedProductPrice
    }
    props.secondButton(product);
  }

  function handleShowProduct() {
    props.nameChange("");
    props.priceChange("");
    props.catChange([]);
    props.descChange("");
    props.firstButton(0);
  }

  // quand on ajoute une categorie
  function onSelect(selectedList, selectedItem) {
    //setSelectedProductCat(selectedList);
    let selectedCat = [];
    for(let i = 0 ; i < (selectedList.length) ; i++){
      selectedCat.push(cateId[plainArray.indexOf(selectedList[i])])
    }
    setSelectedCategories(selectedCat);
    props.catChange(selectedCat);
  }

  // quand on supprime une categorie
  function onRemove(selectedList, selectedItem) {
    // setSelectedProductCat(selectedList);
    let selectedCat = [];
    for(let i = 0 ; i < (selectedList.length) ; i++){
      selectedCat.push(cateId[plainArray.indexOf(selectedList[i])])
    }
    setSelectedCategories(selectedCat);
    props.catChange(selectedCat);
  }

  
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(fetchCategories(props.storeId,''));
  },[dispatch])


  let plainArray= [];
  let selectedplainArray= [];
  let cateId= [];

  
  for(let i = 0 ; i < (categories.length) ; i++){
    plainArray.push(categories[i].title)
    cateId.push(categories[i]._id)
  }

  for(let i = 0 ; i < (selectedProductCat.length) ; i++){
    selectedplainArray.push(selectedProductCat[i].title)
  }

  return (
    <div className='showProduct'>
      <div className='flex flex-col h-full items-center justify-center'>

        <div className='widthBox flex'>
          <div>
            <div className='titleInput mb-3'>Nom (fr) :</div>
            <input
              onChange={handleProductNameFrChange}
              value={selectedProductNameFr}
              type="text"
              className='inputProductName pl-5 mb-5 mr-5'
            />
          </div>
          <div>
            <div className='titleInput mb-3'>Nom (en) :</div>
            <input
              onChange={handleProductNameEnChange}
              value={selectedProductNameEn}
              type="text"
              className='inputProductName pl-5 mb-5'
            />
          </div>
        </div>

        <div className='flex flex-row mb-5'>
          <div>
            <div className='titleInput mb-3'>Prix :</div>
            <input
              onChange={handleProductPriceChange}
              value={selectedProductPrice}
              type="text"
              className='inputProductName pl-5 mr-5'
            />
          </div>
          <div>
            <div className='titleInput mb-3'>Categories :</div>
            <Multiselect 
              showArrow 
              options={plainArray} 
              selectedValues={selectedplainArray} 
              isObject={false} 
              className="inputProductCategorie"
              onSelect={onSelect}
              onRemove={onRemove}
            />
          </div>
        </div>

        <div>
          <div className='titleInput mb-3'>Description (fr) :</div>
          <textarea
            onChange={handleProductDescFrChange}
            value={selectedProductDescFr}
            type="textarea"
            className='inputProductDesc pt-2 pl-5 mb-5'
          />
        </div>
        <div>
          <div className='titleInput mb-3'>Description (en) :</div>
          <textarea
            onChange={handleProductDescEnChange}
            value={selectedProductDescEn}
            type="textarea"
            className='inputProductDesc pt-2 pl-5 mb-12'
          />
        </div>

        <div className='flex flex-row'>
          <button className='grayButton mr-5' onClick={handleShowProduct}>Annuler</button>
          <button className='greenButton' onClick={action}>{props.action}</button>
        </div>

      </div>
   </div>
  );
}

export default PopUpProduct;
