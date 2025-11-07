import { useState } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작

    const start = Date.now(); // 시작시간 측정

    try {
      if (mode === "signup") {
        const { error } = await supabase
          .from("users")
          .insert([{ nickname, password }]);
        if (error) throw error;
      }

      // 로그인 시도
      const { data: user, error: loginError } = await supabase
        .from("users")
        .select("*")
        .eq("nickname", nickname)
        .eq("password", password)
        .single();

      if (loginError || !user) {
        alert("닉네임 또는 비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }

      // 로그인 성공 → user 저장
      localStorage.setItem("user", JSON.stringify(user));
      onAuth(user);

      // 남은 로딩 시간 계산 (1.5초 유지)
      const elapsed = Date.now() - start;
      const remaining = 1500 - elapsed;
      const wait = remaining > 0 ? remaining : 0;

      setTimeout(() => {
        setLoading(false);
        nav("/", { replace: true });
      }, wait);
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loading
        text="잠시만 기다려주세요..."
        delay={20}
        duration={1.5}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="center"
      />
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">
        {mode === "login" ? "로그인" : "회원가입"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {mode === "login" ? "로그인" : "회원가입"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="text-sm text-gray-500 mt-2 underline"
      >
        {mode === "login" ? "회원가입 하기" : "로그인으로 돌아가기"}
      </button>
    </div>
  );
}
