import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ConfirmSignUp({ onChange, setUiState, confirmSignUp }) {
  return (
    <div>
      <p className="text-3x1 font-black"> Confirm your account</p>
      <div className="mt-10">
        <label className="text-sm">Confirmation Code</label>
        <Input onChange={onChange} name="authCode" />
      </div>

      <button
        onClick={confirmSignUp}
        className="text-whitge w-full mt-6 bg-pink-600 p-3 rounded"
      >
        Sign Up
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
