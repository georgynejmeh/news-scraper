import { useState } from "react";

interface Props {
  name: string;
  news: string;
  date?: string;
  extraNews?: string;
  breaking?: boolean;
}

const TableRow = ({ name, news, date, breaking, extraNews }: Props) => {
  const [shownExtraNews, setShownExtraNews] = useState(false);
  return (
    <tr>
      <td className="w-0 ps-2">
        <div className="flex items-center gap-1 text-nowrap">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              breaking ? "bg-red-600" : "bg-blue-600"
            }`}
          />
          {name}
        </div>
      </td>
      <td
        className={`pe-2 ps-6 ${extraNews && "flex flex-col justify-between"}`}
      >
        <div className="flex">
          {news}
          {extraNews ? (
            <span
              onClick={() => setShownExtraNews(!shownExtraNews)}
              className="text-blue-600 underline cursor-pointer ps-2"
            >
              المزيد
            </span>
          ) : (
            ""
          )}
        </div>
        {shownExtraNews && <div>{extraNews}</div>}

        {date && <div className="text-xs opacity-25 mt-1">{date}</div>}
        {/* {breaking && (
          <div className="text-xs opacity-25 mt-1">
            {Date().substring(0, 25)}
          </div>
        )} */}
      </td>
    </tr>
  );
};

export default TableRow;
