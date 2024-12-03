import { useState } from "react";
import TableRow from "../components/TableRow";
import {
  alarabiyaBreakingNewsEndpoint,
  aljazeeraBreakingNewsEndpoint,
  aljazeeraNewsEndpoint,
  alqahiraNewsEndpoint,
  CNNNewsEndpoint,
  MTVLebanonNewsEndpoint,
  skyNewsBreakingNewsEndpoint,
} from "../endpoints/endpoints";
import useGetData from "../hooks/useGetData";
import { AlarabiyaBreakingNews } from "../models/AlarabiyaBreakingNews";
import { AljazeeraBreakingNews } from "../models/AljazeeraBreakingNews";
import { AljazeeraNews } from "../models/AljazeeraNews";
import { AlqahiraNews } from "../models/AlqahiraNews";
import { CNNNews } from "../models/CNNNews";
import { MTVLebanonNews } from "../models/MTVLebanonNews";
import { SkyNewsBreakingNews } from "../models/SkyNewsBreakingNews";

const HomePage = () => {
  const [shownDates, setShownDates] = useState(true);

  // SYRIA TV - ALARABIYA - BBC
  const FILTERS =
    /سوري|حلب|حماة|حماه|لاذقية|لاذقيه|طرطوس|دمشق|حسكة|حسكه|قامشلي/;

  const {
    // isLoading: isLoadingAljazeeraBreakingNews,
    // error: errorAljazeeraBreakingNews,
    data: dataAljazeeraBreakingNews,
  } = useGetData<AljazeeraBreakingNews>(aljazeeraBreakingNewsEndpoint);

  const {
    // isLoading: isLoadingAljazeeraNews,
    // error: errorAljazeeraNews,
    data: dataAljazeeraNews,
  } = useGetData<AljazeeraNews>(aljazeeraNewsEndpoint);

  const {
    // isLoading: isLoadingAlarabiyaBreakingNews,
    // error: errorAlarabiyaBreakingNews,
    data: dataAlarabiyaBreakingNews,
  } = useGetData<AlarabiyaBreakingNews>(alarabiyaBreakingNewsEndpoint);

  const {
    // isLoading: isLoadingSkyNewsBreakingNews,
    // error: errorSkyNewsBreakingNews,
    data: dataSkyNewsBreakingNews,
  } = useGetData<SkyNewsBreakingNews>(skyNewsBreakingNewsEndpoint);

  const {
    // isLoading: isLoadingMTVLebanonNews,
    // error: errorMTVLebanonNews,
    data: dataMTVLebanonNews,
  } = useGetData<MTVLebanonNews>(MTVLebanonNewsEndpoint);

  const {
    // isLoading: isLoadingAlqahiraNews,
    // error: errorAlqahiraNews,
    data: dataAlqahiraNews,
  } = useGetData<AlqahiraNews>(alqahiraNewsEndpoint);

  const {
    // isLoading: isLoadingCNNNews,
    // error: errorCNNNews,
    data: dataCNNNews,
  } = useGetData<CNNNews>(CNNNewsEndpoint);

  const filteredMTVLebanonNews = dataMTVLebanonNews
    ? dataMTVLebanonNews.articles.filter((article) =>
        FILTERS.test(article.name)
      )
    : [];

  const filteredCNNNews = dataCNNNews
    ? dataCNNNews.data.list.items.filter((article) =>
        FILTERS.test(article.title)
      )
    : [];

  const filteredAljazeeraNews = dataAljazeeraNews
    ? [
        ...(dataAljazeeraNews.data.homepage.feedPost || []),
        ...(dataAljazeeraNews.data.homepage.automatedCollection?.flatMap(
          (collection) => collection.posts || []
        ) || []),
        ...(dataAljazeeraNews.data.homepage.curatedCollection?.flatMap(
          (collection) => collection.posts || []
        ) || []),
      ]
        .filter((post) => FILTERS.test(post.excerpt))
        .map((post) => post)
    : [];

  return (
    <main dir="rtl">
      <button
        className="fixed z-10 bottom-8 right-8 bg-blue-600 text-white py-1 px-2 rounded-xl"
        onClick={() => setShownDates(!shownDates)}
      >
        {shownDates ? "إخفاء التواريخ" : "إظهار التواريخ"}
      </button>
      <table className="table mb-32">
        <tbody>
          {dataAlarabiyaBreakingNews && (
            <TableRow
              breaking
              name="العربية"
              news={dataAlarabiyaBreakingNews.message}
            />
          )}

          {dataAljazeeraBreakingNews &&
            dataAljazeeraBreakingNews.data.breakingNews.tickerText !== null && (
              <TableRow
                breaking
                name="الجزيرة"
                news={
                  dataAljazeeraBreakingNews.data.breakingNews.tickerText || ""
                }
              />
            )}

          {dataSkyNewsBreakingNews &&
            dataSkyNewsBreakingNews.map((item, index) => (
              <TableRow breaking key={index} name="Sky News" news={item.text} />
            ))}

          {dataMTVLebanonNews &&
            filteredMTVLebanonNews.map((item, index) => (
              <TableRow
                key={index}
                name="MTV Lebanon"
                news={item.name}
                extraNews={item.description}
                date={shownDates ? item.date : ""}
              />
            ))}

          {dataCNNNews &&
            filteredCNNNews.map((item, index) => (
              <TableRow
                key={index}
                name="CNN Arabia"
                news={item.title}
                date={shownDates ? item.published.substring(0, 25) : ""}
              />
            ))}

          {dataAljazeeraNews &&
            filteredAljazeeraNews.map((item, index) => (
              <TableRow
                key={index}
                name="الجزيرة"
                news={item.title}
                extraNews={item.excerpt}
                date={shownDates ? item.date.replace("T", " ") : ""}
              />
            ))}

          {dataAlqahiraNews &&
            dataAlqahiraNews.data.posts.map((item, index) => (
              <TableRow
                key={index}
                name="القاهرة"
                news={item.title}
                extraNews={item.raw_content}
              />
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default HomePage;
