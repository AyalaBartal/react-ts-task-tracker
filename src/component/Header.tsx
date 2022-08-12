import React from 'react'
import Button from './Button'

interface IProps {
    title: string,
    onAdd: () => void,
    showAdd: boolean
}

const Header: React.FC<IProps> = ({title, onAdd, showAdd}) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button onClick={onAdd} text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'purple' : 'blue'}/>
    </header>
  )
}

export default Header
