import {
  useChangeRouterParam,
  useRouteParam,
  useSetPageDetails,
} from "frontend/lib/routing";
import { ITableTab, META_USER_PERMISSIONS } from "shared/types";
import { ComponentIsLoading, StyledCard, Tabs } from "@hadmean/chromista";
import { useEntityConfiguration } from "frontend/hooks/configuration/configuration.store";
import { ViewStateMachine } from "frontend/lib/ViewStateMachine";
import { AppLayout } from "../../../_layouts/app";
import {
  useEntityDiction,
  useEntitySlug,
} from "../../../hooks/entity/entity.config";
import {
  EntityActionTypes,
  useEntityActionMenuItems,
} from "../../entity/constants";
import { EntityTableView } from "./TableView";
import { useTableMenuItems } from "./useTableMenuItems";

export function EntityTable() {
  const entity = useEntitySlug();
  const entityDiction = useEntityDiction(entity);

  const actionItems = useEntityActionMenuItems([
    EntityActionTypes.Table,
    EntityActionTypes.Diction,
    EntityActionTypes.Labels,
    EntityActionTypes.Types,
  ]);

  useSetPageDetails({
    pageTitle: entityDiction.plural,
    viewKey: "ENTITY_TABLE",
    permission: META_USER_PERMISSIONS.APPLIED_CAN_ACCESS_ENTITY(entity),
  });

  const entityTableTabs = useEntityConfiguration<ITableTab[]>(
    "entity_table_tabs",
    entity
  );

  const menuItems = useTableMenuItems(entity);

  const tabFromUrl = useRouteParam("tab");
  const changeTabParam = useChangeRouterParam("tab");

  return (
    <AppLayout actionItems={menuItems} secondaryActionItems={actionItems}>
      <StyledCard>
        <ViewStateMachine
          error={entityTableTabs.error}
          loading={entityTableTabs.isLoading}
          loader={<ComponentIsLoading />}
        >
          {(entityTableTabs.data || []).length > 1 ? (
            <Tabs
              padContent={false}
              currentTab={tabFromUrl}
              onChange={changeTabParam}
              contents={(entityTableTabs.data || []).map(
                ({ filters, title }) => ({
                  content: (
                    <EntityTableView
                      entity={entity}
                      persitentFilters={filters}
                    />
                  ),
                  label: title,
                })
              )}
            />
          ) : (
            <EntityTableView
              entity={entity}
              persitentFilters={(entityTableTabs.data || [])?.[0]?.filters}
            />
          )}
        </ViewStateMachine>
      </StyledCard>
    </AppLayout>
  );
}
