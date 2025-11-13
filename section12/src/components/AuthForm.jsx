import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./AuthForm.css";

const AuthForm = ({ onAuth }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRememberId, setIsRememberId] = useState(false);
  const nav = useNavigate();

  // 저장된 아이디 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem("rememberedUserId");
    if (savedId && mode === "login") {
      setUserId(savedId);
      setPassword("");
      setIsRememberId(true);
    } else if (mode === "signup") {
      setUserId("");
      setPassword("");
      setIsRememberId(false);
    }
  }, [mode]);

  // 아이디 / 닉네임 중복 검사 함수
  const checkDuplicate = async (field, value) => {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq(field, value)
      .maybeSingle();
    if (error) console.error(error);
    return !!data; // true = 중복 존재
  };

  // 회원가입 또는 로그인 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user = null;

      if (mode === "signup") {
        // 입력 검증
        const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/;

        if (userId.length < 3 || userId.length > 15) {
          alert("아이디는 3~15자 사이로 입력해주세요.");
          return setLoading(false);
        }
        if (koreanRegex.test(userId)) {
          alert("아이디에 한글을 사용할 수 없습니다.");
          return setLoading(false);
        }
        if (!nickname.trim()) {
          alert("닉네임을 입력해주세요.");
          return setLoading(false);
        }
        if (!passwordRegex.test(password)) {
          alert(
            "비밀번호는 6~15자, 영문자·숫자·특수문자를 모두 포함해야 합니다."
          );
          return setLoading(false);
        }

        // 중복 체크
        const isUserIdTaken = await checkDuplicate("user_id", userId);
        if (isUserIdTaken) {
          alert("이미 존재하는 아이디입니다.");
          return setLoading(false);
        }

        const isNicknameTaken = await checkDuplicate("nickname", nickname);
        if (isNicknameTaken) {
          alert("이미 존재하는 닉네임입니다.");
          return setLoading(false);
        }

        const isEmailTaken = await checkDuplicate("email", email);
        if (isEmailTaken) {
          alert("이미 존재하는 이메일입니다.");
          return setLoading(false);
        }

        // 비밀번호 해시 후 저장
        const hashedPassword = await bcrypt.hash(password, 10);
        const { error: insertError } = await supabase
          .from("users")
          .insert([
            { user_id: userId, nickname, email, password: hashedPassword },
          ]);

        if (insertError) {
          console.error(insertError);
          alert("회원가입 중 오류가 발생했습니다.");
          return setLoading(false);
        }

        alert("회원가입이 완료되었습니다! 자동 로그인됩니다.");

        // 가입한 유저 정보 가져오기
        const { data: newUser, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (fetchError || !newUser) {
          alert("회원 정보를 불러올 수 없습니다.");
          return setLoading(false);
        }

        user = newUser;
      } else {
        // 로그인 처리
        const { data: loginUser, error: loginError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (loginError || !loginUser) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          return setLoading(false);
        }

        const isValid = await bcrypt.compare(password, loginUser.password);
        if (!isValid) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          return setLoading(false);
        }

        user = loginUser;
      }

      // 로그인 유지 설정
      if (isRememberId) {
        localStorage.setItem("rememberedUserId", userId);
      } else {
        localStorage.removeItem("rememberedUserId");
      }

      // 로그인 성공 시
      localStorage.setItem("user", JSON.stringify(user));
      onAuth(user);

      // 👇 로그인 성공 시점에 키보드 닫기 + 스크롤 리셋
      if (
        document.activeElement &&
        typeof document.activeElement.blur === "function"
      ) {
        document.activeElement.blur();
      }
      window.scrollTo(0, 0);

      setTimeout(() => {
        setLoading(true);
        nav("/", { replace: true });
      }, 50);

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // setLoading(true);
      // nav("/", { replace: true });
    } catch (err) {
      console.error("Auth Error:", err);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 로딩 표시
  if (loading) {
    return (
      <Loading
        text="LOADING...!"
        className="loading"
        delay={20}
        duration={1.2}
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

        {/* 탭 전환 */}
        <div className="Tab">
          <ul>
            <li
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              로그인
            </li>
            <li
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              회원가입
            </li>
          </ul>
        </div>

        {/* 로그인 / 회원가입 폼 */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="FormWrap">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value.trim())}
              required
            />
            {mode === "signup" && (
              <>
                <input
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.trim())}
                  autoComplete="off"
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  autoComplete="off"
                  required
                />
              </>
            )}
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
            />

            {mode === "login" && (
              <div className="remember-id-checkbox">
                <input
                  type="checkbox"
                  id="rememberId"
                  checked={isRememberId}
                  onChange={(e) => setIsRememberId(e.target.checked)}
                />
                <label htmlFor="rememberId">아이디 기억하기</label>
              </div>
            )}

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
