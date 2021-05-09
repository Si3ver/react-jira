/**
 * @file 项目列表组件
 * 功能
 * 1. 初始化：拉取数据 users、list
 * 2. 更新数据：每次 param 变化，更新 list
 */

import { useEffect, useState } from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((err) => {
        setList([]);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
