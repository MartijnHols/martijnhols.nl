import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const absoluteUrl = (path: string = "/") =>
  `${publicRuntimeConfig.primaryHost}${path}`;

export default absoluteUrl;
