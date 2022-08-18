import { usersController } from "backend/users/users.controller";
import { UPDATE_PROFILE_FORM_SCHEMA } from "shared/form-schemas/profile/update";
import { IAccountProfile } from "shared/types";
import { requestHandler } from "../../../backend/lib/request";

export default requestHandler({
  PATCH: async (getValidatedRequest) => {
    const validatedRequest = await getValidatedRequest([
      "authenticatedUser",
      {
        _type: "requestBody",
        options: UPDATE_PROFILE_FORM_SCHEMA,
      },
    ]);
    return await usersController.updateProfile(
      (validatedRequest.authenticatedUser as IAccountProfile).username,
      validatedRequest.requestBody
    );
  },
  GET: async (getValidatedRequest) => {
    const validatedRequest = await getValidatedRequest(["authenticatedUser"]);
    return await usersController.getAuthenticatedUserBag(
      (validatedRequest.authenticatedUser as IAccountProfile).username
    );
  },
});
