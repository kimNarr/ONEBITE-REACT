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
    // setLoading(true); // ✅ 로딩 시작

    try {
      let user = null;

      if (mode === "signup") {
        const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
        if (koreanRegex.test(nickname)) {
          alert("닉네임에 한글을 사용할 수 없습니다.");
          setNickname("");
          setPassword("");
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from("users")
          .insert([{ nickname, password }]);

        if (error) {
          if (error.code === "23505") {
            alert("이미 존재하는 닉네임입니다.");
          } else {
            alert("회원가입 중 오류가 발생했습니다.");
          }
          setLoading(false);
          return;
        }

        alert("회원가입 완료!");

        // 🔹 회원가입 직후 자동 로그인
        const { data: newUser, error: loginError } = await supabase
          .from("users")
          .select("*")
          .eq("nickname", nickname)
          .eq("password", password)
          .single();

        if (loginError || !newUser) {
          alert("자동 로그인에 실패했습니다.");
          setLoading(false);
          return;
        }

        user = newUser;
      } else {
        // 🔹 로그인 시도
        const { data: loginUser, error: loginError } = await supabase
          .from("users")
          .select("*")
          .eq("nickname", nickname)
          .eq("password", password)
          .single();

        if (loginError || !loginUser) {
          alert("닉네임 또는 비밀번호가 올바르지 않습니다.");
          setLoading(false);
          return;
        }

        user = loginUser;
      }

      // ✅ 로그인 성공 (회원가입 or 로그인 둘 다)
      localStorage.setItem("user", JSON.stringify(user));
      onAuth(user);

      // ✅ 1.5초 로딩 강제 유지
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLoading(false);
      nav("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loading
        text="LOADING...!"
        className="loading"
        delay={20}
        duration={1.5}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    );
  }

  return (
    <div>
      <h2>{mode === "login" ? "로그인" : "회원가입"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {mode === "login" ? "로그인" : "회원가입"}
        </button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "회원가입 하기" : "로그인으로 돌아가기"}
      </button>
    </div>
  );
}
