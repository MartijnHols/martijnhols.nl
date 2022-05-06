import styled from "@emotion/styled";
import { SliceZone } from "@prismicio/react";
import {
  FilledLinkToDocumentField,
  RelationField,
  SharedSlice,
  SharedSliceVariation,
} from "@prismicio/types";
import { useState } from "react";
import { useQuery } from "react-query";

import { components } from "..";
import Container from "../../components/Container";
import { usePreviewData } from "../../pages/[slug]";
import { PrefetchContext } from "../../utils/prefetchSliceSubQueries";
import { createClient, getArticle, PrismicArticle } from "../../utils/prismic";

const Article = styled.article``;
const StyledContainer = styled(Container)`
  padding-top: 100px;
  padding-bottom: 100px;
  // TODO: Make h1 smaller
  /* max-width: 800px; */
`;

export type PrismicArticleSlice = SharedSlice<
  "article_slice",
  SharedSliceVariation<
    "default",
    {
      article: RelationField<"article">;
    }
  >
>;

interface Props {
  slice: PrismicArticleSlice;
}

const ArticleSlice = ({ slice }: Props) => {
  const previewData = usePreviewData();
  const [prismicClient] = useState(() => createClient({ previewData }));
  const articleId = (slice.primary.article as FilledLinkToDocumentField).id;
  const { data } = useQuery<PrismicArticle>(["article", articleId], () =>
    getArticle(prismicClient, articleId)
  );
  const article = data?.data;

  if (!article) {
    return null;
  }

  return (
    <Article>
      <StyledContainer>
        <header>
          <h1>{article.name}</h1>
        </header>

        <SliceZone slices={article.slices} components={components} />
      </StyledContainer>
    </Article>
  );
};
ArticleSlice.prefetch = async ({
  prismicClient,
  queryClient,
  slice,
}: PrefetchContext<PrismicArticleSlice>) => {
  if (slice.primary.article.link_type !== "Document") {
    return;
  }
  const articleId = (slice.primary.article as FilledLinkToDocumentField).id;

  await queryClient.prefetchQuery(["article", articleId], () =>
    getArticle(prismicClient, articleId)
  );
};

export default ArticleSlice;
