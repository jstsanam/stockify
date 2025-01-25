import "./TablePagination.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface TablePaginationType {
  setCurrentPage: any;
  exploreOn: boolean;
  stocks: any;
  watchlist: any;
  currentPage: number;
  rowsPerPage: number;
}

export default function TablePagination({
  setCurrentPage,
  exploreOn,
  stocks,
  watchlist,
  currentPage,
  rowsPerPage,
}: TablePaginationType) {
  const handlePageChange = (event: React.ChangeEvent<any>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} sx={{ margin: "0.2rem auto" }} id="table-pagination-box">
      {exploreOn && stocks.length !== 0 && (
        <Pagination
          count={Math.ceil(stocks.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="table-pagination"
        />
      )}
      {!exploreOn && watchlist.length !== 0 && (
        <Pagination
          count={Math.ceil(watchlist.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="table-pagination"
        />
      )}
    </Stack>
  );
}
