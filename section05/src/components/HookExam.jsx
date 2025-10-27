import useInput from "./../hooks/useInput";

// 3가지 hook 관련 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부(if, for)로 호출 할 수 없다.
// 3. 커스텀 훅을 직접 만들 수 있다. use접두사를 사용

const HookExam = () => {
  const { input, onChange } = useInput();
  const { input2, onChange2 } = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
      <input value={input2} onChange={onChange2} />
    </div>
  );
};

export default HookExam;
