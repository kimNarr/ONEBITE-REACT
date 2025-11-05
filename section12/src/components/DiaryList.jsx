import { useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data, filterDate, onFilterDateChange }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const onChangeFilterDate = (e) => {
    onFilterDateChange(e.target.value);
  };

  const onResetDate = () => {
    onFilterDateChange("");
  };

  // const getSortedData = () => {
  //   // return data?.toSorted((a, b) => {
  //   return [...data].sort((a, b) => {
  //     if (sortType === "oldest") {
  //       return new Date(a.createDate) - new Date(b.createDate);
  //       // return Number(a.createDate) - Number(b.createDate);
  //     } else {
  //       return new Date(b.createDate) - new Date(a.createDate);
  //       // return Number(b.createDate) - Number(a.createDate);
  //     }
  //   });
  // };

  // const sortedData = getSortedData();

  const getProcessedData = () => {
    // 정렬
    const sorted = [...data].sort((a, b) => {
      if (sortType === "oldest") {
        return new Date(a.createDate) - new Date(b.createDate);
      } else {
        return new Date(b.createDate) - new Date(a.createDate);
      }
    });

    // 필터링 (filterDate가 선택된 경우에만)
    if (filterDate) {
      return sorted.filter((item) => {
        const itemDate = new Date(item.createDate).toISOString().slice(0, 10);
        return itemDate === filterDate;
      });
    }

    return sorted;
  };

  const processedData = getProcessedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType} name="sortType" id="sortType">
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <div className="date_input">
          <input
            type="date"
            name="createDate"
            onChange={onChangeFilterDate}
            value={filterDate}
          />
          <Button text={"↺"} onClick={onResetDate} />
        </div>
      </div>
      <div className="list_wrapper">
        {/* {sortedData?.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))} */}
        {processedData && processedData.length > 0 ? (
          processedData.map((item) => <DiaryItem key={item.id} {...item} />)
        ) : (
          <p className="no-data">작성된 일기가 없습니다 😢</p>
        )}
      </div>
      <div className="new_diary">
        <Button
          text={"새 일기 +"}
          type={"POSITIVE"}
          onClick={() => nav("/new")}
        />
      </div>
    </div>
  );
};

export default DiaryList;
