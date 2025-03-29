/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

import type { paths } from "../schema";
import type { ServiceOperationQuery } from "@openapi-qraft/react";
export interface ProtectedService {
    /** @summary Protected Example */
    protectedExampleProtectedGet: ServiceOperationQuery<{
        method: "get";
        url: "/protected";
    }, paths["/protected"]["get"]["responses"]["200"]["content"]["application/json"], undefined, unknown>;
}
export const protectedService: {
    /** @summary Protected Example */
    protectedExampleProtectedGet: {
        schema: {
            method: "get";
            url: "/protected";
        };
    };
} = {
    protectedExampleProtectedGet: {
        schema: {
            method: "get",
            url: "/protected"
        }
    }
};
