/**
 * @file 搜索组件
 * 功能
 * 1. 搜索框： 修改 name
 * 2. 下拉框： 修改 personId
 */

export const SearchPanel = ({users, param, setParam}) => {
  return <form>
    <div>

      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })}/>

      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}
