import React, { useState, useEffect } from 'react';
import './Categories.css';
import Header from '../Header';
import langue from './../img/i18.png';
import CategoriesListe from './CategoriesListe';
import PopUpCategorie from './PopUpCategorie';
import { useParams } from 'react-router-dom';
import { addNewCategorie, editaCategorie, fetchCategories, deleteaCategorie } from '../redux/reducers/categories';
import { useSelector, useDispatch } from 'react-redux';

function Categories() {

  const { id } = useParams();


  const [currentCategorie, setCurrentCategorie] = useState(0);
  const [showCategorie, setShowCategorie] = useState(0);
  const [selectedInputCat, setSelectedInputCat] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [search, setSearch] = useState("");

  function handleCategorieChange(newValue) {
    setCurrentCategorie(newValue.id);
    setSelectedInputCat(newValue.title);
    setShowCategorie(1);
  }

  function handleShowCategorie(value) {
    setShowCategorie(value);
  }

  function handleSearch() {
    setRefresh(refresh+1);
  }

  //input search categorie
  function handleInputSearchChange(event) {
    setSearch(event.target.value);
  }

  //input nom categorie
  function handleInputCatChange(newValue) {
    setSelectedInputCat(newValue);
  }

  //bouton modifier categorie
  function editCategorieName() {
    let cat = {
      title: selectedInputCat,
    };
    console.log(currentCategorie);
    editaCategorie(cat, currentCategorie);
    setSelectedInputCat("");
    handleShowCategorie(0);
    setRefresh(1);
  }

  //bouton supprimer categorie
  function deleteCategorie(id) {
    deleteaCategorie(id);
    setDeleted(!deleted);
  }

  //Bouton Ajouter categorie
  function newCategorie() {
    handleShowCategorie(2);
  }

  
	const userID = JSON.parse(localStorage.getItem("userID"));
  const user = JSON.parse(localStorage.getItem('userObject'));

  //bouton cree categorie
  function createCategorie() {
    let cat = {
      userId: userID,
      StoreId: id,
      title: selectedInputCat,
    };
    addNewCategorie(cat);
    handleShowCategorie(0);
    setRefresh(2);
  }

  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector((state) => state.categories);
  const { store, errorS, loadingS } = useSelector((state) => state.shops);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let par = "categorie=" + search;
      dispatch(fetchCategories(id,par));
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
    };
  },[dispatch,showCategorie,refresh,deleted])


  return (
    <>
   <div className={`h-screen ${(showCategorie === 1 || showCategorie === 2) ? ("blur"):("")} `}>
    
      <Header/>

      <div className='flex items-center mx-10 mt-4'>
        <div className='title'>Voici les catégories de la boutique !</div>
        {(user.isAdmin) && (
        <div className='ml-auto'>
          <button className='greenButton' onClick={() => {newCategorie();}}>Ajouter une categorie</button>
        </div>)}
      </div>


      <div className='flex mx-10 mt-4'>
        <div className='flex flex-col w-full'>
            <div className='trie flex mr-5 mb-5'>
              <input
                id="4"
                onChange={handleInputSearchChange}
                value={search}
                type="search"
                placeholder='nom d’une catégorie'
                className='search pl-3'
              />
              <button className='searchButton' onClick={() => {handleSearch();}}>Search</button>
            </div>
          
          <CategoriesListe onChange={handleCategorieChange} delete={deleteCategorie} categories={categories}/>
        </div>
        
      </div>

   </div> 
   {showCategorie === 1 ? 
   (<PopUpCategorie selectedInputCat={selectedInputCat} inputChange={handleInputCatChange} firstButton={handleShowCategorie} secondButton={editCategorieName} action="Modifier" />)
   : (
    showCategorie === 2 ?
    (<PopUpCategorie selectedInputCat={selectedInputCat} inputChange={handleInputCatChange} firstButton={handleShowCategorie} secondButton={createCategorie} action="Créer" />)
    :(null)
   )
   }
   </>
  );
}

export default Categories;
