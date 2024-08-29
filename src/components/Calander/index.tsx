import useMergeController, { DataProps } from '../../hooks/useMergeController'

const Calander = (props: DataProps<Date>) => {
  const { value, setStateValue } = useMergeController<Date>(new Date(), props)

  const tomorrow = () => {
    const current = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1)
    )
    setStateValue(current)
  }

  const tomorrowAday = () => {
    const current = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 2)
    )
    setStateValue(current)
  }
  return (
    <div>
      <div>组件值：{value?.toLocaleDateString()}</div>
      <button onClick={tomorrow}>明天</button>
      <button onClick={tomorrowAday}>后天</button>
    </div>
  )
}

export default Calander
