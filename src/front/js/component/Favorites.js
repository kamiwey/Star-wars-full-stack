import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const ChossenFavorite = props => {

  const { store, actions } = useContext(Context);

  return store.favorites.map((i) => (
    <>
      <li key={i.index}>
        <div className='favBtn card'>
          <div className='d-flex'>
            <div className='col-9'>
              <Link to={i.url}>
                <button className='delFavItemBtn btn' onClick={() => actions.getPerson(i.uid)}>
                  {i.name}
                </button>
              </Link>
            </div>
            <div className='col-1'>
              <button className='delFavBtn btn btn-outline-dark border-0 btn-sm'>
                <i className='fa-solid fa fa-trash' onClick={() => actions.removeFromFavorites(i)}></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  ));
}

export default ChossenFavorite;