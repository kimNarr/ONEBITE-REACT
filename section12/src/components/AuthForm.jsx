import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./AuthForm.css";

const AuthForm = ({ onAuth }) => {
  const [mode, setMode] = useState("login");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRememberId, setIsRememberId] = useState(false);
  const nav = useNavigate();

  // 마운트 시 로컬스토리지에서 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem("rememberedUserId");
    if (savedId) {
      setUserId(savedId);
      setIsRememberId(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작

    try {
      let user = null;

      if (mode === "signup") {
        const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/;

        // 아이디 유효성 검사
        if (userId.length > 15) {
          alert("아이디를 15자 이하로 입력해주세요.");
          setLoading(false);
          return;
        }

        if (koreanRegex.test(userId)) {
          alert("아이디에 한글을 사용할 수 없습니다.");
          setNickname("");
          setPassword("");
          setLoading(false);
          return;
        }

        // 비밀번호 유효성 검사
        if (!passwordRegex.test(password)) {
          alert(
            "비밀번호는 6~15자 사이이며, 영문자, 숫자, 특수문자를 모두 포함해야 합니다."
          );
          setLoading(false);
          return;
        }

        // 회원가입처리
        const hashedPassword = await bcrypt.hash(password, 10); // 10은 saltRounds

        const { error: insertError } = await supabase
          .from("users")
          .insert([{ user_id: userId, nickname, password: hashedPassword }]);

        if (insertError) {
          if (insertError.code === "23505") {
            alert("이미 존재하는 아이디 입니다.");
          } else {
            alert("회원가입 중 오류가 발생했습니다.");
          }
          setLoading(false);
          return;
        }
        alert("회원가입 완료!");

        // 자동 로그인 시도
        const { data: newUser, error: loginError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (loginError || !newUser) {
          alert("로그인에 실패했습니다.");
          setLoading(false);
          return;
        }

        user = newUser;
      } else {
        // 로그인 시도
        const { data: loginUser, error: loginError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (loginError || !loginUser) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          setLoading(false);
          return;
        }

        const isValid = await bcrypt.compare(password, loginUser.password);
        if (!isValid) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          return;
        }

        user = loginUser;
      }

      // 로그인 성공 (회원가입 or 로그인 둘 다)
      if (isRememberId) {
        localStorage.setItem("rememberedUserId", userId);
      } else {
        localStorage.removeItem("rememberedUserId");
      }

      localStorage.setItem("user", JSON.stringify(user));
      onAuth(user);

      // 1.5초 로딩 강제 유지
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
    <div className="AuthForm">
      <section>
        <div className="title-area">
          <h2 className="Title">EMOTION DIARY</h2>
          <p className="sub-title">(감정일기장)</p>
        </div>
        <div className="Tab">
          <ul>
            <li
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              로그인
            </li>
            <li
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              회원가입
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="FormWrap">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {mode === "signup" && (
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            )}
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="remember-id-checkbox">
              <input
                type="checkbox"
                id="rememberId"
                checked={isRememberId}
                onChange={(e) => setIsRememberId(e.target.checked)}
              />
              <label htmlFor="rememberId">아이디 기억하기</label>
            </div>
            <button type="submit">
              {mode === "login" ? "로그인" : "회원가입"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
