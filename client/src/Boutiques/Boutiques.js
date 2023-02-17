import React, { useState, useEffect } from 'react';
import './Boutiques.css';
import Header from './../Header';
import Filter from './../Filter';
import BoutiquesListe from './BoutiquesListe';
import PopUpStore from './PopUpStore';
import { fetchShops, addNewStore, editaStore, deleteaStore } from '../redux/reducers/stores';
import { useSelector, useDispatch } from 'react-redux';

function Boutiques() {

  const [currentStore, setCurrentStore] = useState(0);
  const [showStore, setShowStore] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedHours, setSelectedHours] = useState([
    {
        "day": "Lundi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
        ],
        "work" : false
    },
    {
      "day": "Mardi",
      "periods": [
        {
            start: "00:00",
            end: "00:00"
        },
        {
          start: "00:00",
          end: "00:00"
        }
        ],
        "work" : false
    },
    {
      "day": "Mercredi",
      "periods": [
        {
            start: "00:00",
            end: "00:00"
        },
        {
          start: "00:00",
          end: "00:00"
        }
        ],
        "work" : false
    },
    {
      "day": "Jeudi",
      "periods": [
        {
            start: "00:00",
            end: "00:00"
        },
        {
          start: "00:00",
          end: "00:00"
        }
        ],
        "work" : false
    },
    {
      "day": "Vendredi",
      "periods": [
        {
            start: "00:00",
            end: "00:00"
        },
        {
          start: "00:00",
          end: "00:00"
        }
        ],
        "work" : false
    },
    {
      "day": "Samedi",
      "periods": [
        {
            start: "00:00",
            end: "00:00"
        },
        {
          start: "00:00",
          end: "00:00"
        }
        ],
        "work" : false
    },
    {
      "day": "Dimanche",
      "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
        ],
        "work" : false
    }
  ]);
  const [selectedCreationDate, setSelectedCreationDate] = useState('');
  const [stores, setStores] = useState([]);
  const [params, setParams] = useState("");
  const [selectedSort, setSelectedSort] = useState("createdAt");
  const [deleted, setDeleted] = useState(false);


  function handleStoreChange(newValue) {
    setCurrentStore(newValue.id);
    setSelectedName(newValue.title);
    setSelectedStatus(newValue.isOpen);
    setSelectedHours(newValue.opening_hours);
    setSelectedCreationDate(newValue.date);
    setShowStore(1);
  }

  function handleShowStore(value) {
    setShowStore(value);
  }

  //input nom boutique
  function handleNameChange(newValue) {
    setSelectedName(newValue);
  }

  //input status boutique
  function handleStatusChange(newValue) {
    setSelectedStatus(newValue);
  }

  //input hours boutique
  function handleHoursChange(newValue) {
    setSelectedHours(newValue);
  }

  //bouton modifier boutique
  function editStore() {
    let store = {
      "title": selectedName,
      "isOpen": selectedStatus,
      "products": [],
      "opening_hours": selectedHours,
  }
    editaStore(store, currentStore);
    handleShowStore(0);
  }

  //bouton supprimer boutique
  function deleteStore(id) {
    deleteaStore(id);
    setDeleted(!deleted);
  }

  //Bouton Ajouter boutique
  function newStore() {
    handleShowStore(2);
  }
  
	const userID = JSON.parse(localStorage.getItem("userID"));
  const user = JSON.parse(localStorage.getItem('userObject'));

  //bouton cree boutique
  function createStore() {
    let store = {
          "CreatedBy": userID,
          "title": selectedName,
          "isOpen": selectedStatus,
          "products": [],
          "opening_hours": selectedHours,
    }
    addNewStore(store);
    handleShowStore(0);
  }

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  }

  const dispatch = useDispatch();
  const { shops, error, loading } = useSelector((state) => state.shops);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // setParams(params + "sort=" + selectedSort)
    let par = params + "sort=" + selectedSort + "&";
    dispatch(fetchShops(par));
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
    };
  },[dispatch,showStore,params,selectedSort,deleted])
  
  // useEffect(() => {
  //   console.log("t")
  // },[showStore])


  // let Boutiques = [
  //   {
  //     id: 0,
  //     nom: "Boutique 1",
  //     nbProduit: "24",
  //     nbCategorie: "03",
  //     status: "En congé",
  //     date: "09 Dec, 2022",
  //     produits: [
  //       {
  //         id: 0,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 1,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 2,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 3,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 4,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 5,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 6,
  //         nom: "Produit 4",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     nom: "Boutique 2",
  //     nbProduit: "32",
  //     nbCategorie: "07",
  //     status: "Ouvert",
  //     date: "15 Dec, 2022",
  //     produits: [
  //       {
  //         id: 0,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 1,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 2,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 3,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 4,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 5,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 6,
  //         nom: "Produit 4",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //     ],
  //   },{
  //     id: 2,
  //     nom: "Boutique 3",
  //     nbProduit: "24",
  //     nbCategorie: "03",
  //     status: "En congé",
  //     date: "09 Dec, 2022",
  //     produits: [
  //       {
  //         id: 0,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 1,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 2,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 3,
  //         nom: "Produit 1",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 4,
  //         nom: "Produit 2",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 5,
  //         nom: "Produit 3",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //       {
  //         id: 6,
  //         nom: "Produit 4",
  //         prix: "29",
  //         categories: [
  //           "categorie1",
  //           "categorie2",
  //         ],
  //         description: "Lorum ipsum",
  //       },
  //     ],
  //   },
  // ];


  return (
    <>
    <div className={`h-screen ${(showStore === 1 || showStore === 2) ? ("blur"):("")} `}>

      <Header/>

      <div className='flex items-center mx-10 mt-4'>
        <div className='title'>Bonjour {user.username}, voici vos boutiques ! </div>
        {(user.isAdmin || user.isVendorDeliveryMan) && (
        <div className='ml-auto'>
          <button className='greenButton' onClick={() => {newStore();}}>Créer une boutique</button>
        </div>)}
      </div>


      <div className='flex mx-10 mt-4'>
        <Filter params={params} onChange={setParams} />
        <div className='flex flex-col ml-10 w-full'>
          <div className='trie mb-5'>
            <label className='pl-3'>trier par</label>
            <select name="trie" value={selectedSort} onChange={handleSortChange} className='pl-2'>
                <option value="createdAt">Date de création</option>
                <option value="Nb_products">Nombre de produits</option>
                <option value="title">Nom</option>
            </select>
          </div>
          <BoutiquesListe onChange={handleStoreChange} delete={deleteStore} boutiques={shops}/>
        </div>
        
      </div>

      </div> 
   {showStore === 1 ? 
   (<PopUpStore selectedName={selectedName} nameChange={handleNameChange} selectedStatus={selectedStatus} statusChange={handleStatusChange} selectedHours={selectedHours} date={selectedCreationDate} hoursChange={handleHoursChange} onChange={handleStoreChange} firstButton={handleShowStore} secondButton={editStore} action="Modifier" />)
   : (
    showStore === 2 ?
    (<PopUpStore selectedName={selectedName} nameChange={handleNameChange} selectedStatus={selectedStatus} statusChange={handleStatusChange} selectedHours={selectedHours} hoursChange={handleHoursChange} onChange={handleStoreChange} firstButton={handleShowStore} secondButton={createStore} action="Créer" />)
    :(null)
   )
   }
   </>
  );
}

export default Boutiques;
