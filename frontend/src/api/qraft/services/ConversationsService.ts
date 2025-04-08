/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

import type { paths } from "../schema";
import type { ServiceOperationQuery } from "@openapi-qraft/react";
export interface ConversationsService {
    /** @summary Get Conversations */
    getConversationsconversationsGet: ServiceOperationQuery<{
        method: "get";
        url: "conversations";
    }, paths["conversations"]["get"]["responses"]["200"]["content"]["application/json"], undefined, unknown>;
}
export const conversationsService: {
    /** @summary Get Conversations */
    getConversationsconversationsGet: {
        schema: {
            method: "get";
            url: "conversations";
        };
    };
} = {
    getConversationsconversationsGet: {
        schema: {
            method: "get",
            url: "conversations"
        }
    }
};
