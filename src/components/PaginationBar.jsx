import { useEffect, useState } from "react";

export default function PaginationBar({ pages, page, onSetPage }) {
  const [curPage, setCurPage] = useState(page);
  const toBegin = curPage - 1;
  const toEnd = pages - curPage;

  function handleSelectPage(e) {
    e.preventDefault();
    if (e.target.matches("span")) setCurPage(Number(e.target.textContent));
  }

  useEffect(
    function () {
      onSetPage(curPage);
    },
    [curPage]
  );

  return (
    <div className="pagination" onClick={(e) => handleSelectPage(e)}>
      <button
        onClick={() =>
          setCurPage((curPage) => (curPage > 1 ? curPage - 1 : curPage))
        }
      >
        &larr;
      </button>

      {toBegin > 3 ? (
        <>
          <span>1</span> <p>...</p> <span>{curPage - 2}</span>{" "}
          <span>{curPage - 1}</span>
        </>
      ) : (
        [...Array(toBegin)].map((_, i) => <span>{i + 1}</span>)
      )}

      <span id="cur-page">{curPage}</span>

      {toEnd > 3 ? (
        <>
          <span>{curPage + 1}</span> <span>{curPage + 2}</span>
          <p>...</p>
          <span>{pages}</span>
        </>
      ) : (
        [...Array(toEnd)].map((_, i) => <span>{curPage + 1 + i}</span>)
      )}
      <button
        onClick={() =>
          setCurPage((curPage) => (curPage < pages ? curPage + 1 : curPage))
        }
      >
        &rarr;
      </button>
    </div>
  );
}
