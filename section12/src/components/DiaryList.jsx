import { useState, useMemo } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data, filterDate, onFilterDateChange, currentUserId }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [type, setType] = useState(false);

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const onChangeFilterDate = (e) => {
    onFilterDateChange(e.target.value);
  };

  const onResetDate = () => {
    onFilterDateChange("");
    setType(false);
  };

  const processedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const diff = new Date(a.createdate) - new Date(b.createdate);
      return sortType === "oldest" ? diff : -diff;
    });

    if (filterDate) {
      return sorted.filter(
        (item) =>
          new Date(item.createdate).toLocaleDateString("en-CA") === filterDate
      );
    }

    if (filterDate === "") {
      setType(false);
    }

    return sorted;
  }, [data, sortType, filterDate]);

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType} name="sortType" id="sortType">
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <div className="date_input">
          <div className="date">
            <label
              htmlFor="date"
              className={type || filterDate !== "" ? "disable" : ""}
            >
              날짜검색
            </label>
            <input
              id="date"
              type="date"
              name="createdate"
              onFocus={() => setType(true)}
              onBlur={() => {
                if (!filterDate) setType(false);
              }}
              onChange={onChangeFilterDate}
              value={filterDate}
            />
          </div>
          <Button text={"↺"} onClick={onResetDate} />
        </div>
      </div>
      <div className="list_wrapper">
        {processedData && processedData.length > 0 ? (
          processedData.map((item) => (
            <DiaryItem
              key={item.id}
              nickname={item.users.nickname}
              currentUserId={currentUserId}
              {...item}
            />
          ))
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
