/**
 * @file 项目相关的操作
 */

import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
// import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

/** 拉取项目信息 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", {
      data: cleanObject(param || {}),
    })
  );
  // const { run, ...result } = useAsync<Project[]>();

  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [client, param]
  // );

  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [param, run, fetchProjects]);

  // return result;
};

/** 编辑项目 */
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

/** 增加项目 */
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
