/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

import type { paths } from "../schema";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface OrganizationsService {
    /** @summary Get Organizations */
    listOrganizations: ServiceOperationQuery<{
        method: "get";
        url: "/organizations";
    }, paths["/organizations"]["get"]["responses"]["200"]["content"]["application/json"], undefined, unknown>;
    /** @summary Create Organization */
    createOrganization: ServiceOperationMutation<{
        method: "post";
        url: "/organizations";
        mediaType: "application/json";
    }, NonNullable<paths["/organizations"]["post"]["requestBody"]>["content"]["application/json"], paths["/organizations"]["post"]["responses"]["201"]["content"]["application/json"], undefined, paths["/organizations"]["post"]["responses"]["422"]["content"]["application/json"]>;
}
export const organizationsService: {
    /** @summary Get Organizations */
    listOrganizations: {
        schema: {
            method: "get";
            url: "/organizations";
        };
    };
    /** @summary Create Organization */
    createOrganization: {
        schema: {
            method: "post";
            url: "/organizations";
            mediaType: "application/json";
        };
    };
} = {
    listOrganizations: {
        schema: {
            method: "get",
            url: "/organizations"
        }
    },
    createOrganization: {
        schema: {
            method: "post",
            url: "/organizations",
            mediaType: "application/json"
        }
    }
};
