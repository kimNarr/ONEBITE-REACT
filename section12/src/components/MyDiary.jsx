import DiaryList from "./DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext, DiaryUserContext } from "../App";
import Header from "./Header";
import Button from "./Button";
import usePageTitle from "../hooks/usePageTitle";

// 월별 데이터 필터 함수
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

  return data?.filter((item) => {
    const itemDate = new Date(item.createdate).getTime();
    return beginTime <= itemDate && itemDate <= endTime;
  });
};

const MyDiaryList = () => {
  const data = useContext(DiaryStateContext);
  const user = useContext(DiaryUserContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const nowYear = pivotDate.getFullYear();
  const nowMonth = pivotDate.getMonth();
  const [filterDate, setFilterDate] = useState("");
  usePageTitle("내 일기만 보기");

  // 월별 + 작성자 필터
  const monthlyData = getMonthlyData(pivotDate, data).filter(
    (item) => item.user_id === user.id
  );

  return (
    <>
      <Header
        title={`${nowYear}년 ${nowMonth + 1}월`}
        leftChild={
          <Button
            text={"<"}
            onClick={() => setPivotDate(new Date(nowYear, nowMonth - 1))}
          />
        }
        rightChild={
          <Button
            text={">"}
            onClick={() => setPivotDate(new Date(nowYear, nowMonth + 1))}
          />
        }
      />
      <DiaryList
        currentUserId={user.id}
        data={monthlyData}
        filterDate={filterDate}
        onFilterDateChange={setFilterDate}
      />
    </>
  );
};

export default MyDiaryList;
