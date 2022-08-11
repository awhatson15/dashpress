import {
  dataNotFoundMessage,
  makeDeleteRequest,
  makePostRequest,
  MutationHelpers,
  MutationsLang,
  useApi,
  useApiMutateOptions,
} from "@gothicgeeks/shared";
import { isRouterParamEnabled } from "frontend/hooks";
import { useMutation } from "react-query";
import { useRoleIdFromRouteParam } from "./hooks";
import { ADMIN_ROLES_DETAILS_ENDPOINT } from "./roles.store";

const SINGULAR = "Role Permission";

export const ADMIN_ROLE_PERMISSION_ENDPOINT = (roleId: string) =>
  `/api/roles/${roleId}/permissions`;

export function useRolePermissions(roleId: string) {
  return useApi<string[]>(ADMIN_ROLE_PERMISSION_ENDPOINT(roleId), {
    enabled: isRouterParamEnabled(roleId),
    errorMessage: dataNotFoundMessage(SINGULAR),
  });
}

export function useRolePermissionDeletionMutation() {
  const roleId = useRoleIdFromRouteParam();

  const apiMutateOptions = useApiMutateOptions<string[], string>({
    dataQueryPath: ADMIN_ROLE_PERMISSION_ENDPOINT(roleId),
    // onMutate: MutationHelpers.remove,
    onMutate: (old: [], formData) => [
      ...old.filter((oldItem) => formData !== oldItem),
    ],
    successMessage: MutationsLang.delete(SINGULAR),
  });

  return useMutation(async (permission: string) => {
    await makeDeleteRequest(ADMIN_ROLES_DETAILS_ENDPOINT(roleId), {
      permission,
    });
    return permission;
  }, apiMutateOptions);
}

export function useCreateRolePermissionMutation() {
  const roleId = useRoleIdFromRouteParam();

  const apiMutateOptions = useApiMutateOptions<string[], string>({
    dataQueryPath: ADMIN_ROLE_PERMISSION_ENDPOINT(roleId),
    onMutate: MutationHelpers.append,
    successMessage: MutationsLang.create(SINGULAR),
  });

  return useMutation(async (permission: string) => {
    await makePostRequest(ADMIN_ROLE_PERMISSION_ENDPOINT(roleId), {
      permission,
    });
    return permission;
  }, apiMutateOptions);
}