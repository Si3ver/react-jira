import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "screens/project-list/project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);

  const handleClose = () => dispatch(projectListActions.closeProjectModal());

  return (
    <Drawer onClose={handleClose} visible={projectModalOpen} width="100%">
      <h1>Project Modal</h1>
      <Button onClick={handleClose}>关闭</Button>
    </Drawer>
  );
};
