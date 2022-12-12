import React, {useState} from 'react'
// import gql from 'graphql-tag'
import PetBox from '../components/PetBox'
import NewPet from '../components/NewPet'
import { gql, useQuery, useMutation } from '@apollo/client';
import Loader from '../components/Loader'


const PETFRAGEMENT = gql`
    fragment PetField on Pet {
      name
      type
      img
      user{
        id
        age @client
      }
    }
  
  `


const ALL_PETS = gql`
  query getAllPets {
    pets{
     ...PetField
    }
  }
  ${PETFRAGEMENT}
  `

  const ADD_NEW_PET = gql` 
      mutation addNewPet($newPet:newPetInput){
       addPet(input: $newPet){
        id
        name
        type
       }
      }
   
    `



  const PetsList = ({pet})=> {
    return (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetBox pet={pet} />
      </div>
     </div>
    )
   }


export default function Pets () {
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(ALL_PETS);
  const [newPet, {loading:newLoading, error:newError, data:newData}] = useMutation(ADD_NEW_PET,{
    refetchQueries: [
      {query: ALL_PETS}, // DocumentNode object parsed with gql
      'getAllPets' // Query name
    ],
  })

   if(loading){
    return <h2>Loading....</h2>
   }

   if(error){
    return <h1>Error !!!</h1>
   }

   if(data){
    console.log({data})
   }
  
  const onSubmit = input => {
    setModal(false)
    newPet({variables:{newPet: {"name": input.name,"type": input.type}}})
  }


  
  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)}/>
        </div>
      </div>
    )
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          {data.pets.map((pet)=>(
          <PetsList key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </div>
  )
}


