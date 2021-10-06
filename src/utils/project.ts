/**
 * @file 项目相关的操作
 */

import { Project } from "screens/project-list/list";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";

/** 拉取项目信息 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", {
      data: cleanObject(param || {}),
    })
  );
};

/** 编辑项目 */
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/** 增加项目 */
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects`, {
        data: params,
        method: "POST",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/** 获取某个项目的详情信息 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => {
      return client(`projects/${id}`);
    },
    {
      enabled: !!id,
      // enabled: id !== undefined && id !== null, // id 有值的时候才触发
    }
  );
};
