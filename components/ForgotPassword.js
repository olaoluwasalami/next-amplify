import { Auth } from "aws-amplify";
import Input from "./Input";

export default function forgotPassword({ onChange, setUiState, forgotPassword }) {
  return (
    <div>
      <p className="text-3x1 font-black"> Forgot Password? Start here.</p>
      <div className="mt-10">
        <label className="text-sm"> Email</label>
        <Input onChange={onChange} name="email" />
      </div>

      <button
        onClick={forgotPassword}
        className="text-whitge w-full mt-6 bg-pink-600 p-3 rounded"
      >
        Reset Password
      </button>
      <button
        onClick={() => setUiState('signIn')}
        className="text-whitge w-full mt-6 bg-pink-600 p-3 rounded"
      >
        Cancel
      </button>
    </div>
  );
}
