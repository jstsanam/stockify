import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./StocksTable.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import TablePagination from "./TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  getUserWatchlist,
  addStockToUserWatchlist,
  removeStockFromUserWatchlist,
} from "../../../store/slices/user/watchlistSlice";

interface StocksTableType {
  exploreOn: boolean;
  setCurrentStock: React.Dispatch<React.SetStateAction<any>>;
}

export default function StocksTable({
  exploreOn,
  setCurrentStock,
}: StocksTableType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const stocks = useAppSelector((state: any) => state.stocks.stocks);
  const userWatchlist = useAppSelector(
    (state: any) => state.userWatchlist.watchlist.watchlist
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [watchlist, setWatchlist] = useState<any>(userWatchlist || []);
  const [hoveredStock, setHoveredStock] = useState<any>(null);

  // pagination
  const rowsPerPage = 7;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // for Explore section
  const sortedStocks = stocks
    .slice()
    .sort((a: any, b: any) => a.stock_name.localeCompare(b.stock_name));
  const currentRowsExplore = sortedStocks.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // for My watchlist section
  const sortedWatchlist = watchlist
    .slice()
    .sort((a: any, b: any) => a.stock_name.localeCompare(b.stock_name));
  const currentRowsMyWatchlist = sortedWatchlist.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handleAddStockToWatchlist = async (stock: any) => {
    try {
      const stockWithoutId = Object.fromEntries(
        Object.entries(stock).filter(([key]) => key !== "_id")
      );
      await dispatch(addStockToUserWatchlist({ watchlist: [stockWithoutId] }));
    } catch (error) {
      console.error("Error adding stock to watchlist: ", error);
    }
  };

  const handleRemoveStockFromWatchlist = async (stock: any) => {
    try {
      await dispatch(removeStockFromUserWatchlist({ watchlist: [stock] }));
    } catch (error) {
      console.error("Error removing stock from watchlist: ", error);
    }
  };

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, [dispatch]);

  useEffect(() => {
    if (userWatchlist) {
      setWatchlist(userWatchlist);
    }
  }, [userWatchlist]);

  useEffect(() => {
    if (!exploreOn) {
      const totalPages = Math.ceil(watchlist.length / rowsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  }, [watchlist]);

  useEffect(() => {
    setCurrentPage(1);
  }, [exploreOn]);

  const handleViewStockDetail = (stock: any) => {
    navigate(`/dashboard/${stock._id}`);
  };

  return (
    <TableContainer component={Paper} id="stocks-table">
      {stocks.length !== 0 ? (
        <>
          <Table id="table-boundary">
            <TableHead id="table-head">
              <TableRow>
                <TableCell className="table-cell-head">Company</TableCell>
                <TableCell align="right" className="table-cell-head">
                  Base Price
                </TableCell>
                <TableCell align="right" className="table-cell-head">
                  Watchlist
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exploreOn &&
                currentRowsExplore.map((stock: any) => (
                  <TableRow
                    key={stock.stock_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        setCurrentStock(stock);
                        handleViewStockDetail(stock);
                      }}
                      id="table-cell-name"
                    >
                      {stock.stock_name}
                    </TableCell>
                    <TableCell align="right" id="table-cell-price">
                      {stock.base_price}
                    </TableCell>
                    <TableCell align="right">
                      {watchlist.find(
                        (findStock: any) =>
                          findStock.stock_name === stock.stock_name
                      ) ? (
                        <>
                          {hoveredStock !== stock ? (
                            <button
                              className="table-action-buttons-group"
                              onMouseEnter={() => setHoveredStock(stock)}
                            >
                              <CheckCircleIcon
                                fontSize="inherit"
                                color="secondary"
                                className="table-action-icons-group"
                              />
                            </button>
                          ) : (
                            <button
                              className="table-action-buttons-group"
                              onMouseLeave={() => setHoveredStock(null)}
                              onClick={() =>
                                handleRemoveStockFromWatchlist(stock)
                              }
                            >
                              <CloseIcon
                                fontSize="inherit"
                                color="error"
                                className="table-action-icons-group"
                              />
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => handleAddStockToWatchlist(stock)}
                          className="table-action-buttons-group"
                        >
                          <AddCircleOutlineIcon
                            fontSize="inherit"
                            color="secondary"
                            className="table-action-icons-group"
                          />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {!exploreOn &&
                (watchlist.length === 0 ? (
                  <div style={{ margin: "1rem", color: "rgba(0, 0, 0, 0.3)" }}>
                    Stocks added from Explore section will appear here.
                  </div>
                ) : (
                  currentRowsMyWatchlist.map((stock: any) => (
                    <TableRow
                      key={stock.stock_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {stock.stock_name}
                      </TableCell>
                      <TableCell align="right">{stock.base_price}</TableCell>
                      <TableCell align="right">
                        {hoveredStock !== stock ? (
                          <button
                            className="table-action-buttons-group"
                            onMouseEnter={() => setHoveredStock(stock)}
                          >
                            <CheckCircleIcon
                              fontSize="inherit"
                              color="secondary"
                              className="table-action-icons-group"
                            />
                          </button>
                        ) : (
                          <button
                            className="table-action-buttons-group"
                            onMouseLeave={() => setHoveredStock(null)}
                            onClick={() =>
                              handleRemoveStockFromWatchlist(stock)
                            }
                          >
                            <CloseIcon
                              fontSize="inherit"
                              color="error"
                              className="table-action-icons-group"
                            />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ))}
            </TableBody>
          </Table>
          <TablePagination
            setCurrentPage={setCurrentPage}
            exploreOn={exploreOn}
            stocks={stocks}
            watchlist={watchlist}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />
        </>
      ) : (
        <Stack
          sx={{
            color: "grey.500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40rem",
          }}
        >
          <CircularProgress color="secondary" />
        </Stack>
      )}
    </TableContainer>
  );
}
