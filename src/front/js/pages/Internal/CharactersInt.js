import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import NavbarInt from '../../component/NavbarInt'
import { Context } from '../../store/appContext'

const CharactersInt = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getCharacters(params.id);
  },[]);

  return (
    
    <div>
      {store.character.map((item, index) => (
        <div key={item.id}>
            

<NavbarInt />
        <h1>Characters Internal</h1>
<p>{item.name}</p>
<p>{item.gender}</p>


        </div>
      ))}

        
    </div>
  )
}

export default CharactersInt