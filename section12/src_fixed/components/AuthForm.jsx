import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthForm({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuth(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("회원가입이 완료되었습니다. 로그인 해주세요!");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? "로그인" : "회원가입"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
        </button>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 text-blue-500 cursor-pointer"
      >
        {isLogin ? "회원가입하기" : "로그인으로 돌아가기"}
      </p>
    </div>
  );
}
