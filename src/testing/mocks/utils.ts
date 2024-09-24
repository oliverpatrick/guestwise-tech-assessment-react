import { delay } from "msw";

export const networkDelay = () => {
  const delayTime =
    process.env.NODE_ENV === "test"
      ? 200
      : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

export default networkDelay;
