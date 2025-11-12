import { useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import usePageTitle from "../hooks/usePageTitle";
import Header from "../components/Header";
import Button from "../components/Button";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";
import { DiaryUserContext, DiaryUserSetterContext } from "../App";

const AccountPage = () => {
  const nav = useNavigate();
  const user = useContext(DiaryUserContext);
  const setUser = useContext(DiaryUserSetterContext);
  usePageTitle("계정 관리");

  const [nickname, setNickname] = useState(user.nickname || "");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");

  // =============================
  // 닉네임 변경
  // =============================
  const handleNicknameChange = async () => {
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");

    const { data: existing, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      return alert("닉네임 중복 체크 중 오류 발생!");
    }

    if (existing && existing.id !== user.id) {
      return alert("이미 사용 중인 닉네임입니다.");
    }

    const { data, error } = await supabase
      .from("users")
      .update({ nickname })
      .eq("id", user.id)
      .select("*")
      .single();

    if (error) return alert("닉네임 변경 실패!");

    alert("닉네임이 변경되었습니다.");
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // =============================
  // 비밀번호 변경 (bcrypt 적용)
  // =============================
  const handlePasswordChange = async () => {
    if (!newPassword.trim()) return alert("새 비밀번호를 입력해주세요.");

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/;

    if (!passwordRegex.test(newPassword)) {
      return alert(
        "비밀번호는 6~15자, 영문자·숫자·특수문자를 포함해야 합니다."
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", user.id);

    if (error) return alert("비밀번호 변경 실패!");

    alert("비밀번호가 변경되었습니다.");
    setNewPassword("");
  };

  // =============================
  // 이메일 변경 (input 항상 노출)
  // =============================
  const handleEmailChange = async () => {
    if (!email.trim()) return alert("이메일을 입력해주세요.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("올바른 이메일 형식이 아닙니다.");

    const { data: existing, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      return alert("이메일 중복 체크 중 오류 발생!");
    }

    if (existing && existing.id !== user.id) {
      return alert("이미 사용 중인 이메일입니다.");
    }

    const { data, error } = await supabase
      .from("users")
      .update({ email })
      .eq("id", user.id)
      .select("*")
      .single();

    if (error) return alert("이메일 변경 실패!");

    alert("이메일이 변경되었습니다.");
    localStorage.setItem("user", JSON.stringify(data));
  };

  // =============================
  // UI 렌더링
  // =============================
  return (
    <>
      <Header
        title={"계정 관리"}
        leftChild={<Button onClick={() => nav(-1)} text={"<"} />}
      />
      <section className="AccountPage">
        {/* 아이디 */}
        <div className="user_id">
          <label>아이디:</label>
          <span>{user.user_id}</span>
        </div>

        {/* 닉네임 */}
        <div className="nickname">
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={handleNicknameChange}>변경</button>
        </div>

        {/* 비밀번호 */}
        <div className="password">
          <label>비밀번호:</label>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>변경</button>
        </div>

        {/* 이메일 */}
        <div className="email">
          <label>이메일:</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailChange}>변경</button>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
