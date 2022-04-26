import { setPreviewData, redirectToPreviewURL } from "@prismicio/next";
import { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "../../utils/prismic";
import prismicLinkResolver from "../../utils/prismicLinkResolver";

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient();
  await setPreviewData({ req, res });
  await redirectToPreviewURL({
    req,
    res,
    client,
    linkResolver: prismicLinkResolver,
  });
};

export default preview;
