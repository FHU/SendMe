/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

import { OpportunitiesService, opportunitiesService } from "./OpportunitiesService";
import { HelloService, helloService } from "./HelloService";
export type Services = {
    opportunities: OpportunitiesService;
    hello: HelloService;
};
export const services = {
    opportunities: opportunitiesService,
    hello: helloService
} as const;