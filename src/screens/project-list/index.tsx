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
import { useProjectModal } from "screens/project-list/util";
import { Row } from "components/lib";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type="primary" onClick={open}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
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
