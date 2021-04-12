/**
 * @file table展示组件
 * 功能
 * 根据传入的 list、users 渲染一个表格
 */

export const List = ({list, users}) => {
  return <table>
    <thead>
    <tr>
      <th>名称</th>
      <th>负责人</th>
    </tr>
    </thead>
    <tbody>
    {
      list.map(project => <tr key={project.id}>
        <td>{project.name}</td>
        <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
      </tr>)
    }
    </tbody>
  </table>
}
