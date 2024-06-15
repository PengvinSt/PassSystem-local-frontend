import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import { useState } from 'react';

interface IUserSimple {
  name: {
    first: string;
    last: string;
  };
  isOnline: boolean;
  gender: string;
  uuid: string;
  job: string;
  ban: boolean;
  email: string;
  picture: string;
  role: string;
  phone: string;
  payment: number;
}

function InputField({name}: {name:string}){
  return(
  <div className='flex gap-1'>
    <p>{name}:</p>
    <input type="text" className='border border-black border-solid'/>
  </div>
)
}

function Editor() {

  const [updUser, setUpdUser] = useState<IUserSimple>()

  let { id } = useParams();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-main-bg dark:bg-main-dark-bg rounded-3xl">
      <Header category={`${id}`} title="Editor" />
      <div className='w-full h-full flex flex-col items-start justify-center'>
      <InputField name={"Name(first)"}/>
      <InputField name={"Name(second)"}/>
      </div>
    </div>
    
  )
}

export default observer(Editor)