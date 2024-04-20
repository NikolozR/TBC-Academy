import LoginForm from "@/app/components/LoginForm";
import { login } from "../actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function handleLogin(username, password) {
  'use server'
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  })
  if (res.status === 200) {
    const {token} = await res.json()
    cookies().set("token", token)
    redirect('/')
  } else {
    cookies().set("token", "")
  }
}


function Login() {
  // const handleLogin = async (email, password) => {
  //   "use server";
  //   await login(email, password);
  // };
  return <LoginForm handleLogin={handleLogin} />;
}

export default Login;
