interface IProps {
    color?: string
    text?: string,
    onClick: () => void
}

const Button: React.FC<IProps> = ({color, text, onClick}) => {
  return (
    <button
      style={{ backgroundColor: color }} className='btn' onClick={onClick}>
          {text}
    </button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'Add'
}

export default Button
