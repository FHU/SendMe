export * from "./qraft/index";
import { createAPIClient } from "./qraft/index";

const api_client = createAPIClient();

export default api_client;
