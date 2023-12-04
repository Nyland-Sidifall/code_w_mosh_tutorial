import RegisterForm from "./RegisterForm";
export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center flex-col bg-green-500 p-8 rounded-xl">
      <h1>Sign Up For A New Account!</h1>
      <RegisterForm />
    </div>
  );
}
