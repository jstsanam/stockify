import Button from "@mui/material/Button";
import "./FilterBox.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TransactionStatus } from "../../../constants/enums";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { showToast } from "../../../utils/ToastService";

interface FilterBoxType {
  stocksPresent: string[];
  allTransactions: any[];
  setSearchedTransactions: any;
}

export default function FilterBox({
  stocksPresent,
  allTransactions,
  setSearchedTransactions,
}: FilterBoxType) {
  const [searchStock, setSearchStock] = useState<string>("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleSearchStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStock(e.target.value);
  };

  const handleSetStartDate = (startDateValue: any) => {
    if (startDateValue && startDateValue > new Date()) {
      showToast("Cannot select a future date!", "warning");
      return;
    }
    setStartDate(startDateValue);
  };

  const handleSetEndDate = (endDateValue: any) => {
    if (endDateValue && endDateValue > new Date()) {
      showToast("Cannot select a future date!", "warning");
      return;
    }
    setEndDate(endDateValue);
  };

  const handleCheckStock = (stock: string) => {
    setSelectedStocks((prev: any) =>
      prev.includes(stock)
        ? prev.filter((s: any) => s !== stock)
        : [...prev, stock]
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value);
  };

  const applyFilters = () => {
    let filteredTransactions = [...allTransactions];

    // Search filter
    if (searchStock.trim() !== "") {
      filteredTransactions = filteredTransactions.filter((transaction: any) =>
        transaction.stock_name.toLowerCase().includes(searchStock.toLowerCase())
      );
    }

    // Date wise filter
    if (startDate && endDate) {
      filteredTransactions = filteredTransactions.filter((transaction: any) => {
        const transactionDate = new Date(transaction.timestamp);
        // to include the data on endDate after midnight
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setHours(23, 59, 59, 999);

        return transactionDate >= startDate && transactionDate <= adjustedEndDate;
      });
    }

    // Stock wise filter
    if (selectedStocks.length > 0) {
      filteredTransactions = filteredTransactions.filter((transaction: any) =>
        selectedStocks.includes(transaction.stock_name)
      );
    }

    // Status wise filter
    if (selectedStatus) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: any) => transaction.status === selectedStatus
      );
    }

    setSearchedTransactions(filteredTransactions);
  };

  const handleClearAll = () => {
    setSearchStock("");
    setStartDate(null);
    setEndDate(null);
    setSelectedStocks([]);
    setSelectedStatus("");
    setSearchedTransactions(allTransactions);
  };

  useEffect(() => {
    applyFilters();
  }, [searchStock, startDate, endDate, selectedStocks, selectedStatus]);

  return (
    <div className="filter-table">
      <div className="filter-header">
        <div className="filter-title">Filters</div>
        <Button color="secondary" variant="text" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
      <hr className="divider" />
      <div className="search-stock-area">
        <input
          type="text"
          placeholder="Search for a stock"
          className="search-stock"
          value={searchStock}
          onChange={handleSearchStock}
        />
      </div>
      <hr className="divider" />
      <div className="date-pickers">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Start date"
            color="secondary"
            size="small"
            className="date-field"
            format="DD-MM-YYYY"
            value={startDate}
            onChange={handleSetStartDate}
          />
          <DateField
            label="End date"
            color="secondary"
            size="small"
            className="date-field"
            format="DD-MM-YYYY"
            value={endDate}
            onChange={handleSetEndDate}
          />
        </LocalizationProvider>
      </div>
      <hr className="divider" />
      <div className="stocks-in-transactions">
        {stocksPresent
          .sort((a: any, b: any) => a.localeCompare(b))
          .map((stock: string) => (
            <FormControlLabel
              key={stock}
              control={
                <Checkbox
                  color="secondary"
                  checked={selectedStocks.includes(stock)}
                  onChange={() => handleCheckStock(stock)}
                />
              }
              label={stock}
              className="stock-check-box"
            />
          ))}
      </div>
      <hr className="divider" />
      <div className="transaction-status">
        <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
          <FormControlLabel
            value={TransactionStatus.PASSED}
            control={<Radio color="secondary" />}
            label={TransactionStatus.PASSED}
          />
          <FormControlLabel
            value={TransactionStatus.FAILED}
            control={<Radio color="secondary" />}
            label={TransactionStatus.FAILED}
          />
        </RadioGroup>
      </div>
    </div>
  );
}
