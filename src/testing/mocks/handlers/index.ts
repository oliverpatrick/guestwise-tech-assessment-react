import { HttpResponse, http } from "msw";

import restaurantHandler from "./restaurants";
import networkDelay from "../utils";

export const handlers = [
  ...restaurantHandler,
  http.get(`${process.env.REACT_APP_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];

export default handlers;
