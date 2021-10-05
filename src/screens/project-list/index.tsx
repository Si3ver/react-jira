/**
 * @file 项目列表页
 * 功能
 * 1. 初始化：拉取数据 users、list
 * 2. 搜索
 * 3. 收藏
 * 4. 创建、修改项目信息
 */

import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce } from "utils";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useDocumentTitle } from "utils";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";
import styled from "@emotion/styled";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
