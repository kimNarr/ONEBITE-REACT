import { useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // return data?.toSorted((a, b) => {
    return [...data].sort((a, b) => {
      if (sortType === "oldest") {
        // return Number(a.createDate) - Number(b.createDate);
        return new Date(a.createDate) - new Date(b.createDate);
      } else {
        // return Number(b.createDate) - Number(a.createDate);
        return new Date(b.createDate) - new Date(a.createDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <Button
          text={"새 일기"}
          type={"POSITIVE"}
          onClick={() => nav("/new")}
        />
      </div>
      <div className="list_wrapper">
        {/* {sortedData?.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))} */}
        {sortedData && sortedData.length > 0 ? (
          sortedData.map((item) => <DiaryItem key={item.id} {...item} />)
        ) : (
          <p className="no-data">작성된 일기가 없습니다 😢</p>
        )}
      </div>
    </div>
  );
};

export default DiaryList;
