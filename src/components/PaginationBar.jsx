export default function PaginationBar({ pages, curPage, onSetPage }) {
  const toBegin = curPage - 1;
  const toEnd = pages - curPage;

  function handleSelectPage(e) {
    e.preventDefault();
    if (e.target.matches("span")) {
      onSetPage(Number(e.target.textContent));
    }
    if (e.target.id === "btn-prev" && curPage > 1) {
      onSetPage(curPage - 1);
    }
    if (e.target.id === "btn-next" && curPage < pages) {
      onSetPage(curPage + 1);
    }
  }

  return (
    <div className="pagination" onClick={(e) => handleSelectPage(e)}>
      <button id="btn-prev" onClick={(e) => handleSelectPage(e)}>
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
      <button id="btn-next" onClick={(e) => handleSelectPage(e)}>
        &rarr;
      </button>
    </div>
  );
}
