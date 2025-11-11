import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  );
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  // return data?.filter(
  //   (item) => beginTime <= item.createdate && item.createdate <= endTime
  // );
  return data?.filter((item) => {
    const itemDate = new Date(item.createdate).getTime();
    return beginTime <= itemDate && itemDate <= endTime;
  });
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const nowYear = pivotDate.getFullYear();
  const nowMonth = pivotDate.getMonth();
  const [filterDate, setFilterDate] = useState("");
  usePageTitle("감정 일기장");

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(nowYear, nowMonth + 1));
    setFilterDate("");
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(nowYear, nowMonth - 1));
    setFilterDate("");
  };

  const onFilterDateChange = (date) => {
    setFilterDate(date);
  };

  return (
    <>
      <Header
        title={`${nowYear}년 ${nowMonth + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList
        data={monthlyData}
        filterDate={filterDate}
        onFilterDateChange={onFilterDateChange}
      />
    </>
  );
};

export default Home;
